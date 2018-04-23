package driver;

import java.util.ArrayList;
import java.util.List;

public class SalidaBusquedaClientesForm {
	
	RetornoForm retorno;
	List<ClienteForm> listado;
	
	public SalidaBusquedaClientesForm(){
		listado = new ArrayList<ClienteForm>();
		retorno = new RetornoForm();
	}

	public RetornoForm getRetorno() {
		return retorno;
	}

	public void setRetorno(RetornoForm retorno) {
		this.retorno = retorno;
	}

	public List<ClienteForm> getListado() {
		return listado;
	}

	public void setListado(List<ClienteForm> listado) {
		this.listado = listado;
	}


	
	
	
	

}
