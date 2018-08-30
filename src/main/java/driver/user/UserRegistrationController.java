package driver.user;

import java.io.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.*;
import org.springframework.web.bind.annotation.*;

import driver.commons.*;
import driver.inbox.MensajeDto;
import driver.models.*;
import driver.trip.MapaDto;
import driver.trip.ViajeDto;

@RestController
public class UserRegistrationController {
	@Autowired
    private UserService userService;

    @ModelAttribute("/usuario")
    public UserDto userRegistrationDto() {
        return new UserDto();
    }
    
    @RequestMapping(value="/getUsuario",method = RequestMethod.GET)
    @ResponseBody
    public UserDto getUser(final HttpServletRequest request, HttpServletResponse response) {
    	UserDto resul = new UserDto();
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
    	int minutos = Utils.getMinutos(u);
    	resul.setMinutos(minutos);
    	
    	//coches
    	List<CocheDto> misCoches = new ArrayList<CocheDto>();
    	for(Coche c : u.getCoches()) {
    		CocheDto cocheDto = new CocheDto();
    		cocheDto.setColor(c.getColor());
    		cocheDto.setFoto(c.getFoto());
    		cocheDto.setMatricula(c.getMatricula());
    		cocheDto.setModelo(c.getModelo());
    		
    		misCoches.add(cocheDto);
    	}
    	resul.setCoches(misCoches);
    	
    	//viajes
    	List<ViajeDto> misViajes = new ArrayList<ViajeDto>();
    	for(Viaje v : u.getViajes()) {
    		ViajeDto viaje = new ViajeDto();
    		
    		viaje.setFechaHora(v.getFechaHora());
    		viaje.setMinutos(v.getMinutos());
    		viaje.setId(v.getId());
    		viaje.setPlazas(v.getPlazas());
    		
    		CocheDto coche = new CocheDto();
    		coche.setColor(v.getCoche().getColor());
    		coche.setFoto(v.getCoche().getFoto());
    		coche.setModelo(v.getCoche().getModelo());
    		viaje.setCoche(coche);
    		
    		UserDto conductor = new UserDto();
    		conductor.setFirstName(v.getConductor().getFirstName());
    		conductor.setLastName(v.getConductor().getLastName());
    		conductor.setUserImg(v.getConductor().getUserImg());
    		conductor.setEmail(v.getConductor().getEmail());
    		conductor.setPhone(v.getConductor().getTelefono());
    		conductor.setfBirthDate(v.getConductor().getFechaNacimiento());
    		viaje.setConductor(conductor);
    		
    		MapaDto mapa = new MapaDto();
    		mapa.setDescDestino(v.getMapa().getDescDestino());
    		mapa.setDescOrigen(v.getMapa().getDescOrigen());
    		viaje.setMapa(mapa);
    		
    		List<UserDto> listPasajeros = new ArrayList<UserDto>();
    		for(Usuario pasajero : v.getPasajeros()) {
    			UserDto p = new UserDto();
    			p.setFirstName(pasajero.getFirstName());
        		p.setLastName(pasajero.getLastName());
        		p.setUserImg(pasajero.getUserImg());
        		p.setEmail(pasajero.getEmail());
        		p.setfBirthDate(pasajero.getFechaNacimiento());
        		
        		listPasajeros.add(p);
    		}
    		viaje.setPasajeros(listPasajeros);
    		
    		misViajes.add(viaje);
    	}
    	resul.setViajes(misViajes);
    	
    	//viajes Creados
    	
    	List<ViajeDto> misViajesCreados = new ArrayList<ViajeDto>();
    	for(Viaje v : u.getViajesConducidos()) {
    		ViajeDto viaje = new ViajeDto();
    		
    		viaje.setFechaHora(v.getFechaHora());
    		viaje.setMinutos(v.getMinutos());
    		viaje.setId(v.getId());
    		viaje.setPlazas(v.getPlazas());
    		UserDto conductor = new UserDto();
    		conductor.setFirstName(v.getConductor().getFirstName());
    		conductor.setLastName(v.getConductor().getLastName());
    		conductor.setUserImg(v.getConductor().getUserImg());
    		conductor.setEmail(v.getConductor().getEmail());
    		conductor.setPhone(v.getConductor().getTelefono());
    		conductor.setfBirthDate(v.getConductor().getFechaNacimiento());
    		viaje.setConductor(conductor);
    		
    		CocheDto coche = new CocheDto();
    		coche.setColor(v.getCoche().getColor());
    		coche.setFoto(v.getCoche().getFoto());
    		coche.setModelo(v.getCoche().getModelo());
    		viaje.setCoche(coche);
    		
    		MapaDto mapa = new MapaDto();
    		mapa.setDescDestino(v.getMapa().getDescDestino());
    		mapa.setDescOrigen(v.getMapa().getDescOrigen());
    		viaje.setMapa(mapa);
    		
    		List<UserDto> listPasajeros = new ArrayList<UserDto>();
    		for(Usuario pasajero : v.getPasajeros()) {
    			UserDto p = new UserDto();
        		p.setFirstName(pasajero.getFirstName());
        		p.setLastName(pasajero.getLastName());
        		p.setUserImg(pasajero.getUserImg());
        		p.setEmail(pasajero.getEmail());
        		p.setfBirthDate(pasajero.getFechaNacimiento());
        		
        		listPasajeros.add(p);
    		}
    		viaje.setPasajeros(listPasajeros);
    		
    		misViajesCreados.add(viaje);
    	}
    	resul.setViajesCreados(misViajesCreados);
    	
    	//mensajes Enviados
    	List<MensajeDto> misMensajesEnviados = new ArrayList<MensajeDto>();
    	
    	for(Mensaje m : u.getMensajesEnviados()) {
    		UserDto receptor = new UserDto(m.getReceptor().getFirstName(),m.getReceptor().getLastName(), m.getReceptor().getEmail(), m.getReceptor().getUserImg());
    		MensajeDto mensajeDto = new MensajeDto();    		
    		UserDto emisor = new UserDto(m.getEmisor().getFirstName(),m.getEmisor().getLastName(), m.getEmisor().getEmail(), m.getEmisor().getUserImg());
    		
    		mensajeDto.setEmisor(emisor);
    		mensajeDto.setFechaHora(m.getFecha());
    		mensajeDto.setLeido(m.getLeido());
    		mensajeDto.setReceptor(receptor);
    		mensajeDto.setTexto(m.getTexto());  
    		mensajeDto.setId(m.getId());
    		
    		misMensajesEnviados.add(mensajeDto);
//    		if(!misMensajesEnviados.containsKey(receptor.getEmail())) {  
//    			List<MensajeDto> listaMensajes = new ArrayList<MensajeDto>();
//    			listaMensajes.add(mensajeDto);
//    			misMensajesEnviados.put(receptor.getEmail(), listaMensajes);
//    		}
//    		else {
//    			misMensajesEnviados.get(receptor.getEmail()).add(mensajeDto);
//    		}
    	}
    	resul.setMensajesEnviados(misMensajesEnviados);
    	
    	//mensajes Recibidos
    	List<MensajeDto> misMensajesRecibidos = new ArrayList<MensajeDto>();
    	
    	for(Mensaje m : u.getMensajesRecibidos()) {
    		UserDto receptor = new UserDto(m.getReceptor().getFirstName(),m.getReceptor().getLastName(), m.getReceptor().getEmail(), m.getReceptor().getUserImg());
    		MensajeDto mensajeDto = new MensajeDto();    		
    		UserDto emisor = new UserDto(m.getEmisor().getFirstName(),m.getEmisor().getLastName(), m.getEmisor().getEmail(), m.getEmisor().getUserImg());
    		
    		mensajeDto.setEmisor(emisor);
    		mensajeDto.setFechaHora(m.getFecha());
    		mensajeDto.setLeido(m.getLeido());
    		mensajeDto.setReceptor(receptor);
    		mensajeDto.setTexto(m.getTexto());   
    		mensajeDto.setId(m.getId());
    		
    		misMensajesRecibidos.add(mensajeDto);
    		
//    		if(!misMensajesRecibidos.containsKey(emisor.getEmail())) {  
//    			List<MensajeDto> listaMensajes = new ArrayList<MensajeDto>();
//    			listaMensajes.add(mensajeDto);
//    			misMensajesRecibidos.put(emisor.getEmail(), listaMensajes);
//    		}
//    		else {
//    			misMensajesRecibidos.get(emisor.getEmail()).add(mensajeDto);
//    		}
    	}
    	resul.setMensajesRecibidos(misMensajesRecibidos);
    	
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

    	UserDto userDto;

		try {
			userDto = Constants.JSON_MAPPER.readValue(userJSON, UserDto.class);
			
			
			Usuario existing = userService.findByEmail(userDto.getEmail());
	        if (existing != null){
	        	salida.setTexto("There is already an account registered with that email");
	        	salida.setDescripcion("Incorreco");
	        	salida.setCodigo("01");
	        	return salida;
	        }
	        
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
//    @RequestMapping(value="/saveTrip",method = RequestMethod.POST)
//    @ResponseBody
//    public RetornoForm saveTrip(ViajeDto viajeDto)  {
//		RetornoForm retorno = new RetornoForm();
//		
//		Viaje viaje = new Viaje();
//		
//		viaje.setFechaHora(viajeDto.getFechaHora());
//		viaje.setMinutos(viajeDto.getMinutos());
//		viaje.setPlazas(viajeDto.getPlazas());
//		
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//    	
//    	String name = auth.getName();
//
//    	Usuario conductor = userService.findByEmail(name);
//    	
//    	viaje.setConductor(conductor);
//    	
//		return retorno;
//	}
}
