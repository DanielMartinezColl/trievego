package com.edu.um.programacion2.repository;

import com.edu.um.programacion2.domain.Usuario;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Usuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("select distinct usuario from Usuario usuario left join fetch usuario.favoritos left join fetch usuario.participas")
    List<Usuario> findAllWithEagerRelationships();

    @Query("select usuario from Usuario usuario left join fetch usuario.favoritos left join fetch usuario.participas where usuario.id =:id")
    Usuario findOneWithEagerRelationships(@Param("id") Long id);

    Usuario findOneByUser_Id(Long id);
}
