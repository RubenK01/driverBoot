package driver.security;

import org.springframework.beans.factory.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.dao.*;
import org.springframework.security.config.annotation.authentication.builders.*;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.web.util.matcher.*;

import driver.user.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private UserService userService;
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
     
        http.csrf().disable().authorizeRequests()
        .antMatchers("/html/addCar.html", "/js/PrincipalCtrl.js", "/registration", "/lib/**","/vendor/**", "/css/**", "/fonts/**", "/images/**").permitAll() 
        .anyRequest().authenticated()
        .and()
	        .formLogin() // default is /login with an HTTP post
		        .loginPage("/login.html")
		        .loginProcessingUrl("/login")
		        .defaultSuccessUrl("/#/")
		        .permitAll()
        .and()
	        .logout()
	        .invalidateHttpSession(true)
	        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
	        .logoutSuccessUrl("/login.html")
        .permitAll();
        
    }
     
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
}
