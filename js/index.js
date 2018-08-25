$(function(){

	if (Cookies.get('arduino')) {
		$("#page-wrapper > main > div > div.container-fluid > div:nth-child(1)").hide();
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

	$("#connect").click(function() {
		if ($("#inputAddress").val() == "")
			$("#inputAddress").val($("#inputAddress").attr("placeholder")); 

		$.ajax({
			url: "http://" + $("#inputAddress").val() + "/",
			method: "get",
			dataType: 'jsonp',
			crossdomain: true,
			statusCode: {
				200: function() {
					Cookies.set('arduino', $("#inputAddress").val(), { expires: 7 });
					console.log("o servidor está funcionando!");
					$("#page-wrapper > main > div > div.container-fluid > div:nth-child(1)").hide();

				}
			}
		  });

	});
});
