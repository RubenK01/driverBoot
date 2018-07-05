package driver;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.hibernate.validator.constraints.*;

public class CocheDto {
	@Lob
	private byte[] foto;
	 @NotEmpty
	private String matricula;
	 @NotEmpty
	private String modelo;
	 @NotEmpty
	private String color;
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
}
