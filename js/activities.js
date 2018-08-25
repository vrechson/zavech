$(function() {

	if (Cookies.get('arduino')) {
		$.notify({
            /* title and message*/
            title: 'Connected', message: "you're connected to a device."
        }, /*settings*/{
            type: 'success', allow_dismiss: false, newest_on_top: true
        });
	} else {
		$.notify({
            /* title and message*/
            title: 'Disconnected', message: "you must connect to a device."
        }, /*settings*/{
            type: 'danger', allow_dismiss: false, newest_on_top: true
        });
	}

	$(document).keypress(function(e) {
		if(e.which == 98) {
			$.ajax({
				url: "http://" + Cookies.get('arduino') + "/?bruna",
				method: "get",
				dataType: 'jsonp',
				crossdomain: true,
				statusCode: {
					200: function() {
						console.log('oi bruna, sumida');
						$.notify({
							/* title and message*/
							title: 'LCD', message: "Bruna Zamith data was writen into the LCD."
						}, /*settings*/{
							type: 'warning', allow_dismiss: false, newest_on_top: true
						});
					}
				}
			});
		} else if (e.which == 118) {
			console.log('vrech pwns');
			$.ajax({
				url: "http://" + Cookies.get('arduino') + "/?vrechson",
				method: "get",
				dataType: 'jsonp',
				crossdomain: true,
				statusCode: {
					200: function() {
						console.log('uh lala');	
						$.notify({
							/* title and message*/
							title: 'LCD', message: "Matheus Vrech data was writen to the device."
						}, /*settings*/{
							type: 'warning', allow_dismiss: false, newest_on_top: true
						});
					}
				}
			  });
		}
	});

	$("#turnon").click(function() {

			$.ajax({
				url: "http://" + Cookies.get('arduino') + "/?lighton",
				method: "get",
				dataType: 'jsonp',
				crossdomain: true,
				statusCode: {
					200: function() {
						console.log('led ligado!');	
						$.notify({
							/* title and message*/
							title: 'Led', message: "Arduino led was turned on."
						}, /*settings*/{
							type: 'success', allow_dismiss: false, newest_on_top: true
						});
					}
				}
			  });
	});

	$("#turnoff").click(function() {

			$.ajax({
				url: "http://" + Cookies.get('arduino') + "/?lightoff",
				method: "get",
				dataType: 'jsonp',
				crossdomain: true,
				statusCode: {
					200: function() {
						console.log('led desligado');
						$.notify({
							/* title and message*/
							title: 'Led', message: "Arduino led was turned off."
						}, /*settings*/{
							type: 'danger', allow_dismiss: false, newest_on_top: true
						});
					}
				}
			  });
	});

});
