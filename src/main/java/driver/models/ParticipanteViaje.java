package driver.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

public class ParticipanteViaje {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	@NotNull
	@ManyToOne
	Usuario usuario;
	@NotNull
	@ManyToOne
	Viaje viaje;
	@NotNull
	String rol;
	/**
	 * @param usuario
	 * @param viaje
	 * @param rol
	 */
	public ParticipanteViaje(Usuario usuario, Viaje viaje, String rol) {
		super();
		this.usuario = usuario;
		this.viaje = viaje;
		this.rol = rol;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public Viaje getViaje() {
		return viaje;
	}
	public void setViaje(Viaje viaje) {
		this.viaje = viaje;
	}
	public String getRol() {
		return rol;
	}
	public void setRol(String rol) {
		this.rol = rol;
	}
}
