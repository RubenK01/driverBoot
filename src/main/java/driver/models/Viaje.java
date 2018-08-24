package driver.models;

import java.io.Serializable;
import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Viaje")
@Table(name = "Viaje")
public class Viaje  implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	/*
	 * '00' -> viaje terminado sin problemas
	 * '01' -> viaje con algún problema?
	 */
//	@NotNull
	private String cEstado;
	@NotNull
	private int plazas;
	@NotNull
	private int minutos;
	@NotNull
	private Date fechaHora;
	@NotNull
	@ManyToOne
	private Usuario conductor; 
	@NotNull
	@ManyToOne
	private Coche coche;
	@NotNull
	@ManyToMany
	private List<Usuario> pasajeros;
	
	@OneToOne(mappedBy="viaje", cascade = CascadeType.ALL)
	private Mapa mapa;
	
	public Viaje() {
	}
	public Viaje(long id, String cEstado, int plazas, int minutos, Date fechaHora, Usuario conductor, Coche coche,
			List<Usuario> pasajeros, Mapa mapa) {
		super();
		this.id = id;
		this.cEstado = cEstado;
		this.plazas = plazas;
		this.minutos = minutos;
		this.fechaHora = fechaHora;
		this.conductor = conductor;
		this.coche = coche;
		this.pasajeros = pasajeros;
		this.mapa = mapa;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getcEstado() {
		return cEstado;
	}
	public void setcEstado(String cEstado) {
		this.cEstado = cEstado;
	}
	public int getPlazas() {
		return plazas;
	}
	public void setPlazas(int plazas) {
		this.plazas = plazas;
	}
	public int getMinutos() {
		return minutos;
	}
	public void setMinutos(int minutos) {
		this.minutos = minutos;
	}
	public Date getFechaHora() {
		return fechaHora;
	}
	public void setFechaHora(Date fechaHora) {
		this.fechaHora = fechaHora;
	}
	public Usuario getConductor() {
		return conductor;
	}
	public void setConductor(Usuario conductor) {
		this.conductor = conductor;
	}
	public Coche getCoche() {
		return coche;
	}
	public void setCoche(Coche coche) {
		this.coche = coche;
	}
	public List<Usuario> getPasajeros() {
		return pasajeros;
	}
	public void setPasajeros(List<Usuario> pasajeros) {
		this.pasajeros = pasajeros;
	}
	public Mapa getMapa() {
		return mapa;
	}
	public void setMapa(Mapa mapa) {
		this.mapa = mapa;
	}
	
	
	
}
