package driver.viaje;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import driver.models.Mapa;
import driver.models.Usuario;
import driver.models.Viaje;
import driver.user.UserService;

@Service
public class ViajeServiceImpl implements ViajeService{
	@Autowired
    private UserService userService;

	@Autowired
	private ViajeRepository viajeRepository;
	
	@Autowired
	private MapaRepository mapaRepository;
	
	@Override
	public Viaje save(ViajeDto viajeDto) {
		Viaje viaje = new Viaje();
		
		viaje.setFechaHora(viajeDto.getFechaHora());
		viaje.setMinutos(viajeDto.getMinutos());
		viaje.setPlazas(viajeDto.getPlazas());
		viaje.setPasajeros(new ArrayList<Usuario>());
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	
    	String name = auth.getName();

    	Usuario conductor = userService.findByEmail(name);
    	
    	viaje.setConductor(conductor);
    	
    	Mapa mapa = new Mapa();
    	MapaDto mapaDto = viajeDto.getMapa();
    	
    	mapa.setDescDestino(mapaDto.getDescDestino());
    	mapa.setDescOrigen(mapaDto.getDescOrigen());
    	mapa.setLatDestino(Double.valueOf(mapaDto.getLatDestino()));
    	mapa.setLatOrigen(Double.valueOf(mapaDto.getLatOrigen()));
    	mapa.setLngDestino(Double.valueOf(mapaDto.getLngDestino()));
    	mapa.setLngOrigen(Double.valueOf(mapaDto.getLngOrigen()));
    	mapa.setViaje(viaje);
    	
    	if(viajeRepository.save(viaje) != null) {
    		mapaRepository.save(mapa);
    		
    		List<Viaje> viajes = viajeRepository.findAll();
    		viaje.setMapa(mapa);
    		
    	}
    	
    	//mapaRepository.save(mapa);
    	
    	//viaje.setMapa(mapa);
    	
		
		return null;
	}

}
