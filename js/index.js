$(function(){

	if (Cookies.get('arduino'))
		$("#page-wrapper > main > div > div.container-fluid > div:nth-child(1)").hide();

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
