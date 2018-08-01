package driver.viaje;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import driver.RetornoForm;
import driver.commons.Constants;

@RestController
public class ViajeControllerImp implements ViajeController{
	
	
	@Autowired
    private ViajeService viajeService;
	
	@RequestMapping(value="/getTrips",method = RequestMethod.GET)
    @ResponseBody
    public List<ViajeDto> getTrips(final HttpServletRequest request, HttpServletResponse response) {
    	List<ViajeDto> misViajes = new ArrayList<ViajeDto>();
    	
    	misViajes = (List<ViajeDto>) viajeService.getViajes();
    	
		return misViajes;
    	
    }
	
	@Override
	public RetornoForm saveTrip(@RequestParam(value = "viajeJson") String viajeJson, final HttpServletRequest request, HttpServletResponse response) {
		RetornoForm retorno = new RetornoForm();
		
		ViajeDto viajeDto = new ViajeDto();
		
		try {
			viajeDto = Constants.JSON_MAPPER.readValue(viajeJson, ViajeDto.class);
			
			viajeService.save(viajeDto);			
			
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}


    	
		return retorno;
	}
}
