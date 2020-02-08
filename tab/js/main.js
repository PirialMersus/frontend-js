$('.tab-container .tab-list .tab').click(function () {
    $('.tab-container .tab-list .tab').removeClass('active');
    $(this).addClass('active');

    var target = $(this).attr('data-tab');
    console.log(target);

    $('.tab-container .tab-content-wrapper .tab-content').removeClass('active');
    $('.tab-container .tab-content-wrapper .tab-content' + target).addClass('active');
})