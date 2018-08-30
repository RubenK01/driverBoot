package driver.models;

import java.io.Serializable;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Mapa")
@Table(name = "Mapa")
public class Mapa  implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -6803545848736383107L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	private Double latOrigen;
	@NotNull
	private Double lngOrigen;
	@NotNull
	private Double latDestino;
	@NotNull
	private Double lngDestino;
	@NotNull
	private String descOrigen;
	@NotNull
	private String descDestino;

	@OneToOne
	private Viaje viaje;

	
	public Mapa() {

	}
	public Mapa(long id, Double latOrigen, Double lngOrigen, Double latDestino, Double lngDestino, String descOrigen,
			String descDestino, Viaje viaje) {
		super();
		this.id = id;
		this.latOrigen = latOrigen;
		this.lngOrigen = lngOrigen;
		this.latDestino = latDestino;
		this.lngDestino = lngDestino;
		this.descOrigen = descOrigen;
		this.descDestino = descDestino;
		this.viaje = viaje;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Double getLatOrigen() {
		return latOrigen;
	}
	public void setLatOrigen(Double latOrigen) {
		this.latOrigen = latOrigen;
	}
	public Double getLngOrigen() {
		return lngOrigen;
	}
	public void setLngOrigen(Double lngOrigen) {
		this.lngOrigen = lngOrigen;
	}
	public Double getLatDestino() {
		return latDestino;
	}
	public void setLatDestino(Double latDestino) {
		this.latDestino = latDestino;
	}
	public Double getLngDestino() {
		return lngDestino;
	}
	public void setLngDestino(Double lngDestino) {
		this.lngDestino = lngDestino;
	}
	public Viaje getViaje() {
		return viaje;
	}
	public void setViaje(Viaje viaje) {
		this.viaje = viaje;
	}
	public String getDescOrigen() {
		return descOrigen;
	}
	public void setDescOrigen(String descOrigen) {
		this.descOrigen = descOrigen;
	}
	public String getDescDestino() {
		return descDestino;
	}
	public void setDescDestino(String descDestino) {
		this.descDestino = descDestino;
	}
}
