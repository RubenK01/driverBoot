package driver;



import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ClientePruebaDAO extends CrudRepository<ClientePruebaEntity, Long> {
	
	@Query("select c from clientes c ")
	public ArrayList<ClientePruebaEntity> findTodos();
	
	
}
