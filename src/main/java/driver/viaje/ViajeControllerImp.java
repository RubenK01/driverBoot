package driver.viaje;

import java.io.IOException;
import java.sql.Date;
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

import driver.commons.Constants;
import driver.commons.RetornoForm;

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

	@Override
	public RetornoForm joinTrip(@RequestParam(value = "viajeId") String viajeIdJson, HttpServletRequest request, HttpServletResponse response) {
		Long viajeId;
		RetornoForm rf = null;
		
		try {
			rf = new RetornoForm();
			viajeId = Constants.JSON_MAPPER.readValue(viajeIdJson, Long.class);
			
			rf = viajeService.joinTrip(viajeId);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rf;
	}

	@Override
	public List<ViajeDto> getTripsByDate(String dateJson, HttpServletRequest request, HttpServletResponse response) {
		List<ViajeDto> misViajes = new ArrayList<ViajeDto>();
		Date date;
		try {
			date =Constants.JSON_MAPPER.readValue(dateJson, Date.class);
			misViajes = (List<ViajeDto>) viajeService.getViajesByDate(date);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}   	
    	
		return misViajes;
	}

}
