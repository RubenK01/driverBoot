package driver.inbox;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import driver.models.Mensaje;
import driver.models.Usuario;
import driver.user.UserService;
@Service
public class MensajeServiceImp implements MensajeService{
	@Autowired
	private MensajeRepository mensajeRepository;
	@Autowired
    private UserService userService;
	
	@Override
	public Mensaje save(MensajeDto mensajeDto) {
		Mensaje mensaje = new Mensaje();
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	
    	String name = auth.getName();

    	Usuario me = userService.findByEmail(name);
		
		Usuario emisor = me;
		Usuario receptor = userService.findByEmail(mensajeDto.getReceptor().getEmail());
		
		mensaje.setEmisor(emisor);
		mensaje.setReceptor(receptor);
		mensaje.setFecha(new Date());
		mensaje.setLeido(false);
		mensaje.setTexto(mensajeDto.getTexto());
		
		return mensajeRepository.save(mensaje);
	}

	@Override
	public void marcaLeido(String email) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	
    	String name = auth.getName();

    	Usuario me = userService.findByEmail(name);
    	
    	for(Mensaje m : me.getMensajesRecibidos()) {
    		if(m.getEmisor().getEmail().equalsIgnoreCase(email) && !m.getLeido()) {
    			m.setLeido(true);
    			
    			mensajeRepository.save(m);
    		}
    	}
		
	}

}
