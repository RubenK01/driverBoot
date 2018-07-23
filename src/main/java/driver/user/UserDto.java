package driver.user;

import java.util.*;

import javax.persistence.*;

import org.hibernate.validator.constraints.*;

import driver.models.*;

//@FieldMatch.List({
//    @FieldMatch(first = "password", second = "confirmPassword", message = "The password fields must match"),
//    @FieldMatch(first = "email", second = "confirmEmail", message = "The email fields must match")
//})
public class UserDto {
	  @NotEmpty
	    private String firstName;

	    @NotEmpty
	    private String lastName;

	    @NotEmpty
	    private String password;

	    @Email
	    @NotEmpty
	    private String email;
	    @Lob
		private byte[] userImg;
	    
	    @NotEmpty
	    private Date fExpiryDate;
	    @NotEmpty
	    private String dni;
	    
	    @NotEmpty
	    private String phone;
	    
	    @NotEmpty
	    private Date fBirthDate;
	    
	    @NotEmpty
	    private String gender;
	    
	    @NotEmpty
	    private  Collection<CocheDto> coches;

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

//	    @AssertTrue
//	    private Boolean terms;
	    
	

}
