package driver.models;

import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Mensaje")
@Table(name = "Mensaje")
public class Mensaje {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	private String texto;
	@NotNull
	private Date fecha;
	@NotNull
	private Boolean leido;
	@NotNull
	@ManyToOne
	private Usuario emisor;
	@NotNull
	@ManyToOne
	private Usuario receptor;
	/**
	 * @param texto
	 * @param fecha
	 * @param leido
	 * @param emisor
	 * @param receptor
	 */
	public Mensaje(String texto, Date fecha, Boolean leido, Usuario emisor, Usuario receptor) {
		super();
		this.texto = texto;
		this.fecha = fecha;
		this.leido = leido;
		this.emisor = emisor;
		this.receptor = receptor;
	}
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
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public Boolean getLeido() {
		return leido;
	}
	public void setLeido(Boolean leido) {
		this.leido = leido;
	}
	public Usuario getEmisor() {
		return emisor;
	}
	public void setEmisor(Usuario emisor) {
		this.emisor = emisor;
	}
	public Usuario getReceptor() {
		return receptor;
	}
	public void setReceptor(Usuario receptor) {
		this.receptor = receptor;
	}
	
	
}
