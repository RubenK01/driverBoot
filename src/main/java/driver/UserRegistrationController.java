package driver;

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
    public String registerUserAccount(@ModelAttribute("usuario") @Valid UserRegistrationDto userDto, 
                                      BindingResult result){

        Usuario existing = userService.findByEmail(userDto.getEmail());
        if (existing != null){
            result.rejectValue("email", null, "There is already an account registered with that email");
        }

        if (result.hasErrors()){
            return "redirect:/signUp.html?error";
        }

        userService.save(userDto);
        return "redirect:/#/menu";
    }
}
