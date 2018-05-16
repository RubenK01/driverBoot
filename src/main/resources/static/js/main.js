
(function ($) {
    "use strict";
    
    function openCity(evt, cityName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }
	
	//incluir plantillas HTML
	function includeHTML() {
	  var z, i, elmnt, file, xhttp;
	  /*loop through a collection of all HTML elements:*/
	  z = document.getElementsByTagName("*");
	  for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
		  /*make an HTTP request using the attribute value as the file name:*/
		  xhttp = new XMLHttpRequest();
		  xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
			  if (this.status == 200) {elmnt.innerHTML = this.responseText;}
			  if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
			  /*remove the attribute, and call this function once more:*/
			  elmnt.removeAttribute("w3-include-html");
			  includeHTML();
			}
		  } 
		  xhttp.open("GET", file, true);
		  xhttp.send();
		  /*exit the function:*/
		  return;
		}
	  }
	}
	includeHTML();
	
	//DATE
	function dateToString(date){
        var fecha = '';
        var dd = date.getDate();
        var mm = date.getMonth() + 1; // Enero = 0
        var yyyy = date.getFullYear();
        if(dd < 10) {
            dd = '0' + dd;
        }
        if(mm < 10) {
            mm = '0' + mm;
        }
        fecha = dd + '/' + mm + '/' + yyyy;

        return fecha;
    }
	function stringToDate(fecha) {
        if(campoVacio(fecha)){
            return "";
        }
        var array = fecha.split('/');
        return new Date(parseInt(array[2],10), parseInt(array[1],10) - 1, parseInt(array[0],10));
    }

	//////Comprobación NIF/////
	/*
	 * Funcion para  validar si es NIF
	 */
	function esNIF(a) {
		var campo = a;
		var c = campo.length;
		// d = '00000000',

		for (var i = 0; i < 9 - c; i++) {
			campo = '0' + campo;
		}
		var e = /^[KLM0-9]\d{7}[A-Z]$/i;
		var b = e.test(campo);
		return b;
	}
	/*
	 * Funcion para  validar si es un NIF correcto
	 */
	function vNIF(d) {
		var c = 'TRWAGMYFPDXBNJZSQVHLCKET',
			num;
		if (!esNIF(d)) {
			return false;
		}
		var a = d;
		var b = a.length;
		for (var i = 0; i < 9 - b; i++) {
			a = '0' + a;
		}
		if (a.charAt(0) > '9' || a.charAt(0) < '0') {
			num = parseInt(a.substring(1, 8), 10) % 23;
		} else {
			num = parseInt(a.substring(0, 8), 10) % 23;
		}
		if (c.charAt(num) === a.charAt(8).toUpperCase()) {
			return true;
		} else {
			return false;
		}
	}
	function vNIFCIF(a) {
		if(isEmpty(a)){
			return false;
		}
		var A = a.toUpperCase();
		
		
		if (esNIF(A)) {
			if (vNIF(A)) {
				return true;
			}
		} 
		return false;
	}
	
	/*==============================================================*/
//	
//	function rellenaFecha(inputName){
//		var textInput = document.getElementById(inputName).value;
//		
//		if(textInput.length === 1 && textInput !== '1'){
//			document.getElementById(inputName).value = textInput + '/';
//		}
//		
//	}

  
    /*==================================================================
    [ Validate ]*/
	
	var fExpLicense = document.getElementById('fExpLicense');
	
	fExpLicense.oninvalid = function(event) {
	    event.target.setCustomValidity("Date format (dd/MM/yyyy). e.g. '14/5/2025'");
	};
	
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
    	if($(input).attr('name') == 'confirmEmail' ){
        	var email = document.getElementById('email');
        	if($(input).val() !== email.value){
        		return false;
        	}
        	
        }
        else if($(input).attr('name') == 'confirmPassword' ){
        	var password = document.getElementById('password');
        	if($(input).val() !== password.value){
        		return false;
        	}
        	
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);