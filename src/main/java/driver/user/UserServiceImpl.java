package driver.user;

import java.util.*;
import java.util.stream.*;


import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.stereotype.*;

import driver.commons.Constants;
import driver.models.*;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario user = userRepository.findByEmail(email);
        if (user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        else if(!user.getActivo()) {
        	throw new UsernameNotFoundException("This user is inactive.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));
    }

    public Usuario findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public Usuario save(UserDto registration){
    	Usuario user = new Usuario();
        user.setFirstName(registration.getFirstName());
        user.setLastName(registration.getLastName());
        user.setEmail(registration.getEmail());
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        user.setUserImg(registration.getUserImg());
        user.setFechaExpCarnet(registration.getfExpiryDate());
        user.setDni(registration.getDni());
        user.setFechaNacimiento(registration.getfBirthDate());
        user.setRoles(Arrays.asList(new Role("ROLE_USER")));
        user.setActivo(true);
        user.setFechaAlta(new Date());
        user.setMinutos(Constants.MINUTOS_REGISTRO);
        user.setTelefono(registration.getPhone());
        user.setSexo(registration.getGender().charAt(0));
        
        List<Coche> misCoches = new ArrayList<>();
        for(CocheDto coche : registration.getCoches()) {
        	Coche miCoche = new Coche();
        	
        	miCoche.setColor(coche.getColor());
        	miCoche.setConductor(user);
        	miCoche.setFoto(coche.getFoto());
        	miCoche.setMatricula(coche.getMatricula());
        	miCoche.setModelo(coche.getModelo());
        	
        	misCoches.add(miCoche);
        	
        }
        user.setCoches(misCoches);
        
        return userRepository.save(user);
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles){
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

}
 