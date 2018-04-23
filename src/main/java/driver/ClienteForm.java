package driver;

import java.util.ArrayList;
import java.util.List;

public class ClienteForm {

	long id;
	String nombre;
	String telefono;
	String email;
	String observaciones;
	
	
	public ClienteForm(){

	}
	
	

	public ClienteForm(long id, String nombre, String telefono, String email, String observaciones) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.telefono = telefono;
		this.email = email;
		this.observaciones = observaciones;
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

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}


	

}
