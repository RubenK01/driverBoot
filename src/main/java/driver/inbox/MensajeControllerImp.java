package driver.inbox;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import driver.commons.Constants;
import driver.commons.RetornoForm;

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

	@Override
	public void mensajeLeido(@RequestParam(value = "emailJson") String email, HttpServletRequest request, HttpServletResponse response) {
		
		String emailStr = "";
		
		try {
			emailStr = Constants.JSON_MAPPER.readValue(email, String.class);
			mensajeSrv.marcaLeido(emailStr);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		

	}

}
