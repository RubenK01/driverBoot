package driver;

import java.util.*;

import javax.persistence.*;

import org.hibernate.validator.constraints.*;

import driver.models.*;

//@FieldMatch.List({
//    @FieldMatch(first = "password", second = "confirmPassword", message = "The password fields must match"),
//    @FieldMatch(first = "email", second = "confirmEmail", message = "The email fields must match")
//})
public class UserRegistrationDto {
	  @NotEmpty
	    private String firstName;

	    @NotEmpty
	    private String lastName;

	    @NotEmpty
	    private String password;
//
//	    @NotEmpty
//	    private String confirmPassword;

	    @Email
	    @NotEmpty
	    private String email;
	    @Lob
		private byte[] userImg;
	    
	    @NotEmpty
	    private  Collection<CocheDto> coches;
//
//	    @Email
//	    @NotEmpty
//	    private String confirmEmail;


//	    @AssertTrue
//	    private Boolean terms;
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

//	    public String getConfirmPassword() {
//	        return confirmPassword;
//	    }
//
//	    public void setConfirmPassword(String confirmPassword) {
//	        this.confirmPassword = confirmPassword;
//	    }

	    public String getEmail() {
	        return email;
	    }

	    public void setEmail(String email) {
	        this.email = email;
	    }
//
//	    public String getConfirmEmail() {
//	        return confirmEmail;
//	    }
//
//	    public void setConfirmEmail(String confirmEmail) {
//	        this.confirmEmail = confirmEmail;
//	    }

		public byte[] getUserImg() {
			return userImg;
		}

		public void setUserImg(byte[] userImg) {
			this.userImg = userImg;
		}

		public Collection<CocheDto> getCoches() {
			return coches;
		}

		public void setCoches(Collection<CocheDto> coches) {
			this.coches = coches;
		}

}
