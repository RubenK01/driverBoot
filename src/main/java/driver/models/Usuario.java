package driver.models;

import java.io.*;
import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Usuario")
@Table(name = "Usuario")
public class Usuario implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private long id;
	@NotNull
	private String firstName;
	@NotNull
	private String lastName;
	
	//@NotNull
	//@Column(unique=true)
	private String telefono;
	@NotNull
	@Column(unique=true)
	private String email;
	@NotNull
	@Column(unique=true)
	private String dni;
	@NotNull
	private int minutos;
	@NotNull
	private String password;
	@Lob
	private byte[] userImg;
	//@NotNull
	private Boolean activo;
	//@NotNull
	private Date fechaAlta;
	@NotNull
	private Date fechaExpCarnet;
	@NotNull
	private Date fechaNacimiento;
	@NotNull
	private char sexo;
	
	 @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	    @JoinTable(
	            name = "users_roles",
	            joinColumns = @JoinColumn(
	                    name = "user_id", referencedColumnName = "id"),
	            inverseJoinColumns = @JoinColumn(
	                    name = "role_id", referencedColumnName = "id"))
	    private Collection<Role> roles;
	
	@OneToMany(mappedBy="emisor")
	private List<Mensaje> enviados;
	
	@OneToMany(mappedBy="receptor")
	private List<Mensaje> recibidos;
	
	@ManyToMany(mappedBy="pasajeros")
	private List<Viaje> viajes;
	
	@OneToMany(mappedBy="conductor")
	private List<Viaje> viajesConducidos;

	@OneToMany(cascade= CascadeType.ALL)
	@JoinColumn(name="conductor")
	private Collection<Coche> coches;

	
	public Usuario() {
	}

	public Usuario(long id, String firstName, String lastName, String telefono, String email, String dni, int minutos,
			String password, byte[] userImg, Boolean activo, Date fechaAlta, Date fechaExpCarnet, Date fechaNacimiento,
			char sexo, Collection<Role> roles, List<Mensaje> enviados, List<Mensaje> recibidos, List<Viaje> viajes,
			List<Viaje> viajesConducidos, Collection<Coche> coches) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.telefono = telefono;
		this.email = email;
		this.dni = dni;
		this.minutos = minutos;
		this.password = password;
		this.userImg = userImg;
		this.activo = activo;
		this.fechaAlta = fechaAlta;
		this.fechaExpCarnet = fechaExpCarnet;
		this.fechaNacimiento = fechaNacimiento;
		this.sexo = sexo;
		this.roles = roles;
		this.enviados = enviados;
		this.recibidos = recibidos;
		this.viajes = viajes;
		this.viajesConducidos = viajesConducidos;
		this.coches = coches;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	public byte[] getUserImg() {
		return userImg;
	}

	public void setUserImg(byte[] userImg) {
		this.userImg = userImg;
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

	public char getSexo() {
		return sexo;
	}

	public void setSexo(char sexo) {
		this.sexo = sexo;
	}

	public Collection<Role> getRoles() {
		return roles;
	}

	public void setRoles(Collection<Role> roles) {
		this.roles = roles;
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

	public List<Viaje> getViajes() {
		return viajes;
	}

	public void setViajes(List<Viaje> viajes) {
		this.viajes = viajes;
	}

	public List<Viaje> getViajesConducidos() {
		return viajesConducidos;
	}

	public void setViajesConducidos(List<Viaje> viajesConducidos) {
		this.viajesConducidos = viajesConducidos;
	}

	public Collection<Coche> getCoches() {
		return coches;
	}

	public void setCoches(Collection<Coche> coches) {
		this.coches = coches;
	}


	

}
