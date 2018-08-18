package com.edu.um.programacion2.repository;

import com.edu.um.programacion2.domain.Tag;
import com.edu.um.programacion2.domain.Usuario;

import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Tag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query("select distinct tag from Tag tag left join fetch tag.usuarios")
    List<Tag> findAllWithEagerRelationships();

    @Query("select tag from Tag tag left join fetch tag.usuarios where tag.id =:id")
    Tag findOneWithEagerRelationships(@Param("id") Long id);

    Page<Tag> findAllByUsuariosContainsAndEstadoEquals(Pageable pageable, Usuario usuario, Boolean estado);

    Tag findOneWithEagerByNombreLike(String nombre);

}
