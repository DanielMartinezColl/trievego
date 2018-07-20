package com.edu.um.programacion2.service;

import com.edu.um.programacion2.domain.Imagen;
import com.edu.um.programacion2.repository.ImagenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Imagen.
 */
@Service
@Transactional
public class ImagenService {

    private final Logger log = LoggerFactory.getLogger(ImagenService.class);

    private final ImagenRepository imagenRepository;

    public ImagenService(ImagenRepository imagenRepository) {
        this.imagenRepository = imagenRepository;
    }

    /**
     * Save a imagen.
     *
     * @param imagen the entity to save
     * @return the persisted entity
     */
    public Imagen save(Imagen imagen) {
        log.debug("Request to save Imagen : {}", imagen);
        return imagenRepository.save(imagen);
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
    }
}
