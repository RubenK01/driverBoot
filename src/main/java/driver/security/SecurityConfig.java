package driver.security;

import org.springframework.beans.factory.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.authentication.builders.*;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.web.authentication.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
//	@Override
//    protected void configure(HttpSecurity http) throws Exception {
//     
//        http.authorizeRequests().antMatchers("/**").hasRole("BASICO").and()
//        .formLogin(); // default is /login with an HTTP post
//
//        super.configure(http);
//    }
//     
//     @Autowired
//        public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//            auth
//                .inMemoryAuthentication()
//                    .withUser("cecilio").password("miclave").roles("BASICO");
//        }
	 @Override
	    protected void configure(HttpSecurity http) throws Exception {
	        http.csrf().disable().authorizeRequests()
	            .antMatchers("/").permitAll() //permitimos el acceso a /login a cualquiera
	            .anyRequest().authenticated() //cualquier otra peticion requiere autenticacion
	            .and()
	            // Las peticiones /login pasaran previamente por este filtro
	            .addFilterBefore(new LoginFilter("/", authenticationManager()),
	                    UsernamePasswordAuthenticationFilter.class)

	            // Las demás peticiones pasarán por este filtro para validar el token
	            .addFilterBefore(new JwtFilter(),
	                    UsernamePasswordAuthenticationFilter.class);
	    }

	    @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	        // Creamos una cuenta de usuario por default
	        auth.inMemoryAuthentication()
	                .withUser("ask")
	                .password("123")
	                .roles("ADMIN");
	    }
}
