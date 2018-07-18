package com.edu.um.programacion2.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Evento.
 */
@Entity
@Table(name = "evento")
@Document(indexName = "evento")
public class Evento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "resumen")
    private String resumen;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio")
    private Integer precio;

    @Column(name = "fecha_hora")
    private ZonedDateTime fechaHora;

    @Column(name = "direccion")
    private String direccion;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @ManyToOne
    private Ciudad ciudad;

    @ManyToOne
    private Categoria categoria;

    @ManyToOne
    private Estado estado;

    @ManyToOne
    private User user;

    @ManyToMany
    @JoinTable(name = "evento_tag",
               joinColumns = @JoinColumn(name="eventos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tags_id", referencedColumnName="id"))
    private Set<Tag> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Evento nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getResumen() {
        return resumen;
    }

    public Evento resumen(String resumen) {
        this.resumen = resumen;
        return this;
    }

    public void setResumen(String resumen) {
        this.resumen = resumen;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Evento descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getPrecio() {
        return precio;
    }

    public Evento precio(Integer precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public ZonedDateTime getFechaHora() {
        return fechaHora;
    }

    public Evento fechaHora(ZonedDateTime fechaHora) {
        this.fechaHora = fechaHora;
        return this;
    }

    public void setFechaHora(ZonedDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public String getDireccion() {
        return direccion;
    }

    public Evento direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public Evento imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public Evento imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Ciudad getCiudad() {
        return ciudad;
    }

    public Evento ciudad(Ciudad ciudad) {
        this.ciudad = ciudad;
        return this;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public Evento categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Estado getEstado() {
        return estado;
    }

    public Evento estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public User getUser() {
        return user;
    }

    public Evento user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Evento tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Evento addTag(Tag tag) {
        this.tags.add(tag);
        tag.getEventos().add(this);
        return this;
    }

    public Evento removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getEventos().remove(this);
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
        Evento evento = (Evento) o;
        if (evento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Evento{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", resumen='" + getResumen() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", precio=" + getPrecio() +
            ", fechaHora='" + getFechaHora() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
