
function modalController(action) {
	if (action == 'close') {
		$('.modal-container').removeClass('active');
	} else {
		$('.modal-container' + action).addClass('active');
	}
}

$('[data-modal]').click(function () {
	var target = $(this).attr('data-modal');
	modalController(target);
});