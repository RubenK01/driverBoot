package driver;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class Ventana extends JFrame {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6027049200988900483L;

	
	JPanel panel;
	
	public Ventana(){
		this.setTitle("Prueba");
		this.setSize(310, 210);  
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		

	}
	
	public void mostrarVentana(){
		this.setVisible(true);
	}
	
	
	

}
