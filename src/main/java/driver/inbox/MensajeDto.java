package driver.inbox;

import java.util.Date;

import org.hibernate.validator.constraints.NotEmpty;

import driver.user.UserDto;

public class MensajeDto {
	
	private long id;
	@NotEmpty
	private String texto;
	@NotEmpty
	private Date fechaHora;
	@NotEmpty
	private Boolean leido;
	@NotEmpty
	private UserDto emisor;
	@NotEmpty
	private UserDto receptor;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		this.texto = texto;
	}
	public Date getFechaHora() {
		return fechaHora;
	}
	public void setFechaHora(Date fechaHora) {
		this.fechaHora = fechaHora;
	}
	public Boolean getLeido() {
		return leido;
	}
	public void setLeido(Boolean leido) {
		this.leido = leido;
	}
	public UserDto getEmisor() {
		return emisor;
	}
	public void setEmisor(UserDto emisor) {
		this.emisor = emisor;
	}
	public UserDto getReceptor() {
		return receptor;
	}
	public void setReceptor(UserDto receptor) {
		this.receptor = receptor;
	}
}
