package com.edu.um.programacion2.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "genero")
    private Boolean genero;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "usuario_favorito",
               joinColumns = @JoinColumn(name="usuarios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="favoritos_id", referencedColumnName="id"))
    private Set<Evento> favoritos = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "usuario_participa",
               joinColumns = @JoinColumn(name="usuarios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="participas_id", referencedColumnName="id"))
    private Set<Evento> participas = new HashSet<>();

    @ManyToMany(mappedBy = "usuarios")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Tag> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public Usuario fechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Boolean isGenero() {
        return genero;
    }

    public Usuario genero(Boolean genero) {
        this.genero = genero;
        return this;
    }

    public void setGenero(Boolean genero) {
        this.genero = genero;
    }

    public User getUser() {
        return user;
    }

    public Usuario user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Evento> getFavoritos() {
        return favoritos;
    }

    public Usuario favoritos(Set<Evento> eventos) {
        this.favoritos = eventos;
        return this;
    }

    public Usuario addFavorito(Evento evento) {
        this.favoritos.add(evento);
        return this;
    }

    public Usuario removeFavorito(Evento evento) {
        this.favoritos.remove(evento);
        return this;
    }

    public void setFavoritos(Set<Evento> eventos) {
        this.favoritos = eventos;
    }

    public Set<Evento> getParticipas() {
        return participas;
    }

    public Usuario participas(Set<Evento> eventos) {
        this.participas = eventos;
        return this;
    }

    public Usuario addParticipa(Evento evento) {
        this.participas.add(evento);
        return this;
    }

    public Usuario removeParticipa(Evento evento) {
        this.participas.remove(evento);
        return this;
    }

    public void setParticipas(Set<Evento> eventos) {
        this.participas = eventos;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Usuario tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Usuario addTags(Tag tag) {
        this.tags.add(tag);
        tag.getUsuarios().add(this);
        return this;
    }

    public Usuario removeTags(Tag tag) {
        this.tags.remove(tag);
        tag.getUsuarios().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Usuario usuario = (Usuario) o;
        if (usuario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", genero='" + isGenero() + "'" +
            "}";
    }
}
