package driver.viaje;

import java.util.Collection;

import driver.models.Viaje;

public interface ViajeService {
	Viaje save(ViajeDto viaje);
	Collection<ViajeDto> getViajes();
}
