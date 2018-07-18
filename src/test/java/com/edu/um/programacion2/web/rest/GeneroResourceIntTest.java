package com.edu.um.programacion2.web.rest;

import com.edu.um.programacion2.TrievegoApp;

import com.edu.um.programacion2.domain.Genero;
import com.edu.um.programacion2.repository.GeneroRepository;
import com.edu.um.programacion2.repository.search.GeneroSearchRepository;
import com.edu.um.programacion2.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.edu.um.programacion2.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GeneroResource REST controller.
 *
 * @see GeneroResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrievegoApp.class)
public class GeneroResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private GeneroRepository generoRepository;

    @Autowired
    private GeneroSearchRepository generoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGeneroMockMvc;

    private Genero genero;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GeneroResource generoResource = new GeneroResource(generoRepository, generoSearchRepository);
        this.restGeneroMockMvc = MockMvcBuilders.standaloneSetup(generoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Genero createEntity(EntityManager em) {
        Genero genero = new Genero()
            .nombre(DEFAULT_NOMBRE);
        return genero;
    }

    @Before
    public void initTest() {
        generoSearchRepository.deleteAll();
        genero = createEntity(em);
    }

    @Test
    @Transactional
    public void createGenero() throws Exception {
        int databaseSizeBeforeCreate = generoRepository.findAll().size();

        // Create the Genero
        restGeneroMockMvc.perform(post("/api/generos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genero)))
            .andExpect(status().isCreated());

        // Validate the Genero in the database
        List<Genero> generoList = generoRepository.findAll();
        assertThat(generoList).hasSize(databaseSizeBeforeCreate + 1);
        Genero testGenero = generoList.get(generoList.size() - 1);
        assertThat(testGenero.getNombre()).isEqualTo(DEFAULT_NOMBRE);

        // Validate the Genero in Elasticsearch
        Genero generoEs = generoSearchRepository.findOne(testGenero.getId());
        assertThat(generoEs).isEqualToIgnoringGivenFields(testGenero);
    }

    @Test
    @Transactional
    public void createGeneroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = generoRepository.findAll().size();

        // Create the Genero with an existing ID
        genero.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGeneroMockMvc.perform(post("/api/generos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genero)))
            .andExpect(status().isBadRequest());

        // Validate the Genero in the database
        List<Genero> generoList = generoRepository.findAll();
        assertThat(generoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGeneros() throws Exception {
        // Initialize the database
        generoRepository.saveAndFlush(genero);

        // Get all the generoList
        restGeneroMockMvc.perform(get("/api/generos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genero.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void getGenero() throws Exception {
        // Initialize the database
        generoRepository.saveAndFlush(genero);

        // Get the genero
        restGeneroMockMvc.perform(get("/api/generos/{id}", genero.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(genero.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGenero() throws Exception {
        // Get the genero
        restGeneroMockMvc.perform(get("/api/generos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGenero() throws Exception {
        // Initialize the database
        generoRepository.saveAndFlush(genero);
        generoSearchRepository.save(genero);
        int databaseSizeBeforeUpdate = generoRepository.findAll().size();

        // Update the genero
        Genero updatedGenero = generoRepository.findOne(genero.getId());
        // Disconnect from session so that the updates on updatedGenero are not directly saved in db
        em.detach(updatedGenero);
        updatedGenero
            .nombre(UPDATED_NOMBRE);

        restGeneroMockMvc.perform(put("/api/generos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGenero)))
            .andExpect(status().isOk());

        // Validate the Genero in the database
        List<Genero> generoList = generoRepository.findAll();
        assertThat(generoList).hasSize(databaseSizeBeforeUpdate);
        Genero testGenero = generoList.get(generoList.size() - 1);
        assertThat(testGenero.getNombre()).isEqualTo(UPDATED_NOMBRE);

        // Validate the Genero in Elasticsearch
        Genero generoEs = generoSearchRepository.findOne(testGenero.getId());
        assertThat(generoEs).isEqualToIgnoringGivenFields(testGenero);
    }

    @Test
    @Transactional
    public void updateNonExistingGenero() throws Exception {
        int databaseSizeBeforeUpdate = generoRepository.findAll().size();

        // Create the Genero

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGeneroMockMvc.perform(put("/api/generos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genero)))
            .andExpect(status().isCreated());

        // Validate the Genero in the database
        List<Genero> generoList = generoRepository.findAll();
        assertThat(generoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGenero() throws Exception {
        // Initialize the database
        generoRepository.saveAndFlush(genero);
        generoSearchRepository.save(genero);
        int databaseSizeBeforeDelete = generoRepository.findAll().size();

        // Get the genero
        restGeneroMockMvc.perform(delete("/api/generos/{id}", genero.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean generoExistsInEs = generoSearchRepository.exists(genero.getId());
        assertThat(generoExistsInEs).isFalse();

        // Validate the database is empty
        List<Genero> generoList = generoRepository.findAll();
        assertThat(generoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchGenero() throws Exception {
        // Initialize the database
        generoRepository.saveAndFlush(genero);
        generoSearchRepository.save(genero);

        // Search the genero
        restGeneroMockMvc.perform(get("/api/_search/generos?query=id:" + genero.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genero.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Genero.class);
        Genero genero1 = new Genero();
        genero1.setId(1L);
        Genero genero2 = new Genero();
        genero2.setId(genero1.getId());
        assertThat(genero1).isEqualTo(genero2);
        genero2.setId(2L);
        assertThat(genero1).isNotEqualTo(genero2);
        genero1.setId(null);
        assertThat(genero1).isNotEqualTo(genero2);
    }
}
