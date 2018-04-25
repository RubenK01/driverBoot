package driver;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PruebaCtrl {

//	@Autowired
//	private ClientePruebaDAO clienteDAO;
//	
//
//	@RequestMapping(value = "/busquedaClientes", method = RequestMethod.GET)
//	@ResponseBody
//	public SalidaBusquedaClientesForm busquedaClientes(String nombre, String telefono, String email) {
//
//		SalidaBusquedaClientesForm salida = new SalidaBusquedaClientesForm();
//		RetornoForm retorno = new RetornoForm();
//
//		try{
//			ArrayList<ClientePruebaEntity> listado;
//			listado = clienteDAO.findTodos();
//
//			for (ClientePruebaEntity c : listado) {
//				salida.getListado().add(new ClienteForm(c.getIdCliente(), c.getNombre(), c.getTelefono(), c.getEmail(),
//						c.getObservaciones()));
//			}
//		} catch (Exception e) {
//			retorno.setCodigo("01");
//			retorno.setDescripcion(e.getMessage());
//		}
//		salida.setRetorno(retorno);
//
//		return salida;
//	}
//
//	
//	

}
