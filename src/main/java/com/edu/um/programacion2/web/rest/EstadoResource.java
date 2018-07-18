package com.edu.um.programacion2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edu.um.programacion2.domain.Estado;

import com.edu.um.programacion2.repository.EstadoRepository;
import com.edu.um.programacion2.repository.search.EstadoSearchRepository;
import com.edu.um.programacion2.web.rest.errors.BadRequestAlertException;
import com.edu.um.programacion2.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Estado.
 */
@RestController
@RequestMapping("/api")
public class EstadoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoResource.class);

    private static final String ENTITY_NAME = "estado";

    private final EstadoRepository estadoRepository;

    private final EstadoSearchRepository estadoSearchRepository;

    public EstadoResource(EstadoRepository estadoRepository, EstadoSearchRepository estadoSearchRepository) {
        this.estadoRepository = estadoRepository;
        this.estadoSearchRepository = estadoSearchRepository;
    }

    /**
     * POST  /estados : Create a new estado.
     *
     * @param estado the estado to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estado, or with status 400 (Bad Request) if the estado has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estados")
    @Timed
    public ResponseEntity<Estado> createEstado(@RequestBody Estado estado) throws URISyntaxException {
        log.debug("REST request to save Estado : {}", estado);
        if (estado.getId() != null) {
            throw new BadRequestAlertException("A new estado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Estado result = estadoRepository.save(estado);
        estadoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/estados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estados : Updates an existing estado.
     *
     * @param estado the estado to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estado,
     * or with status 400 (Bad Request) if the estado is not valid,
     * or with status 500 (Internal Server Error) if the estado couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estados")
    @Timed
    public ResponseEntity<Estado> updateEstado(@RequestBody Estado estado) throws URISyntaxException {
        log.debug("REST request to update Estado : {}", estado);
        if (estado.getId() == null) {
            return createEstado(estado);
        }
        Estado result = estadoRepository.save(estado);
        estadoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estado.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estados : get all the estados.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estados in body
     */
    @GetMapping("/estados")
    @Timed
    public List<Estado> getAllEstados() {
        log.debug("REST request to get all Estados");
        return estadoRepository.findAll();
        }

    /**
     * GET  /estados/:id : get the "id" estado.
     *
     * @param id the id of the estado to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estado, or with status 404 (Not Found)
     */
    @GetMapping("/estados/{id}")
    @Timed
    public ResponseEntity<Estado> getEstado(@PathVariable Long id) {
        log.debug("REST request to get Estado : {}", id);
        Estado estado = estadoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(estado));
    }

    /**
     * DELETE  /estados/:id : delete the "id" estado.
     *
     * @param id the id of the estado to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estados/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstado(@PathVariable Long id) {
        log.debug("REST request to delete Estado : {}", id);
        estadoRepository.delete(id);
        estadoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/estados?query=:query : search for the estado corresponding
     * to the query.
     *
     * @param query the query of the estado search
     * @return the result of the search
     */
    @GetMapping("/_search/estados")
    @Timed
    public List<Estado> searchEstados(@RequestParam String query) {
        log.debug("REST request to search Estados for query {}", query);
        return StreamSupport
            .stream(estadoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
