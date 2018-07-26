package com.edu.um.programacion2.repository.search;

import com.edu.um.programacion2.domain.Evento;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Evento entity.
 */
public interface EventoSearchRepository extends ElasticsearchRepository<Evento, Long> {
}
