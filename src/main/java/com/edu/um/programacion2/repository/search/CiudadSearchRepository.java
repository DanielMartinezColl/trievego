package com.edu.um.programacion2.repository.search;

import com.edu.um.programacion2.domain.Ciudad;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Ciudad entity.
 */
public interface CiudadSearchRepository extends ElasticsearchRepository<Ciudad, Long> {
}
