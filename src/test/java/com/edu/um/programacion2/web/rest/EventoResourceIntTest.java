package com.edu.um.programacion2.web.rest;

import com.edu.um.programacion2.TrievegoApp;

import com.edu.um.programacion2.domain.Evento;
import com.edu.um.programacion2.repository.EventoRepository;
import com.edu.um.programacion2.service.EventoService;
import com.edu.um.programacion2.repository.search.EventoSearchRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.edu.um.programacion2.web.rest.TestUtil.sameInstant;
import static com.edu.um.programacion2.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EventoResource REST controller.
 *
 * @see EventoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrievegoApp.class)
public class EventoResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_RESUMEN = "AAAAAAAAAA";
    private static final String UPDATED_RESUMEN = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRECIO = 1;
    private static final Integer UPDATED_PRECIO = 2;

    private static final ZonedDateTime DEFAULT_FECHA_HORA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_HORA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ESTADO = false;
    private static final Boolean UPDATED_ESTADO = true;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private EventoService eventoService;

    @Autowired
    private EventoSearchRepository eventoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEventoMockMvc;

    private Evento evento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EventoResource eventoResource = new EventoResource(eventoService);
        this.restEventoMockMvc = MockMvcBuilders.standaloneSetup(eventoResource)
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
    public static Evento createEntity(EntityManager em) {
        Evento evento = new Evento()
            .nombre(DEFAULT_NOMBRE)
            .resumen(DEFAULT_RESUMEN)
            .descripcion(DEFAULT_DESCRIPCION)
            .precio(DEFAULT_PRECIO)
            .fechaHora(DEFAULT_FECHA_HORA)
            .direccion(DEFAULT_DIRECCION)
            .estado(DEFAULT_ESTADO);
        return evento;
    }

    @Before
    public void initTest() {
        eventoSearchRepository.deleteAll();
        evento = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvento() throws Exception {
        int databaseSizeBeforeCreate = eventoRepository.findAll().size();

        // Create the Evento
        restEventoMockMvc.perform(post("/api/eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evento)))
            .andExpect(status().isCreated());

        // Validate the Evento in the database
        List<Evento> eventoList = eventoRepository.findAll();
        assertThat(eventoList).hasSize(databaseSizeBeforeCreate + 1);
        Evento testEvento = eventoList.get(eventoList.size() - 1);
        assertThat(testEvento.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEvento.getResumen()).isEqualTo(DEFAULT_RESUMEN);
        assertThat(testEvento.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testEvento.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testEvento.getFechaHora()).isEqualTo(DEFAULT_FECHA_HORA);
        assertThat(testEvento.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testEvento.isEstado()).isEqualTo(DEFAULT_ESTADO);

        // Validate the Evento in Elasticsearch
        Evento eventoEs = eventoSearchRepository.findOne(testEvento.getId());
        assertThat(testEvento.getFechaHora()).isEqualTo(testEvento.getFechaHora());
        assertThat(eventoEs).isEqualToIgnoringGivenFields(testEvento, "fechaHora");
    }

    @Test
    @Transactional
    public void createEventoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventoRepository.findAll().size();

        // Create the Evento with an existing ID
        evento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventoMockMvc.perform(post("/api/eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evento)))
            .andExpect(status().isBadRequest());

        // Validate the Evento in the database
        List<Evento> eventoList = eventoRepository.findAll();
        assertThat(eventoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEventos() throws Exception {
        // Initialize the database
        eventoRepository.saveAndFlush(evento);

        // Get all the eventoList
        restEventoMockMvc.perform(get("/api/eventos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(evento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].resumen").value(hasItem(DEFAULT_RESUMEN.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO)))
            .andExpect(jsonPath("$.[*].fechaHora").value(hasItem(sameInstant(DEFAULT_FECHA_HORA))))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.booleanValue())));
    }

    @Test
    @Transactional
    public void getEvento() throws Exception {
        // Initialize the database
        eventoRepository.saveAndFlush(evento);

        // Get the evento
        restEventoMockMvc.perform(get("/api/eventos/{id}", evento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(evento.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.resumen").value(DEFAULT_RESUMEN.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO))
            .andExpect(jsonPath("$.fechaHora").value(sameInstant(DEFAULT_FECHA_HORA)))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEvento() throws Exception {
        // Get the evento
        restEventoMockMvc.perform(get("/api/eventos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvento() throws Exception {
        // Initialize the database
        eventoService.save(evento);

        int databaseSizeBeforeUpdate = eventoRepository.findAll().size();

        // Update the evento
        Evento updatedEvento = eventoRepository.findOne(evento.getId());
        // Disconnect from session so that the updates on updatedEvento are not directly saved in db
        em.detach(updatedEvento);
        updatedEvento
            .nombre(UPDATED_NOMBRE)
            .resumen(UPDATED_RESUMEN)
            .descripcion(UPDATED_DESCRIPCION)
            .precio(UPDATED_PRECIO)
            .fechaHora(UPDATED_FECHA_HORA)
            .direccion(UPDATED_DIRECCION)
            .estado(UPDATED_ESTADO);

        restEventoMockMvc.perform(put("/api/eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvento)))
            .andExpect(status().isOk());

        // Validate the Evento in the database
        List<Evento> eventoList = eventoRepository.findAll();
        assertThat(eventoList).hasSize(databaseSizeBeforeUpdate);
        Evento testEvento = eventoList.get(eventoList.size() - 1);
        assertThat(testEvento.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEvento.getResumen()).isEqualTo(UPDATED_RESUMEN);
        assertThat(testEvento.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testEvento.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testEvento.getFechaHora()).isEqualTo(UPDATED_FECHA_HORA);
        assertThat(testEvento.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testEvento.isEstado()).isEqualTo(UPDATED_ESTADO);

        // Validate the Evento in Elasticsearch
        Evento eventoEs = eventoSearchRepository.findOne(testEvento.getId());
        assertThat(testEvento.getFechaHora()).isEqualTo(testEvento.getFechaHora());
        assertThat(eventoEs).isEqualToIgnoringGivenFields(testEvento, "fechaHora");
    }

    @Test
    @Transactional
    public void updateNonExistingEvento() throws Exception {
        int databaseSizeBeforeUpdate = eventoRepository.findAll().size();

        // Create the Evento

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEventoMockMvc.perform(put("/api/eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evento)))
            .andExpect(status().isCreated());

        // Validate the Evento in the database
        List<Evento> eventoList = eventoRepository.findAll();
        assertThat(eventoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEvento() throws Exception {
        // Initialize the database
        eventoService.save(evento);

        int databaseSizeBeforeDelete = eventoRepository.findAll().size();

        // Get the evento
        restEventoMockMvc.perform(delete("/api/eventos/{id}", evento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean eventoExistsInEs = eventoSearchRepository.exists(evento.getId());
        assertThat(eventoExistsInEs).isFalse();

        // Validate the database is empty
        List<Evento> eventoList = eventoRepository.findAll();
        assertThat(eventoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchEvento() throws Exception {
        // Initialize the database
        eventoService.save(evento);

        // Search the evento
        restEventoMockMvc.perform(get("/api/_search/eventos?query=id:" + evento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(evento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].resumen").value(hasItem(DEFAULT_RESUMEN.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO)))
            .andExpect(jsonPath("$.[*].fechaHora").value(hasItem(sameInstant(DEFAULT_FECHA_HORA))))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Evento.class);
        Evento evento1 = new Evento();
        evento1.setId(1L);
        Evento evento2 = new Evento();
        evento2.setId(evento1.getId());
        assertThat(evento1).isEqualTo(evento2);
        evento2.setId(2L);
        assertThat(evento1).isNotEqualTo(evento2);
        evento1.setId(null);
        assertThat(evento1).isNotEqualTo(evento2);
    }
}
