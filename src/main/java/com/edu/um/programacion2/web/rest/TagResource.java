package com.edu.um.programacion2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edu.um.programacion2.domain.Tag;
import com.edu.um.programacion2.domain.User;
import com.edu.um.programacion2.domain.Usuario;
import com.edu.um.programacion2.repository.TagRepository;
import com.edu.um.programacion2.repository.UserRepository;
import com.edu.um.programacion2.repository.UsuarioRepository;
import com.edu.um.programacion2.security.SecurityUtils;
import com.edu.um.programacion2.service.TagService;
import com.edu.um.programacion2.service.UsuarioService;
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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Tag.
 */
@RestController
@RequestMapping("/api")
public class TagResource {

    private final Logger log = LoggerFactory.getLogger(TagResource.class);

    private static final String ENTITY_NAME = "tag";

    private final TagService tagService;

    private final TagRepository tagRepository;

    private final UsuarioService usuarioService;

    private final UserRepository UserRepository;

    private final UsuarioRepository usuarioRepository;

    public TagResource(TagService tagService, UsuarioService usuarioService, TagRepository tagRepository,  UserRepository UserRepository, UsuarioRepository usuarioRepository) {
        this.tagService = tagService;
        this.usuarioService = usuarioService;
        this.UserRepository = UserRepository;
        this.usuarioRepository = usuarioRepository;
        this.tagRepository = tagRepository;
    }

    /**
     * POST  /tags : Create a new tag.
     *
     * @param tag the tag to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tag, or with status 400 (Bad Request) if the tag has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tags")
    @Timed
    public ResponseEntity<Tag> createTag(@RequestBody Tag tag) throws URISyntaxException {
        log.debug("REST request to save Tag : {}", tag);
        if (tag.getId() != null) {
            throw new BadRequestAlertException("A new tag cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tag result = tagService.save(tag);
        return ResponseEntity.created(new URI("/api/tags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

/**
     * POST  /tagusuariocrear : Create a new tag.
     *
     * @param tag the tag to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tag, or with status 400 (Bad Request) if the tag has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tagusuariocrear")
    @Timed
    public ResponseEntity<Tag> createTagusuario(@RequestBody Tag tag) throws URISyntaxException {
        Optional<String> currentUsuario = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = this.UserRepository.findOneByLogin(currentUsuario.get());
        Usuario usuario = this.usuarioService.findOneByUser_Id(user.get().getId());
        Usuario usuarioEager = this.usuarioRepository.findOneWithEagerRelationships(usuario.getId());
        
        Tag tagbuscarLazy = this.tagRepository.findOneWithEagerByNombreLike(tag.getNombre());


        Tag result = null;

        if(tagbuscarLazy == null || tagbuscarLazy.getId() == null ){
        
            log.debug("REST request to save Tag : {}", tag);
            if (tag.getId() != null) {
                throw new BadRequestAlertException("A new tag cannot already have an ID", ENTITY_NAME, "idexists");
            }

            Set<Usuario> usuarios = new HashSet<Usuario>();
        
            usuarios.add(usuarioEager);

            tag.setUsuarios(usuarios);
            tag.setEstado(true);
            result = tagService.save(tag);
        }

        else{
            Tag tagbuscar = this.tagRepository.findOneWithEagerRelationships(tagbuscarLazy.getId());
            if(tagbuscar.isEstado()== true){
                Set<Usuario> usuarios = tagbuscar.getUsuarios();
                usuarios.add(usuarioEager);
                tagbuscar.setUsuarios(usuarios);
                result = tagService.save(tag);
            } else {
                throw new BadRequestAlertException("Ese tag está deshabilitado", ENTITY_NAME, "deshabilitado");
            }
        } 
        return ResponseEntity.created(new URI("/api/tagusuairo/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
        
           
}



    /**
     * PUT  /tags : Updates an existing tag.
     *
     * @param tag the tag to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tag,
     * or with status 400 (Bad Request) if the tag is not valid,
     * or with status 500 (Internal Server Error) if the tag couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tags")
    @Timed
    public ResponseEntity<Tag> updateTag(@RequestBody Tag tag) throws URISyntaxException {
        log.debug("REST request to update Tag : {}", tag);
        if (tag.getId() == null) {
            return createTag(tag);
        }
        Tag result = tagService.save(tag);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tag.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tags : get all the tags.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tags in body
     */
    @GetMapping("/tags")
    @Timed
    public ResponseEntity<List<Tag>> getAllTags(Pageable pageable) {
        log.debug("REST request to get a page of Tags");
        Page<Tag> page = tagService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tags");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tagusuario : get all the tagusuario.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tagusuario in body
     */
    @GetMapping("/tagusuario")
    @Timed
    public ResponseEntity<List<Tag>> getAllTagusuario(Pageable pageable) {
        log.debug("REST request to get a page of Tags");
        Optional<String> currentUsuario = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = this.UserRepository.findOneByLogin(currentUsuario.get());
        Usuario usuario = this.usuarioService.findOneByUser_Id(user.get().getId());

        Page<Tag> page = tagService.findAllByUsuariosContainsAndEstadoEquals(pageable, usuario, Boolean.TRUE);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tagusuario");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }



    /**
     * GET  /tags/:id : get the "id" tag.
     *
     * @param id the id of the tag to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tag, or with status 404 (Not Found)
     */
    @GetMapping("/tags/{id}")
    @Timed
    public ResponseEntity<Tag> getTag(@PathVariable Long id) {
        log.debug("REST request to get Tag : {}", id);
        Tag tag = tagService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tag));
    }

    /**
     * DELETE  /tags/:id : delete the "id" tag.
     *
     * @param id the id of the tag to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tags/{id}")
    @Timed
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        log.debug("REST request to delete Tag : {}", id);
        tagService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tags?query=:query : search for the tag corresponding
     * to the query.
     *
     * @param query the query of the tag search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/tags")
    @Timed
    public ResponseEntity<List<Tag>> searchTags(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Tags for query {}", query);
        Page<Tag> page = tagService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/tags");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
