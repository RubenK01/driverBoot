package driver.viaje;

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
	@RequestMapping(value="/saveTrip",method = RequestMethod.POST)
    @ResponseBody
    public RetornoForm saveTrip(@RequestParam(value = "viajeJson") String viajeJson, final HttpServletRequest request, HttpServletResponse response) ;
}
