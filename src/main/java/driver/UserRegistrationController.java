package driver;

import java.io.*;

import javax.servlet.http.*;
import javax.validation.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;


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
    public RetornoForm registerUserAccount(@RequestBody UserRegistrationDto userDto
    		, final HttpServletRequest request, HttpServletResponse response){
    	RetornoForm salida = new RetornoForm();

        Usuario existing = userService.findByEmail(userDto.getEmail());
        if (existing != null){
        	salida.setTexto("There is already an account registered with that email");
        	salida.setDescripcion("Incorreco");
        	return salida;
            //result.rejectValue("email", null, "There is already an account registered with that email");
        }

//        if (result.hasErrors()){
//            return "redirect:/signUp.html?error";
//        }

        userService.save(userDto);
        
        //hacer POST a login
        try {
        	
			response.sendRedirect("/");
			//response.add
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        //return "redirect:/#/menu";
        return salida;
    }
}
