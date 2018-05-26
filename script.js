(function() {
  'use strict';

	var api = 'https://api.openweathermap.org/data/2.5/forecast?';
	var key = '&appid=1606bb8c9e5d6e24bcac2732fd1a5b07';
	var celsius ='&units=metric';
    
	var txt = 'Loading...';
	var txtArr = txt.split('');
	var count = 0;
	var timer ='';



$(document).ready(function(){
		
		 function txtCount(){			
			var timer = setTimeout(txtCount, 350);
			$('#loading_msg').append(txtArr[count]);
			count++;
			if(count == txtArr.length + 1) {
				$('#loading_msg').empty();
				count = 0;
			}			
		   }
		
	      txtCount();


		if (navigator.geolocation) {
		   navigator.geolocation.getCurrentPosition(function(position) {
			    var location = 'lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;				
			     $.ajax({
					 	url: api+location+key+celsius,
					 	type:'GET',
					 	dataType: 'jsonp',
					 	success: function(data) {
					 		$('#weather').text(data.list[0].weather[0].description);
					 		$('#city').text(data.city.name);
					 		$('#temp').text(Math.floor(data.list[0].main.temp));				 		
					 		$('#temp_unit').text(' ℃');
					 		$('#error').empty();
					 		$('.loading_msg_area').hide();
					 		getIcon(data.list[0].weather[0].icon);
					 		
					 	  }, 
			           });
			         })
	               }	

	     $('#submit').on('click', function(){
                $('.loading_msg_area').remove();
			    var city = 'q=' + $('#inputCity').val();
			    	        
			    $.ajax({
				 	url: api+city+key+celsius,
				 	type:'GET',
				 	dataType: 'jsonp',
				 		success: function(data) {
			 			
					 		$('#weather').text(data.list[0].weather[0].description);
					 		$('#city').text(data.city.name);
					 		$('#temp').text(Math.floor(data.list[0].main.temp));
					 		$('#temp_unit').text(' ℃');
					 		$('#error').empty();
					 		getIcon(data.list[0].weather[0].icon);
					 		getBackground(data.list[0].weather[0].icon);	
					 		
					 		console.log("We are inside success");
					 		console.log(errorFun());	 	  		
					 		
					 	  }, 
					 	 error: function () {
								$('#error').html('<p>error</p>');
								
								console.log("We are inside errorFun");
							 } 	  
					    });			                 
		  	       function getBackground(icon) {
				  		if ( icon.indexOf('n') != -1){
				  			$('body').css({'background':'linear-gradient(#000066, #999966) fixed'});
				  			$('body').css( {'color' : 'white'});
				  			console.log('night');
				  		} else if (icon.indexOf('d') != -1){
				  		   $('body').css({'background':'linear-gradient(#ffff66, #66ffff) fixed'});
				  		   $('body').css( {'color' : 'black'});
				  		   console.log('daytime');
				  		}

		  	          } 		
	               });

		 function getIcon(icon){
		    switch (icon) {
			    case '01d':
			      $('#weather_icon').html('<i class="wi '+ 'wi-day-sunny' +'"></i>');
			      break;
			    case '02d':
			      $('#weather_icon').html('<i class="wi '+ 'wi-day-cloudy' +'"></i>');
			      break;
			    case '03d':
			      $('#weather_icon').html('<i class="wi '+ 'wi-cloud' +'"></i>');
			      break;
			    case '04d':
			      $('#weather_icon').html('<i class="wi '+ 'wi-cloudy' +'"></i>');
			      break;
			    case '09d':
			      $('#weather_icon').html('<i class="wi '+ 'wi-showers' +'"></i>');
			      break;
			    case '10d':
			      $('#weather_icon').html('<i class="wi '+ 'wi-rain' +'"></i>');
			      break;
			     case '11d':
			      $('#weather_icon').html('<i class="wi '+ 'wi-thunderstorm' +'"></i>');
			      break;
			    case '13d':
			      $('#weather_icon').html('<i class="wi '+ 'wi-snow' +'"></i>');
			      break;
			    case '50d':
			      $('#weather_icon').html('<i class="wi '+ 'wi-dust' +'"></i>');
			      break;
			    case '01n':
			      $('#weather_icon').html('<i class="wi '+ 'wi-night-clear' +'"></i>');
			      break;
			    case '02n':
			      $('#weather_icon').html('<i class="wi '+ 'wi-night-alt-cloudy' +'"></i>');
			      break;
			    case '03n':
			      $('#weather_icon').html('<i class="wi '+ 'wi-night-alt-cloudy' +'"></i>');
			      break;
			    case '04n':
			      $('#weather_icon').html('<i class="wi '+ 'wi-cloudy' +'"></i>');
			      break;
			    case '09n':
			      $('#weather_icon').html('<i class="wi '+ 'wi-night-alt-showers' +'"></i>');
			      break;
			    case '10n':
			      $('#weather_icon').html('<i class="wi '+ 'wi-night-alt-rain' +'"></i>');
			      break;
			     case '11n':
			      $('#weather_icon').html('<i class="wi '+ 'wi-night-alt-thunderstorm' +'"></i>');
			      break;
			    case '13n':
			      $('#weather_icon').html('<i class="wi '+ 'wi-night-alt-snow' +'"></i>');
			      break;
			    case '50n':
			      $('#weather_icon').html('<i class="wi '+ 'wi-dust' +'"></i>');
			      break;
			  }
	        }
		

})

}) ();




  