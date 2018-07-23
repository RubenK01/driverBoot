package driver.viaje;

import java.util.Date;
import java.util.List;

import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;

import driver.user.UserDto;

public class ViajeDto {
	@NotNull
	private int plazas;
	@NotNull
	private int minutos;
	@NotNull
	private Date fechaHora;
	@NotNull
	private UserDto conductor; 
	@NotNull
	@ManyToMany
	private List<UserDto> participantes;
	@NotNull
	private MapaDto mapa;
	
	public ViajeDto() {
	}
	public ViajeDto(int plazas, int minutos, Date fechaHora, UserDto conductor, List<UserDto> participantes,
			MapaDto mapa) {
		this.plazas = plazas;
		this.minutos = minutos;
		this.fechaHora = fechaHora;
		this.conductor = conductor;
		this.participantes = participantes;
		this.mapa = mapa;
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
	public UserDto getConductor() {
		return conductor;
	}
	public void setConductor(UserDto conductor) {
		this.conductor = conductor;
	}
	public List<UserDto> getParticipantes() {
		return participantes;
	}
	public void setParticipantes(List<UserDto> participantes) {
		this.participantes = participantes;
	}
	public MapaDto getMapa() {
		return mapa;
	}
	public void setMapa(MapaDto mapa) {
		this.mapa = mapa;
	}
	
	
	
	
}
