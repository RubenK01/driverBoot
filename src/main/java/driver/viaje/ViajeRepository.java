package driver.viaje;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import driver.models.*;

@Repository
public interface ViajeRepository extends JpaRepository<Viaje, Long>{
	
}
