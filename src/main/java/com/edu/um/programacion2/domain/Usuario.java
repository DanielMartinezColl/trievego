package com.edu.um.programacion2.domain;


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
@Document(indexName = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToOne
    private Genero genero;

    @ManyToMany
    @JoinTable(name = "usuario_evento",
               joinColumns = @JoinColumn(name="usuarios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="eventos_id", referencedColumnName="id"))
    private Set<Evento> eventos = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "usuario_participa",
               joinColumns = @JoinColumn(name="usuarios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="participas_id", referencedColumnName="id"))
    private Set<Evento> participas = new HashSet<>();

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

    public Genero getGenero() {
        return genero;
    }

    public Usuario genero(Genero genero) {
        this.genero = genero;
        return this;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public Set<Evento> getEventos() {
        return eventos;
    }

    public Usuario eventos(Set<Evento> eventos) {
        this.eventos = eventos;
        return this;
    }

    public Usuario addEvento(Evento evento) {
        this.eventos.add(evento);
        return this;
    }

    public Usuario removeEvento(Evento evento) {
        this.eventos.remove(evento);
        return this;
    }

    public void setEventos(Set<Evento> eventos) {
        this.eventos = eventos;
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
            ", genero='" + getGenero() + "'" +
            "}";
    }
}
