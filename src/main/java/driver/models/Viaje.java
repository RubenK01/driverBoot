package driver.models;

import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Viaje")
@Table(name = "Viaje")
public class Viaje {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	private String cEstado;
	@NotNull
	private int plazasDisponibles;
	@NotNull
	private int minutos;
	@NotNull
	private Date fecha;
	@NotNull
	private long idCreador;
	@NotNull
	@OneToMany(mappedBy="viaje")
	private List<ParticipanteViaje> participantes;
	@NotNull
	@OneToOne
	private Mapa mapa;
	/**
	 * @param cEstado
	 * @param plazasDisponibles
	 * @param minutos
	 * @param fecha
	 * @param idCreador
	 * @param participantes
	 * @param mapa
	 */
	public Viaje(String cEstado, int plazasDisponibles, int minutos, Date fecha, long idCreador,
			List<ParticipanteViaje> participantes, Mapa mapa) {
		super();
		this.cEstado = cEstado;
		this.plazasDisponibles = plazasDisponibles;
		this.minutos = minutos;
		this.fecha = fecha;
		this.idCreador = idCreador;
		this.participantes = participantes;
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
	public int getPlazasDisponibles() {
		return plazasDisponibles;
	}
	public void setPlazasDisponibles(int plazasDisponibles) {
		this.plazasDisponibles = plazasDisponibles;
	}
	public int getMinutos() {
		return minutos;
	}
	public void setMinutos(int minutos) {
		this.minutos = minutos;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public long getIdCreador() {
		return idCreador;
	}
	public void setIdCreador(long idCreador) {
		this.idCreador = idCreador;
	}
	public List<ParticipanteViaje> getParticipantes() {
		return participantes;
	}
	public void setParticipantes(List<ParticipanteViaje> participantes) {
		this.participantes = participantes;
	}
	public Mapa getMapa() {
		return mapa;
	}
	public void setMapa(Mapa mapa) {
		this.mapa = mapa;
	}
	
}
