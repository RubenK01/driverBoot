package driver.models;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Coche")
@Table(name = "Coche")
public class Coche {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	private String nombre;
	@Lob
	private byte[] foto;
	@NotNull
	private String matricula;
	@NotNull
	private String modelo;
	@NotNull
	private String color;
	@NotNull
	@ManyToOne
	private Usuario conductor;
	/**
	 * @param nombre
	 * @param foto
	 * @param sexo
	 * @param matricula
	 * @param modelo
	 * @param color
	 * @param conductor
	 */
	public Coche(String nombre, byte[] foto, String matricula, String modelo, String color,
			Usuario conductor) {
		super();
		this.nombre = nombre;
		this.foto = foto;
		this.matricula = matricula;
		this.modelo = modelo;
		this.color = color;
		this.conductor = conductor;
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
	public byte[] getFoto() {
		return foto;
	}
	public void setFoto(byte[] foto) {
		this.foto = foto;
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
	public Usuario getConductor() {
		return conductor;
	}
	public void setConductor(Usuario conductor) {
		this.conductor = conductor;
	}
	
	
	
}
