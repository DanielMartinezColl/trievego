package com.edu.um.programacion2.repository;

import com.edu.um.programacion2.domain.Imagen;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Imagen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImagenRepository extends JpaRepository<Imagen, Long> {

}
