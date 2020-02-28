var $sliderContainer = $('.slider-container');
var $slidesRow = $('.slider-container .slides-row');
var $arrowLeft = $('.slider-container .arrows.left');
var $arrowRight = $('.slider-container .arrows.right');

var windowWidth = $(window).width();

var slideCount = 0;
var slides = $('.slider-container .slides-row .slide').length;
$slidesRow.css('width', (slides * windowWidth + 100) + 'px');

function slidesController(slideCount) {
    var distance = slideCount * windowWidth * (-1);
    $slidesRow.css('transform', 'translateX(' + distance + 'px)');
}

function navigationController(slideCount) {
    $('.navigation .pointers').removeClass('active');
    $('.navigation .pointers' + '#' + (slideCount + 1)).addClass('active');
}

$arrowLeft.click(function () {
    slideCount--;
    if (slideCount < 0) slideCount = slides - 1;
    slidesController(slideCount);
    navigationController(slideCount);
});
$arrowRight.click(function () {
    slideCount++;
    if (slideCount >= slides) slideCount = 0;
    slidesController(slideCount);
    navigationController(slideCount);

});

$('.navigation .pointers .nav-item').click(function () {
    var counter = $(this).parent().attr('id');
    slidesController(counter - 1);
    navigationController(counter - 1);
    slideCount = counter - 1;
});