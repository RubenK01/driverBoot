package driver.models;

import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Valoracion")
@Table(name = "Valoracion")
public class Valoracion {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	@NotNull
	String texto;
	@NotNull
	double puntuacion;
	@NotNull
	Date fecha;
	@NotNull
	@ManyToOne
	Usuario emisor;
	@NotNull
	@ManyToOne
	Usuario receptor;
	public Valoracion(String texto, double puntuacion, Date fecha, Usuario emisor, Usuario receptor) {
		super();
		this.texto = texto;
		this.puntuacion = puntuacion;
		this.fecha = fecha;
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
	public double getPuntuacion() {
		return puntuacion;
	}
	public void setPuntuacion(double puntuacion) {
		this.puntuacion = puntuacion;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
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
