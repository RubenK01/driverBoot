package driver.inbox;

import driver.models.Mensaje;

public interface MensajeService {
	Mensaje save(MensajeDto mensaje);
	void marcaLeido(String email);
}
