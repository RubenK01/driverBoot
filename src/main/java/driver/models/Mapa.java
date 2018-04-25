package driver.models;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Mapa")
@Table(name = "Mapa")
public class Mapa {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	private String latOrigen;
	@NotNull
	private String logOrigen;
	@NotNull
	private String latDestino;
	@NotNull
	private String logDestino;
	@NotNull
	@OneToOne(mappedBy="mapa")
	private Viaje viaje;
	/**
	 * @param latOrigen
	 * @param logOrigen
	 * @param latDestino
	 * @param logDestino
	 * @param viaje
	 */
	public Mapa(String latOrigen, String logOrigen, String latDestino, String logDestino, Viaje viaje) {
		super();
		this.latOrigen = latOrigen;
		this.logOrigen = logOrigen;
		this.latDestino = latDestino;
		this.logDestino = logDestino;
		this.viaje = viaje;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getLatOrigen() {
		return latOrigen;
	}
	public void setLatOrigen(String latOrigen) {
		this.latOrigen = latOrigen;
	}
	public String getLogOrigen() {
		return logOrigen;
	}
	public void setLogOrigen(String logOrigen) {
		this.logOrigen = logOrigen;
	}
	public String getLatDestino() {
		return latDestino;
	}
	public void setLatDestino(String latDestino) {
		this.latDestino = latDestino;
	}
	public String getLogDestino() {
		return logDestino;
	}
	public void setLogDestino(String logDestino) {
		this.logDestino = logDestino;
	}
	public Viaje getViaje() {
		return viaje;
	}
	public void setViaje(Viaje viaje) {
		this.viaje = viaje;
	}
}
