package driver.inbox;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import driver.RetornoForm;
import driver.commons.Constants;
import driver.viaje.ViajeDto;

@RestController
public class MensajeControllerImp implements MensajeController{
	
	@Autowired
	private MensajeService mensajeSrv;

	@Override
	public RetornoForm saveMensaje(@RequestParam(value = "mensajeJson") String mensajeJson, HttpServletRequest request, HttpServletResponse response) {
		RetornoForm rf = new RetornoForm();
		
		MensajeDto mensajeDto = new MensajeDto();
		try {
			mensajeDto = Constants.JSON_MAPPER.readValue(mensajeJson, MensajeDto.class);
			
			
			if(mensajeSrv.save(mensajeDto) == null) {
				rf.setCodigo("01");
				rf.setDescripcion("Error al guardar mensaje");
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		
		return rf;
	}

}
