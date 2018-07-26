package com.edu.um.programacion2.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.edu.um.programacion2.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Usuario.class.getName(), jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Usuario.class.getName() + ".favoritos", jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Usuario.class.getName() + ".participas", jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Usuario.class.getName() + ".tags", jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Evento.class.getName(), jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Evento.class.getName() + ".tags", jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Imagen.class.getName(), jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Tag.class.getName(), jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Tag.class.getName() + ".usuarios", jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Tag.class.getName() + ".eventos", jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Categoria.class.getName(), jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Ciudad.class.getName(), jcacheConfiguration);
            cm.createCache(com.edu.um.programacion2.domain.Provincia.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
