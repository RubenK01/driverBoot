
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

  
    /*==================================================================
    [ Validate ]*/
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
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
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