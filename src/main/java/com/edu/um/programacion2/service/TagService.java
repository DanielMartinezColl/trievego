package com.edu.um.programacion2.service;

import com.edu.um.programacion2.domain.Tag;
import com.edu.um.programacion2.domain.User;
import com.edu.um.programacion2.domain.Usuario;
import com.edu.um.programacion2.repository.TagRepository;

import com.edu.um.programacion2.service.UsuarioService;
import com.edu.um.programacion2.web.rest.errors.BadRequestAlertException;
import com.edu.um.programacion2.repository.UserRepository;
import com.edu.um.programacion2.repository.UsuarioRepository;

import com.edu.um.programacion2.repository.search.TagSearchRepository;
import com.edu.um.programacion2.security.SecurityUtils;
import com.google.thirdparty.publicsuffix.PublicSuffixPatterns;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import antlr.collections.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

/**
 * Service Implementation for managing Tag.
 */
@Service
@Transactional
public class TagService {

    private final Logger log = LoggerFactory.getLogger(TagService.class);

    private final TagRepository tagRepository;

    private final TagSearchRepository tagSearchRepository;

    private final UsuarioService usuarioService;

    private final UserRepository UserRepository;

    private final UsuarioRepository usuarioRepository;

    public TagService(TagRepository tagRepository, TagSearchRepository tagSearchRepository, UsuarioService usuarioService,  UserRepository UserRepository, UsuarioRepository usuarioRepository) {
        this.tagRepository = tagRepository;
        this.tagSearchRepository = tagSearchRepository;
        this.usuarioService = usuarioService;
        this.UserRepository = UserRepository;
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Save a tag.
     *
     * @param tag the entity to save
     * @return the persisted entity
     */
    public Tag save(Tag tag) {
        log.debug("Request to save Tag : {}", tag);
        Tag result = tagRepository.save(tag);
        tagSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the tags.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Tag> findAll(Pageable pageable) {
        log.debug("Request to get all Tags");
        return tagRepository.findAll(pageable);
    }

    /**
     * Get one tag by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Tag findOne(Long id) {
        log.debug("Request to get Tag : {}", id);
        return tagRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the tag by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Tag : {}", id);
        tagRepository.delete(id);
        tagSearchRepository.delete(id);
    }

    /**
     * Search for the tag corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Tag> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Tags for query {}", query);
        Page<Tag> result = tagSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }



      /**
     * Get all the tagusuario.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    

    public Page<Tag> findAllByUsuariosContainsAndEstadoEquals(Pageable pageable, Usuario usuario, Boolean estado) {
            return this.tagRepository.findAllByUsuariosContainsAndEstadoEquals(pageable, usuario, estado);
    
    };


     /**
     * guardar  tags  y  relacion con usario.
     */
    public Tag guardartagusuario(Tag tag){

        Optional<String> currentUsuario = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = this.UserRepository.findOneByLogin(currentUsuario.get());
        Usuario usuario = this.usuarioService.findOneByUser_Id(user.get().getId());
        Usuario usuarioEager = this.usuarioRepository.findOneWithEagerRelationships(usuario.getId());

        Tag tagbuscarLazy = null;

        try {
            tagbuscarLazy = this.tagRepository.findOneWithEagerByNombreLike(tag.getNombre());
        } catch (Exception e) {
            e.printStackTrace();
        }


        Tag result = null;

        if(tagbuscarLazy == null || tagbuscarLazy.getId() == null ){
        
            log.debug("REST request to save Tag : {}", tag);
            if (tag.getId() != null) {
                throw new BadRequestAlertException("A new tag cannot already have an ID", "tagservice", "idexists");
            }
            Set<Usuario> usuarios = new HashSet<Usuario>();
            usuarios.add(usuarioEager);
            tag.setUsuarios(usuarios);
            tag.setEstado(true);
            result = this.save(tag);
        }
        else{
             if(tagbuscarLazy.isEstado()== true && tagbuscarLazy.getId() != null){
                Set<Usuario> usuarios = tagbuscarLazy.getUsuarios();
                usuarios.add(usuarioEager);
                tagbuscarLazy.setUsuarios(usuarios);
                result = this.save(tagbuscarLazy);
            } else {
                throw new BadRequestAlertException("Ese tag está deshabilitado", "tagservice", "deshabilitado");
            }
        } 

        return result;

    }



    /**
     * delete relacion id usario.
    
     */

    public void tagusuariodelete(Long id){

    Optional<String> currentUsuario = SecurityUtils.getCurrentUserLogin();
    Optional<User> user = this.UserRepository.findOneByLogin(currentUsuario.get());
    Usuario usuario = this.usuarioService.findOneByUser_Id(user.get().getId());

    //listado de tags del usuario 
    Set<Tag> listaDeTags = usuario.getTags();
    //busca el tags q le mando con el id        
    Tag tag = tagRepository.findOneWithEagerRelationships(id);


    if(listaDeTags.remove(tag)) {
        
        usuario.setTags(listaDeTags);
        Set<Usuario> listausuario = tag.getUsuarios();
        listausuario.remove(usuario);
        tag.setUsuarios(listausuario);
        
        tagRepository.save(tag);
        usuarioRepository.save(usuario);
        }
    }


    /**
     * Search for the tag corresponding to usuario.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Tag> searchTagusuario(String query, Pageable pageable, Boolean estado) {
        Optional<String> currentUsuario = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = this.UserRepository.findOneByLogin(currentUsuario.get());
        Usuario usuario = this.usuarioService.findOneByUser_Id(user.get().getId());
        Usuario usuarioEager = this.usuarioRepository.findOneWithEagerRelationships(usuario.getId());

        log.debug("Request to search for a page of Tags for query {}", query);
        Page<Tag> result = tagRepository.findAllByUsuariosContainsAndEstadoEqualsAndNombreLike(pageable,  usuario, estado, query);
        return result;
    }



}
