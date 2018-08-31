package driver.trip;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.*;

import driver.models.*;

@Repository
public interface ViajeRepository extends JpaRepository<Viaje, Long>{
	@Query("select v from Viaje v where v.fechaHora > NOW()")
	public List<Viaje> findViajes();
	
	@Query("select v from Viaje v where date(v.fechaHora) = :date")
	public List<Viaje> findViajesByDate(@Param("date") Date date);
}
