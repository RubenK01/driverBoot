package driver.inbox;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import driver.models.Mensaje;

@Repository
public interface MensajeRepository  extends JpaRepository<Mensaje, Long>{
	
}
