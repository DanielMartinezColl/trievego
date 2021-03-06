package com.edu.um.programacion2.repository;

import java.util.List;

import java.util.List;

import com.edu.um.programacion2.domain.Ciudad;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ciudad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CiudadRepository extends JpaRepository<Ciudad, Long> {

    //List<Ciudad> findByProvincia_ProvinciaId(Long provinciaId);

}
