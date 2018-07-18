package com.edu.um.programacion2.repository.search;

import com.edu.um.programacion2.domain.Estado;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Estado entity.
 */
public interface EstadoSearchRepository extends ElasticsearchRepository<Estado, Long> {
}
