package driver;

import java.io.*;
import java.sql.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.validation.*;

import org.hibernate.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.*;
import org.yaml.snakeyaml.scanner.*;

import driver.commons.*;
import driver.models.*;

@Controller
@RequestMapping("/registration")
public class UserRegistrationController {
	@Autowired
    private UserService userService;

    @ModelAttribute("usuario")
    public UserRegistrationDto userRegistrationDto() {
        return new UserRegistrationDto();
    }

    //@GetMapping
    @RequestMapping(method = RequestMethod.GET)
    public String showRegistrationForm(Model model) {
        return "redirect:/signUp.html";
    }

    //@PostMapping
    @RequestMapping(method = RequestMethod.POST)
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
	        	return salida;
	            //result.rejectValue("email", null, "There is already an account registered with that email");
	        }

//	        if (result.hasErrors()){
//	            return "redirect:/signUp.html?error";
//	        }
	        
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
