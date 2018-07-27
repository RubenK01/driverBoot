package driver.viaje;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import driver.models.Mapa;

@Repository
public interface MapaRepository extends JpaRepository<Mapa, Long>{
	
}
