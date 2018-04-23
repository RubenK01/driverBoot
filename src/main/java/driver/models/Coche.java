package driver.models;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Coche")
@Table(name = "Coche")
public class Coche {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	@NotNull
	String nombre;
	@NotNull
	String matricula;
	@NotNull
	String modelo;
	@NotNull
	String color;
	//foto
	@NotNull
	@ManyToOne
	Usuario dueño;
	public Coche(String nombre, String matricula, String modelo, String color, Usuario dueño) {
		super();
		this.nombre = nombre;
		this.matricula = matricula;
		this.modelo = modelo;
		this.color = color;
		this.dueño = dueño;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getMatricula() {
		return matricula;
	}
	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}
	public String getModelo() {
		return modelo;
	}
	public void setModelo(String modelo) {
		this.modelo = modelo;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public Usuario getDueño() {
		return dueño;
	}
	public void setDueño(Usuario dueño) {
		this.dueño = dueño;
	}

	
}
