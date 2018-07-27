package driver.viaje;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import driver.RetornoForm;
import driver.commons.Constants;

@RestController
public class ViajeControllerImp implements ViajeController{
	
	
	@Autowired
    private ViajeService viajeService;
	
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
