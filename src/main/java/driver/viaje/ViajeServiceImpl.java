package driver.viaje;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import driver.models.Mapa;
import driver.models.Usuario;
import driver.models.Viaje;
import driver.user.UserDto;
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
    	
    	Viaje resul = viajeRepository.save(viaje);
    	
    	if(resul != null) {
    		mapaRepository.save(mapa);
    		viaje.setMapa(mapa);
    		
    	}
    	
		return resul;
	}

	@Override
	public List<ViajeDto> getViajes() {
		List<Viaje> viajes =  viajeRepository.findViajes();
		
		List<ViajeDto> misViajes = new ArrayList<ViajeDto>();
		
    	for(Viaje v : viajes) {
    		ViajeDto viaje = new ViajeDto();
    		
    		viaje.setId(v.getId());
    		viaje.setFechaHora(v.getFechaHora());
    		viaje.setMinutos(v.getMinutos());
    		viaje.setPlazas(v.getPlazas());
    		
    		UserDto conductor = new UserDto();
    		conductor.setFirstName(v.getConductor().getFirstName());
    		conductor.setLastName(v.getConductor().getLastName());
    		conductor.setUserImg(v.getConductor().getUserImg());
    		viaje.setConductor(conductor);
    		
    		MapaDto mapa = new MapaDto();
    		mapa.setDescDestino(v.getMapa().getDescDestino());
    		mapa.setDescOrigen(v.getMapa().getDescOrigen());
    		mapa.setLatOrigen(String.valueOf(v.getMapa().getLatOrigen()));
    		mapa.setLatDestino(String.valueOf(v.getMapa().getLatDestino()));
    		mapa.setLngOrigen(String.valueOf(v.getMapa().getLngOrigen()));
    		mapa.setLngDestino(String.valueOf(v.getMapa().getLngDestino()));
    		viaje.setMapa(mapa);
    		
    		List<UserDto> listPasajeros = new ArrayList<UserDto>();
    		for(Usuario pasajero : v.getPasajeros()) {
    			UserDto p = new UserDto();
    			p.setFirstName(pasajero.getFirstName());
        		p.setLastName(pasajero.getLastName());
        		p.setUserImg(pasajero.getUserImg());
        		
        		listPasajeros.add(p);
    		}
    		viaje.setPasajeros(listPasajeros);
    		
    		misViajes.add(viaje);
    	}
		
		return misViajes;
	}

}
