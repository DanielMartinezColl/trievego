package com.edu.um.programacion2.repository.search;

import com.edu.um.programacion2.domain.Provincia;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Provincia entity.
 */
public interface ProvinciaSearchRepository extends ElasticsearchRepository<Provincia, Long> {
}
