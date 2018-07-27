package driver.viaje;

import javax.validation.constraints.NotNull;

public class MapaDto {
	@NotNull
	private String latOrigen;
	@NotNull
	private String lngOrigen;
	@NotNull
	private String latDestino;
	@NotNull
	private String lngDestino;
	@NotNull
	private String descOrigen;
	@NotNull
	private String descDestino;
	
	public MapaDto() {

	}
	public MapaDto(String latOrigen, String lngOrigen, String latDestino, String lngDestino, String descOrigen,
			String descDestino) {

		this.latOrigen = latOrigen;
		this.lngOrigen = lngOrigen;
		this.latDestino = latDestino;
		this.lngDestino = lngDestino;
		this.descOrigen = descOrigen;
		this.descDestino = descDestino;
	}
	public String getLatOrigen() {
		return latOrigen;
	}
	public void setLatOrigen(String latOrigen) {
		this.latOrigen = latOrigen;
	}
	public String getLngOrigen() {
		return lngOrigen;
	}
	public void setlLngOrigen(String lngOrigen) {
		this.lngOrigen = lngOrigen;
	}
	public String getLatDestino() {
		return latDestino;
	}
	public void setLatDestino(String latDestino) {
		this.latDestino = latDestino;
	}
	public String getLngDestino() {
		return lngDestino;
	}
	public void setLngDestino(String lngDestino) {
		this.lngDestino = lngDestino;
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
