package com.edu.um.programacion2.service;

import com.edu.um.programacion2.domain.Ciudad;
import com.edu.um.programacion2.repository.CiudadRepository;
import com.edu.um.programacion2.repository.search.CiudadSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

import java.util.List;

/**
 * Service Implementation for managing Ciudad.
 */
@Service
@Transactional
public class CiudadService {

    private final Logger log = LoggerFactory.getLogger(CiudadService.class);

    private final CiudadRepository ciudadRepository;

    private final CiudadSearchRepository ciudadSearchRepository;

    public CiudadService(CiudadRepository ciudadRepository, CiudadSearchRepository ciudadSearchRepository) {
        this.ciudadRepository = ciudadRepository;
        this.ciudadSearchRepository = ciudadSearchRepository;
    }

    /**
     * Save a ciudad.
     *
     * @param ciudad the entity to save
     * @return the persisted entity
     */
    public Ciudad save(Ciudad ciudad) {
        log.debug("Request to save Ciudad : {}", ciudad);
        Ciudad result = ciudadRepository.save(ciudad);
        ciudadSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the ciudads.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Ciudad> findAll(Pageable pageable) {
        log.debug("Request to get all Ciudads");
        return ciudadRepository.findAll(pageable);
    }

    /**
     * Get one ciudad by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Ciudad findOne(Long id) {
        log.debug("Request to get Ciudad : {}", id);
        return ciudadRepository.findOne(id);
    }

    /**
     * Delete the ciudad by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Ciudad : {}", id);
        ciudadRepository.delete(id);
        ciudadSearchRepository.delete(id);
    }

    /**
     * Search for the ciudad corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Ciudad> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Ciudads for query {}", query);
        Page<Ciudad> result = ciudadSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }

    //@Transactional(readOnly = true)
    //public List<Ciudad> FindByProvincia(Long provinciaId) {

    //    List<Ciudad> result = ciudadRepository.findByProvincia_ProvinciaId(provinciaId);
    //    return result;
    //}
}
