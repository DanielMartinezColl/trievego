package com.edu.um.programacion2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edu.um.programacion2.domain.Ciudad;
import com.edu.um.programacion2.service.CiudadService;
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
 * REST controller for managing Ciudad.
 */
@RestController
@RequestMapping("/api")
public class CiudadResource {

    private final Logger log = LoggerFactory.getLogger(CiudadResource.class);

    private static final String ENTITY_NAME = "ciudad";

    private final CiudadService ciudadService;

    public CiudadResource(CiudadService ciudadService) {
        this.ciudadService = ciudadService;
    }

    /**
     * POST  /ciudads : Create a new ciudad.
     *
     * @param ciudad the ciudad to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ciudad, or with status 400 (Bad Request) if the ciudad has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ciudads")
    @Timed
    public ResponseEntity<Ciudad> createCiudad(@RequestBody Ciudad ciudad) throws URISyntaxException {
        log.debug("REST request to save Ciudad : {}", ciudad);
        if (ciudad.getId() != null) {
            throw new BadRequestAlertException("A new ciudad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ciudad result = ciudadService.save(ciudad);
        return ResponseEntity.created(new URI("/api/ciudads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ciudads : Updates an existing ciudad.
     *
     * @param ciudad the ciudad to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ciudad,
     * or with status 400 (Bad Request) if the ciudad is not valid,
     * or with status 500 (Internal Server Error) if the ciudad couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ciudads")
    @Timed
    public ResponseEntity<Ciudad> updateCiudad(@RequestBody Ciudad ciudad) throws URISyntaxException {
        log.debug("REST request to update Ciudad : {}", ciudad);
        if (ciudad.getId() == null) {
            return createCiudad(ciudad);
        }
        Ciudad result = ciudadService.save(ciudad);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ciudad.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ciudads : get all the ciudads.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ciudads in body
     */
    @GetMapping("/ciudads")
    @Timed
    public ResponseEntity<List<Ciudad>> getAllCiudads(Pageable pageable) {
        log.debug("REST request to get a page of Ciudads");
        Page<Ciudad> page = ciudadService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ciudads");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ciudads/:id : get the "id" ciudad.
     *
     * @param id the id of the ciudad to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ciudad, or with status 404 (Not Found)
     */
    @GetMapping("/ciudads/{id}")
    @Timed
    public ResponseEntity<Ciudad> getCiudad(@PathVariable Long id) {
        log.debug("REST request to get Ciudad : {}", id);
        Ciudad ciudad = ciudadService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ciudad));
    }

    /**
     * DELETE  /ciudads/:id : delete the "id" ciudad.
     *
     * @param id the id of the ciudad to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ciudads/{id}")
    @Timed
    public ResponseEntity<Void> deleteCiudad(@PathVariable Long id) {
        log.debug("REST request to delete Ciudad : {}", id);
        ciudadService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
