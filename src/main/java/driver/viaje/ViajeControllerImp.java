package driver.viaje;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import driver.RetornoForm;
import driver.models.Usuario;
import driver.models.Viaje;
import driver.user.UserDto;
import driver.user.UserRepository;
import driver.user.UserService;

public class ViajeControllerImp implements ViajeController{
	@Autowired
    private UserService userService;
	
	@Override
	public RetornoForm saveTrip(ViajeDto viajeDto, HttpServletRequest request, HttpServletResponse response) {
		RetornoForm retorno = new RetornoForm();
		
		Viaje viaje = new Viaje();
		
		viaje.setFechaHora(viajeDto.getFechaHora());
		viaje.setMinutos(viajeDto.getMinutos());
		viaje.setPlazas(viajeDto.getPlazas());
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	
    	String name = auth.getName();

    	Usuario conductor = userService.findByEmail(name);
    	
    	viaje.setConductor(conductor);
    	
		return retorno;
	}
}
