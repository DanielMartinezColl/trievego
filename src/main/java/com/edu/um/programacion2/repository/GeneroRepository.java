package com.edu.um.programacion2.repository;

import com.edu.um.programacion2.domain.Genero;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Genero entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GeneroRepository extends JpaRepository<Genero, Long> {

}
