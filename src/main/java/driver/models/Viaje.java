package driver.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity(name = "Viaje")
@Table(name = "Viaje")
public class Viaje {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	@NotNull
	String cEstado;
	@NotNull
	int plazasDisponibles;
	@NotNull
	int minutos;
	@NotNull
	Date fecha;
//	@NotNull
//	Usuario creador;
	@NotNull
	@OneToMany(mappedBy="viaje")
	List<ParticipanteViaje> participantes;
	
}
