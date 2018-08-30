package driver.user;

import java.util.*;

import javax.persistence.*;

import org.hibernate.validator.constraints.*;

import driver.inbox.MensajeDto;
import driver.trip.ViajeDto;

//@FieldMatch.List({
//    @FieldMatch(first = "password", second = "confirmPassword", message = "The password fields must match"),
//    @FieldMatch(first = "email", second = "confirmEmail", message = "The email fields must match")
//})
public class UserDto {
	    private String firstName;

	    
	    private String lastName;

	    
	    private String password;
	    
	    
	    @Email
	    @Column(unique=true)
	    private String email;
	    @Lob
		private byte[] userImg;
	    
	    private Date fExpiryDate;
	    @Column(unique=true)
	    private String dni;
	    
	    private String phone;
	    
	    private Date fBirthDate;
	    
	    private String gender;
	    
	    private int minutos;
	    
	    private  Collection<CocheDto> coches;
	    
	    private  Collection<ViajeDto> viajes;
	    
	    private  Collection<ViajeDto> viajesCreados;
	    
	    private  List<MensajeDto> mensajesRecibidos;
	    
	    private  List<MensajeDto> mensajesEnviados;
	    

		public UserDto() {
			super();
		}

		public UserDto(String firstName, String lastName, String email, byte[] userImg) {
			super();
			this.firstName = firstName;
			this.lastName = lastName;
			this.email = email;
			this.userImg = userImg;
		}

		public Collection<ViajeDto> getViajes() {
			return viajes;
		}

		public void setViajes(Collection<ViajeDto> viajes) {
			this.viajes = viajes;
		}

		public Collection<ViajeDto> getViajesCreados() {
			return viajesCreados;
		}

		public void setViajesCreados(Collection<ViajeDto> viajesCreados) {
			this.viajesCreados = viajesCreados;
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

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public byte[] getUserImg() {
			return userImg;
		}

		public void setUserImg(byte[] userImg) {
			this.userImg = userImg;
		}

		public Date getfExpiryDate() {
			return fExpiryDate;
		}

		public void setfExpiryDate(Date fExpryDate) {
			this.fExpiryDate = fExpryDate;
		}

		public String getDni() {
			return dni;
		}

		public void setDni(String dni) {
			this.dni = dni;
		}

		public String getPhone() {
			return phone;
		}

		public void setPhone(String phone) {
			this.phone = phone;
		}

		public Date getfBirthDate() {
			return fBirthDate;
		}

		public void setfBirthDate(Date fBirthDate) {
			this.fBirthDate = fBirthDate;
		}

		public String getGender() {
			return gender;
		}

		public void setGender(String gender) {
			this.gender = gender;
		}

		public Collection<CocheDto> getCoches() {
			return coches;
		}

		public void setCoches(Collection<CocheDto> coches) {
			this.coches = coches;
		}

		public List<MensajeDto> getMensajesRecibidos() {
			return mensajesRecibidos;
		}

		public void setMensajesRecibidos(List<MensajeDto> mensajesRecibidos) {
			this.mensajesRecibidos = mensajesRecibidos;
		}

		public List<MensajeDto> getMensajesEnviados() {
			return mensajesEnviados;
		}

		public void setMensajesEnviados(List<MensajeDto> mensajesEnviados) {
			this.mensajesEnviados = mensajesEnviados;
		}

		public int getMinutos() {
			return minutos;
		}

		public void setMinutos(int minutos) {
			this.minutos = minutos;
		}

//	    @AssertTrue
//	    private Boolean terms;
	    
	

}
