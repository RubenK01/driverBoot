package driver;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import driver.models.*;

@Repository
public interface UserRepository extends JpaRepository<Usuario, Long> {
	Usuario findByEmail(String email);
}
