
$('.dropdown .drop-btn').click(function () {
	// if ( $(this).parent().hasClass('active') ) {
	// 	$(this).parent().removeClass('active');
	// } else {
	// 	$(this).parent().addClass('active');
	// }

	$(this).parent().toggleClass('active');
});