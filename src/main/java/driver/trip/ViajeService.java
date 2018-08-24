package driver.trip;

import java.sql.Date;
import java.util.Collection;

import driver.commons.RetornoForm;
import driver.models.Viaje;

public interface ViajeService {
	Viaje save(ViajeDto viaje);
	Collection<ViajeDto> getViajes();
	Collection<ViajeDto> getViajesByDate(Date date);
	RetornoForm joinTrip(Long id);
}
