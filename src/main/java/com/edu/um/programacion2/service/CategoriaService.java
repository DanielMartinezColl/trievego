package com.edu.um.programacion2.service;

import com.edu.um.programacion2.domain.Categoria;
import com.edu.um.programacion2.repository.CategoriaRepository;
import com.edu.um.programacion2.repository.search.CategoriaSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Categoria.
 */
@Service
@Transactional
public class CategoriaService {

    private final Logger log = LoggerFactory.getLogger(CategoriaService.class);

    private final CategoriaRepository categoriaRepository;

    private final CategoriaSearchRepository categoriaSearchRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, CategoriaSearchRepository categoriaSearchRepository) {
        this.categoriaRepository = categoriaRepository;
        this.categoriaSearchRepository = categoriaSearchRepository;
    }

    /**
     * Save a categoria.
     *
     * @param categoria the entity to save
     * @return the persisted entity
     */
    public Categoria save(Categoria categoria) {
        log.debug("Request to save Categoria : {}", categoria);
        Categoria result = categoriaRepository.save(categoria);
        categoriaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the categorias.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Categoria> findAll(Pageable pageable) {
        log.debug("Request to get all Categorias");
        return categoriaRepository.findAll(pageable);
    }

    /**
     * Get one categoria by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Categoria findOne(Long id) {
        log.debug("Request to get Categoria : {}", id);
        return categoriaRepository.findOne(id);
    }

    /**
     * Delete the categoria by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Categoria : {}", id);
        categoriaRepository.delete(id);
        categoriaSearchRepository.delete(id);
    }

    /**
     * Search for the categoria corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Categoria> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Categorias for query {}", query);
        Page<Categoria> result = categoriaSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
