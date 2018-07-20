package com.edu.um.programacion2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edu.um.programacion2.domain.Imagen;
import com.edu.um.programacion2.service.ImagenService;
import com.edu.um.programacion2.web.rest.errors.BadRequestAlertException;
import com.edu.um.programacion2.web.rest.util.HeaderUtil;
import com.edu.um.programacion2.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Imagen.
 */
@RestController
@RequestMapping("/api")
public class ImagenResource {

    private final Logger log = LoggerFactory.getLogger(ImagenResource.class);

    private static final String ENTITY_NAME = "imagen";

    private final ImagenService imagenService;

    public ImagenResource(ImagenService imagenService) {
        this.imagenService = imagenService;
    }

    /**
     * POST  /imagens : Create a new imagen.
     *
     * @param imagen the imagen to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imagen, or with status 400 (Bad Request) if the imagen has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/imagens")
    @Timed
    public ResponseEntity<Imagen> createImagen(@RequestBody Imagen imagen) throws URISyntaxException {
        log.debug("REST request to save Imagen : {}", imagen);
        if (imagen.getId() != null) {
            throw new BadRequestAlertException("A new imagen cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Imagen result = imagenService.save(imagen);
        return ResponseEntity.created(new URI("/api/imagens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /imagens : Updates an existing imagen.
     *
     * @param imagen the imagen to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imagen,
     * or with status 400 (Bad Request) if the imagen is not valid,
     * or with status 500 (Internal Server Error) if the imagen couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/imagens")
    @Timed
    public ResponseEntity<Imagen> updateImagen(@RequestBody Imagen imagen) throws URISyntaxException {
        log.debug("REST request to update Imagen : {}", imagen);
        if (imagen.getId() == null) {
            return createImagen(imagen);
        }
        Imagen result = imagenService.save(imagen);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imagen.getId().toString()))
            .body(result);
    }

    /**
     * GET  /imagens : get all the imagens.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of imagens in body
     */
    @GetMapping("/imagens")
    @Timed
    public ResponseEntity<List<Imagen>> getAllImagens(Pageable pageable) {
        log.debug("REST request to get a page of Imagens");
        Page<Imagen> page = imagenService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/imagens");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /imagens/:id : get the "id" imagen.
     *
     * @param id the id of the imagen to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imagen, or with status 404 (Not Found)
     */
    @GetMapping("/imagens/{id}")
    @Timed
    public ResponseEntity<Imagen> getImagen(@PathVariable Long id) {
        log.debug("REST request to get Imagen : {}", id);
        Imagen imagen = imagenService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(imagen));
    }

    /**
     * DELETE  /imagens/:id : delete the "id" imagen.
     *
     * @param id the id of the imagen to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/imagens/{id}")
    @Timed
    public ResponseEntity<Void> deleteImagen(@PathVariable Long id) {
        log.debug("REST request to delete Imagen : {}", id);
        imagenService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
