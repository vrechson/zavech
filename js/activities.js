$(function() {
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
					}
				}
			  });
	});

});
