$(function(){
	$(document).keypress(function(e) {
		if(e.which == 66) {
			console.log('oi bruna, sumida');
			$.ajax({
				url: "http://" + $.cookie("arduino")+ "/?bruna",
				context: document.body
				success: {
				}
			});
		} else if (e.which == 86) {
			console.log('vrech pwns');
			$.ajax({
				url: "http://" + $.cookie("arduino")+ "/?vrechson",
				context: document.body
				success: {
				}
			});
		}
	});

	$("#page-wrapper > main > div > div.container-fluid > div > div > div:nth-child(1) > div.portlet-body > a.btn.btn-success.mr-1.mb-2").click(function() {
		if (!$.cookie("arduino"))
			return;

		$.ajax({
			url: "http://" + $.cookie("arduino")+ "/?lighton",
			context: document.body
			success: {
				console.log("led ligado");
			}
		});
	});

	$("#page-wrapper > main > div > div.container-fluid > div > div > div:nth-child(1) > div.portlet-body > a.btn.btn-danger.mr-1.mb-2").click(function() {
		if (!$.cookie("arduino"))
			return;

		$.ajax({
			url: "http://" + $.cookie("arduino")+ "/?lightoff",
			context: document.body
			success: {
				console.log("led desligado");
			}
		});
	});


});
