myApp.factory('utils',function(){
		function horaToStr(fechaHora){
			fechaHora = new Date(fechaHora);
          var horaStr = '';
            if(fechaHora.getHours().toString().length === 1){
              horaStr = '0' + fechaHora.getHours().toString();
            }
            else{
              horaStr = fechaHora.getHours().toString();
            }
            if(fechaHora.getMinutes().toString().length === 1){
              horaStr += ':0' + fechaHora.getMinutes().toString();
            }
            else{
              horaStr += ':' +  fechaHora.getMinutes().toString();
            }

            return horaStr;
        }
        function fechaToStr(fechaHora){
        	fechaHora = new Date(fechaHora);
        	return fechaHora.getDate() + '-' + (fechaHora.getMonth()+1) + '-' + fechaHora.getFullYear();
        }

        function calcularEdad(fecha) {
		    var hoy = new Date();
		    var cumpleanos = new Date(fecha);
		    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
		    var m = hoy.getMonth() - cumpleanos.getMonth();

		    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
		        edad--;
		    }

		    return edad;
		}

return {
		horaToStr:horaToStr,
		calcularEdad:calcularEdad,
		fechaToStr:fechaToStr

	}
});