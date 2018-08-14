package driver.viaje;

import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import driver.RetornoForm;


@RestController
public interface ViajeController {
	@RequestMapping(value="/getTrips",method = RequestMethod.GET)
    @ResponseBody
    public List<ViajeDto> getTrips(final HttpServletRequest request, HttpServletResponse response);
	
	@RequestMapping(value="/saveTrip",method = RequestMethod.POST)
    @ResponseBody
    public RetornoForm saveTrip(@RequestParam(value = "viajeJson") String viajeJson, final HttpServletRequest request, HttpServletResponse response) ;
	
	@RequestMapping(value="/joinTrip",method = RequestMethod.POST)
    @ResponseBody
    public RetornoForm joinTrip(@RequestParam(value = "viajeId") String viajeIdJson, final HttpServletRequest request, HttpServletResponse response) ;
}
