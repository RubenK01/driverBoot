package driver.viaje;

import java.util.Collection;

import driver.RetornoForm;
import driver.models.Viaje;

public interface ViajeService {
	Viaje save(ViajeDto viaje);
	Collection<ViajeDto> getViajes();
	RetornoForm joinTrip(Long id);
}
