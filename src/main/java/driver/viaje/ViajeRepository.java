package driver.viaje;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import driver.models.*;

@Repository
public interface ViajeRepository extends JpaRepository<Viaje, Long>{
	@Query("select v from Viaje v where fechaHora > NOW()")
	public List<Viaje> findViajes();
}
