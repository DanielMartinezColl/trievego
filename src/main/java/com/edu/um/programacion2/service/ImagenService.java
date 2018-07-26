package com.edu.um.programacion2.service;

import com.edu.um.programacion2.domain.Imagen;
import com.edu.um.programacion2.repository.ImagenRepository;
import com.edu.um.programacion2.repository.search.ImagenSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Imagen.
 */
@Service
@Transactional
public class ImagenService {

    private final Logger log = LoggerFactory.getLogger(ImagenService.class);

    private final ImagenRepository imagenRepository;

    private final ImagenSearchRepository imagenSearchRepository;

    public ImagenService(ImagenRepository imagenRepository, ImagenSearchRepository imagenSearchRepository) {
        this.imagenRepository = imagenRepository;
        this.imagenSearchRepository = imagenSearchRepository;
    }

    /**
     * Save a imagen.
     *
     * @param imagen the entity to save
     * @return the persisted entity
     */
    public Imagen save(Imagen imagen) {
        log.debug("Request to save Imagen : {}", imagen);
        Imagen result = imagenRepository.save(imagen);
        imagenSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the imagens.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Imagen> findAll(Pageable pageable) {
        log.debug("Request to get all Imagens");
        return imagenRepository.findAll(pageable);
    }

    /**
     * Get one imagen by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Imagen findOne(Long id) {
        log.debug("Request to get Imagen : {}", id);
        return imagenRepository.findOne(id);
    }

    /**
     * Delete the imagen by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Imagen : {}", id);
        imagenRepository.delete(id);
        imagenSearchRepository.delete(id);
    }

    /**
     * Search for the imagen corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Imagen> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Imagens for query {}", query);
        Page<Imagen> result = imagenSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
