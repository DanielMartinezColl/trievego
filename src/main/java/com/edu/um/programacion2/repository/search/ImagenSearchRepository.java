package com.edu.um.programacion2.repository.search;

import com.edu.um.programacion2.domain.Imagen;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Imagen entity.
 */
public interface ImagenSearchRepository extends ElasticsearchRepository<Imagen, Long> {
}
