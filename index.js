$(function(){

	if ($.cookie("arduino"))
		$("#page-wrapper > main > div > div.container-fluid > div:nth-child(1)").hide();

	$("#page-wrapper > main > div > div.container-fluid > div:nth-child(1) > div > div > div.portlet-body > form > button").click(function() {
		if ($("#inputAddress").val() == "")
		return;

		$.ajax({
			url: "http://" + $("#inputAddress").val() + "/",
			context: document.body
			success: {
				$.cookie("arduino", $("#inputAddress").val(), { expires : 1 });
				$("#page-wrapper > main > div > div.container-fluid > div:nth-child(1)").hide();
			}
		});
	});

});
