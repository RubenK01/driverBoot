package driver.user;

import java.io.*;
import java.sql.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.validation.*;

import org.hibernate.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.*;
import org.yaml.snakeyaml.scanner.*;

import driver.RetornoForm;
import driver.commons.*;
import driver.models.*;

@RestController
public class UserRegistrationController {
	@Autowired
    private UserService userService;

    @ModelAttribute("/usuario")
    public UserRegistrationDto userRegistrationDto() {
        return new UserRegistrationDto();
    }
    
    @RequestMapping(value="/getUsuario",method = RequestMethod.GET)
    @ResponseBody
    public UserRegistrationDto getUser(final HttpServletRequest request, HttpServletResponse response) {
    	UserRegistrationDto resul = new UserRegistrationDto();
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	
    	String name = auth.getName();

    	Usuario u = userService.findByEmail(name);
    	
    	resul.setDni(u.getDni());
    	resul.setEmail(u.getEmail());
    	resul.setfBirthDate(u.getFechaNacimiento());
    	resul.setfExpiryDate(u.getFechaExpCarnet());
    	resul.setFirstName(u.getFirstName());
    	resul.setGender(String.valueOf(u.getSexo()));
    	resul.setLastName(u.getLastName());
    	resul.setPhone(u.getTelefono());
    	resul.setUserImg(u.getUserImg());
    	
    	
		return resul;
    	
    }
    
    
    //@GetMapping
    @RequestMapping(value="/registration",method = RequestMethod.GET)
    public String showRegistrationForm(Model model) {
        return "redirect:/signUp.html";
    }

    //@PostMapping
    @RequestMapping(value="/registration",method = RequestMethod.POST)
    @ResponseBody
    public RetornoForm registerUserAccount(@RequestParam(value = "form") String userJSON
    		, @RequestPart(value = "file") byte[]  file , @RequestParam(value = "formCars") String listCarJSON , final HttpServletRequest request, HttpServletResponse response){
    	RetornoForm salida = new RetornoForm();

    	UserRegistrationDto userDto;
    	//ObjectMapper J_MAPPER = new ObjectMapper();
		try {
			userDto = Constants.JSON_MAPPER.readValue(userJSON, UserRegistrationDto.class);
			//Blob blob = Hibernate.createBlob(file.getInputStream());
			
			
			Usuario existing = userService.findByEmail(userDto.getEmail());
	        if (existing != null){
	        	salida.setTexto("There is already an account registered with that email");
	        	salida.setDescripcion("Incorreco");
	        	salida.setCodigo("01");
	        	return salida;
	            //result.rejectValue("email", null, "There is already an account registered with that email");
	        }

//	        if (result.hasErrors()){
//	            return "redirect:/signUp.html?error";
//	        }
	        
	        if(file.length == 1 && file[0] == 48) {
	        	userDto.setUserImg(null);
	        }
	        else
	        	userDto.setUserImg(file);  
	        
	        
	        //seteo de coches
	        List<CocheDto> listCars = Arrays.asList(Constants.JSON_MAPPER.readValue(listCarJSON, CocheDto[].class));
	        for(int i = 0; i < listCars.size(); i++) {
	        		try {
						Part p =  request.getPart("imgCars" + i);
						long pi = p.getSize();
						
						 if ( pi < Integer.MIN_VALUE || pi > Integer.MAX_VALUE ) 
					        {
					            throw new IllegalArgumentException( pi + " cannot be cast to int without changing its value." );
					        }
						byte[] img = new byte[(int) pi];
						p.getInputStream().read(img);
						
						if(img.length == 1 && img[0] == 48) {
							listCars.get(i).setFoto(null);
				        }
				        else
				        	listCars.get(i).setFoto(img); 
						
					} catch (ServletException e) {
						e.printStackTrace();
					}

//	        	try {
//	        		//listCars.get(i).setFoto( request.getPart("imgCars" + i) );
//				} catch (ServletException e) {
//					e.printStackTrace();
//				}
	        }
	        	        
	        userDto.setCoches(listCars);
	        
	        userService.save(userDto);
			
		} catch (IOException e1) {

			e1.printStackTrace();
		}
		catch (Exception e) {
			salida.setCodigo("02");
			salida.setTexto("There is already an account registered with that DNI");

			return salida;
		}
    	
    	
        
        
        //hacer POST a login
//        try {
//        	
//			response.sendRedirect("/");
//			//response.add
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
        //return "redirect:/#/menu";
        return salida;
    }
}
