$(function(){

	if ($.cookie("arduino"))
		$("#page-wrapper > main > div > div.container-fluid > div:nth-child(1)").hide();

	$("#connect").click(function() {
		if ($("#inputAddress").val() == "")
			$("#inputAddress").val() = $("#inputAddress").attr("placeholder");

			console.log("oi");
		$.ajax({
			url: "http://" + $("#inputAddress").val() + "/",
			method: "get",
			success: users => {
				$.cookie("arduino", $("#inputAddress").val(), { expires : 1 });
				console.log("o servidor está funcionando!");
				$("#page-wrapper > main > div > div.container-fluid > div:nth-child(1)").hide();
			},
		  });

	});
});
