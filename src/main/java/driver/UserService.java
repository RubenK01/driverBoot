package driver;

import org.springframework.security.core.userdetails.*;

import driver.models.*;

public interface UserService extends UserDetailsService {
    Usuario findByEmail(String email);

    Usuario save(UserRegistrationDto registration);
}
