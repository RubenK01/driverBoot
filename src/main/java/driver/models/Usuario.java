package driver.models;

import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Usuario")
@Table(name = "Usuario")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	@NotNull
	String nombre;
	@NotNull
	String apellido;
	@NotNull
	String telefono;
	@NotNull
	String email;
	@NotNull
	@Column(unique=true)
	String dni;
	@NotNull
	String nickUsuario;
	int minutos;
	@NotNull
	String password;
	//foto?
	Boolean activo;
	Date fechaAlta;
	@NotNull
	Date fechaExpCarnet;
	@NotNull
	Date fechaNacimiento;
	
	@OneToMany(mappedBy="emisor")
	List<Mensaje> enviados;
	
	@OneToMany(mappedBy="receptor")
	List<Mensaje> recibidos;
	
	@OneToMany(mappedBy="dueño")
	List<Coche> coches;
	
	@OneToMany(mappedBy="receptor")
	List<Valoracion> valoracionesRecibidas;
	
	@OneToMany(mappedBy="emisor")
	List<Valoracion> valoracionesEnviadas;
//	
//	@OneToMany(mappedBy="usuario")
//	List<ParticipanteViaje> viajes;


}
