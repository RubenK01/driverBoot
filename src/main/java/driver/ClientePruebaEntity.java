package driver;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;


@Entity(name = "clientes")
@Table(name = "clientes")
public class ClientePruebaEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long idCliente;
	@NotNull
	String nombre;
	String telefono;
	String email;
	@Column(length=3000)
	String observaciones;
	String usuario;
	Date fechaAlta;
	Date fechaModificacion;
	
	public ClientePruebaEntity() {
		super();
	}

	public ClientePruebaEntity(long idCliente) {
		this.idCliente = idCliente;
	}

	

	public ClientePruebaEntity(long idCliente, String nombre, String telefono, String email, String observaciones,
			String usuario, Date fechaAlta, Date fechaModificacion) {
		super();
		this.idCliente = idCliente;
		this.nombre = nombre;
		this.telefono = telefono;
		this.email = email;
		this.observaciones = observaciones;
		this.usuario = usuario;
		this.fechaAlta = fechaAlta;
		this.fechaModificacion = fechaModificacion;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public Date getFechaAlta() {
		return fechaAlta;
	}

	public void setFechaAlta(Date fechaAlta) {
		this.fechaAlta = fechaAlta;
	}

	public Date getFechaModificacion() {
		return fechaModificacion;
	}

	public void setFechaModificacion(Date fechaModificacion) {
		this.fechaModificacion = fechaModificacion;
	}

	public long getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(long idCliente) {
		this.idCliente = idCliente;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

}
