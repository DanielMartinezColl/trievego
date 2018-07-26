package com.edu.um.programacion2.service;

import com.edu.um.programacion2.domain.Evento;
import com.edu.um.programacion2.repository.EventoRepository;
import com.edu.um.programacion2.repository.search.EventoSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Evento.
 */
@Service
@Transactional
public class EventoService {

    private final Logger log = LoggerFactory.getLogger(EventoService.class);

    private final EventoRepository eventoRepository;

    private final EventoSearchRepository eventoSearchRepository;

    public EventoService(EventoRepository eventoRepository, EventoSearchRepository eventoSearchRepository) {
        this.eventoRepository = eventoRepository;
        this.eventoSearchRepository = eventoSearchRepository;
    }

    /**
     * Save a evento.
     *
     * @param evento the entity to save
     * @return the persisted entity
     */
    public Evento save(Evento evento) {
        log.debug("Request to save Evento : {}", evento);
        Evento result = eventoRepository.save(evento);
        eventoSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the eventos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Evento> findAll(Pageable pageable) {
        log.debug("Request to get all Eventos");
        return eventoRepository.findAll(pageable);
    }

    /**
     * Get one evento by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Evento findOne(Long id) {
        log.debug("Request to get Evento : {}", id);
        return eventoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the evento by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Evento : {}", id);
        eventoRepository.delete(id);
        eventoSearchRepository.delete(id);
    }

    /**
     * Search for the evento corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Evento> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Eventos for query {}", query);
        Page<Evento> result = eventoSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
