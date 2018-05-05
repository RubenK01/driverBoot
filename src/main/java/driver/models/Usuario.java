package driver.models;

import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Usuario")
@Table(name = "Usuario")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	private String nombre;
	@NotNull
	private String apellido;
	@NotNull
	@Column(unique=true)
	private String telefono;
	@NotNull
	@Column(unique=true)
	private String email;
	@NotNull
	@Column(unique=true)
	private String dni;
	@NotNull
	private String nickUsuario;
	@NotNull
	private int minutos;
	@NotNull
	private String password;
	@Lob
	private byte[] foto;
	@NotNull
	private Boolean activo;
	@NotNull
	private Date fechaAlta;
	@NotNull
	private Date fechaExpCarnet;
	@NotNull
	private Date fechaNacimiento;
	@NotNull
	private char sexo;
//	@NotNull
//	private char rol;
	
	@OneToMany(mappedBy="emisor")
	private List<Mensaje> enviados;
	
	@OneToMany(mappedBy="receptor")
	private List<Mensaje> recibidos;
	
	@OneToMany(mappedBy="conductor")
	private List<Coche> coches;
	
	@OneToMany(mappedBy="receptor")
	private List<Valoracion> valoracionesRecibidas;
	
	@OneToMany(mappedBy="usuario")
	private List<ParticipanteViaje> viajes;
	
	@OneToMany(mappedBy="emisor")
	private List<Valoracion> valoracionesEnviadas;

	
	/**
	 * @param nombre
	 * @param apellido
	 * @param telefono
	 * @param email
	 * @param dni
	 * @param nickUsuario
	 * @param minutos
	 * @param password
	 * @param foto
	 * @param activo
	 * @param fechaAlta
	 * @param fechaExpCarnet
	 * @param fechaNacimiento
	 * @param sexo
	 * @param enviados
	 * @param recibidos
	 * @param coches
	 * @param valoracionesRecibidas
	 * @param viajes
	 * @param valoracionesEnviadas
	 */
	public Usuario(String nombre, String apellido, String telefono, String email, String dni, String nickUsuario,
			int minutos, String password, byte[] foto, Boolean activo, Date fechaAlta, Date fechaExpCarnet,
			Date fechaNacimiento, char sexo, List<Mensaje> enviados, List<Mensaje> recibidos, List<Coche> coches,
			List<Valoracion> valoracionesRecibidas, List<ParticipanteViaje> viajes,
			List<Valoracion> valoracionesEnviadas) {
		super();
		this.nombre = nombre;
		this.apellido = apellido;
		this.telefono = telefono;
		this.email = email;
		this.dni = dni;
		this.nickUsuario = nickUsuario;
		this.minutos = minutos;
		this.password = password;
		this.foto = foto;
		this.activo = activo;
		this.fechaAlta = fechaAlta;
		this.fechaExpCarnet = fechaExpCarnet;
		this.fechaNacimiento = fechaNacimiento;
		this.sexo = sexo;
		this.enviados = enviados;
		this.recibidos = recibidos;
		this.coches = coches;
		this.valoracionesRecibidas = valoracionesRecibidas;
		this.viajes = viajes;
		this.valoracionesEnviadas = valoracionesEnviadas;
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

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
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

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getNickUsuario() {
		return nickUsuario;
	}

	public void setNickUsuario(String nickUsuario) {
		this.nickUsuario = nickUsuario;
	}

	public int getMinutos() {
		return minutos;
	}

	public void setMinutos(int minutos) {
		this.minutos = minutos;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public byte[] getFoto() {
		return foto;
	}

	public void setFoto(byte[] foto) {
		this.foto = foto;
	}

	public Boolean getActivo() {
		return activo;
	}

	public void setActivo(Boolean activo) {
		this.activo = activo;
	}

	public Date getFechaAlta() {
		return fechaAlta;
	}

	public void setFechaAlta(Date fechaAlta) {
		this.fechaAlta = fechaAlta;
	}

	public Date getFechaExpCarnet() {
		return fechaExpCarnet;
	}

	public void setFechaExpCarnet(Date fechaExpCarnet) {
		this.fechaExpCarnet = fechaExpCarnet;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public List<Mensaje> getEnviados() {
		return enviados;
	}

	public void setEnviados(List<Mensaje> enviados) {
		this.enviados = enviados;
	}

	public List<Mensaje> getRecibidos() {
		return recibidos;
	}

	public void setRecibidos(List<Mensaje> recibidos) {
		this.recibidos = recibidos;
	}

	public List<Coche> getCoches() {
		return coches;
	}

	public void setCoches(List<Coche> coches) {
		this.coches = coches;
	}

	public List<Valoracion> getValoracionesRecibidas() {
		return valoracionesRecibidas;
	}

	public void setValoracionesRecibidas(List<Valoracion> valoracionesRecibidas) {
		this.valoracionesRecibidas = valoracionesRecibidas;
	}

	public List<ParticipanteViaje> getViajes() {
		return viajes;
	}

	public void setViajes(List<ParticipanteViaje> viajes) {
		this.viajes = viajes;
	}

	public List<Valoracion> getValoracionesEnviadas() {
		return valoracionesEnviadas;
	}

	public void setValoracionesEnviadas(List<Valoracion> valoracionesEnviadas) {
		this.valoracionesEnviadas = valoracionesEnviadas;
	}

	public char getSexo() {
		return sexo;
	}

	public void setSexo(char sexo) {
		this.sexo = sexo;
	}
	



}
