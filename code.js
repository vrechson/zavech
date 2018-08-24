$(function(){
	$(document).keypress(function(e) {
    if(e.which == 66) {
        console.log('oi bruna, sumida');
		window.location.href = '?bruna';
    } else if (e.which == 86) {
		console.log('vrech pwns');
		window.location.href = '?vrechson';
	}
	});
});
