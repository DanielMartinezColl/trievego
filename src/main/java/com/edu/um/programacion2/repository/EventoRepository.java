package com.edu.um.programacion2.repository;

import com.edu.um.programacion2.domain.Evento;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Evento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    @Query("select distinct evento from Evento evento left join fetch evento.tags")
    List<Evento> findAllWithEagerRelationships();

    @Query("select evento from Evento evento left join fetch evento.tags where evento.id =:id")
    Evento findOneWithEagerRelationships(@Param("id") Long id);

}
