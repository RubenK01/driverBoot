package driver.inbox;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import driver.commons.RetornoForm;

@RestController
public interface MensajeController {
	@RequestMapping(value="/saveMessage",method = RequestMethod.POST)
    @ResponseBody
    public RetornoForm saveMensaje(@RequestParam(value = "mensajeJson") String mensajeJson, final HttpServletRequest request, HttpServletResponse response) ;
}
