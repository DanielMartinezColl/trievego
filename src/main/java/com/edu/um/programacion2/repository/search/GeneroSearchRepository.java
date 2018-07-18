package com.edu.um.programacion2.repository.search;

import com.edu.um.programacion2.domain.Genero;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Genero entity.
 */
public interface GeneroSearchRepository extends ElasticsearchRepository<Genero, Long> {
}
