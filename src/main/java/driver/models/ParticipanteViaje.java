package driver.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "ParticipanteViaje")
@Table(name = "ParticipanteViaje")
public class ParticipanteViaje {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	@ManyToOne
	private Usuario usuario;
	@NotNull
	@ManyToOne
	private Viaje viaje;
	@NotNull
	private String rol;
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
