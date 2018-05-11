package driver.security;

import org.springframework.beans.factory.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.dao.*;
import org.springframework.security.config.annotation.authentication.builders.*;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.web.authentication.*;
import org.springframework.security.web.util.matcher.*;

import driver.*;
import driver.models.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private UserService userService;
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
     
        http.csrf().disable().authorizeRequests()
        .antMatchers("/signUp.html", "/registration", "/lib/**","/vendor/**", "/css/**", "/fonts/**", "/images/**").permitAll() 
        .anyRequest().authenticated()
        .and()
	        .formLogin() // default is /login with an HTTP post
		        .loginPage("/login.html")
		        .loginProcessingUrl("/login")
		        .permitAll()
        .and()
	        .logout()
	        .invalidateHttpSession(true)
	        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
	        .logoutSuccessUrl("/login.html")
        .permitAll();
        
        //super.configure(http);
    }
     
//     @Autowired
//        public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//            auth
//                .inMemoryAuthentication()
//                    .withUser("cecilio").password("miclave").roles("BASICO");
//        }
     @Bean
     public BCryptPasswordEncoder passwordEncoder(){
         return new BCryptPasswordEncoder();
     }

     @Bean
     public DaoAuthenticationProvider authenticationProvider(){
         DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
         auth.setUserDetailsService(userService);
         auth.setPasswordEncoder(passwordEncoder());
         return auth;
     }

     @Override
     protected void configure(AuthenticationManagerBuilder auth) throws Exception {
         auth.authenticationProvider(authenticationProvider());
     }
//	 @Override
//	 protected void configure(HttpSecurity http) throws Exception {
//	        http.csrf().disable().authorizeRequests()
//	            .antMatchers("/*").permitAll() //permitimos el acceso a /login a cualquiera
//	            .anyRequest().authenticated() //cualquier otra peticion requiere autenticacion
//	            .and()
//	            .formLogin()
////		             .loginPage("/login")
////		             .loginProcessingUrl("/html/login.html")
////		             .permitAll()
//		        .and()
//	            // Las peticiones /login pasaran previamente por este filtro
//	            //.addFilterBefore(new LoginFilter("/", authenticationManager()), UsernamePasswordAuthenticationFilter.class)
//
//	            // Las demás peticiones pasarán por este filtro para validar el token
//	            .addFilterBefore(new JwtFilter(), UsernamePasswordAuthenticationFilter.class);
//	    }

//	    @Override
//	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//	        // Creamos una cuenta de usuario por default
//	        auth.inMemoryAuthentication()
//	                .withUser("ask")
//	                .password("123")
//	                .roles("ADMIN");
//	    }
}
