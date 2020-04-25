var $sliderContainer = $('.slider-container');
var $slidesRow = $('.slider-container .slides-row');
var $arrowLeft = $('.slider-container .arrows.left');
var $arrowRight = $('.slider-container .arrows.right');
var $navPoint = $('.slider-container .navigation .pointers');

var windowWidth = $(window).width();
var slideCount, temp = 0;
var slides = $('.slider-container .slides-row .slide').length;
$slidesRow.css('width', (slides * windowWidth + 100) + 'px');
// var sliderItem = $('.slide');
$slidesRow.css('transform', 'translateX(' + (-windowWidth) + 'px)');

function slidesController(slideCount) {
    var distance = slideCount * windowWidth * (-1);
    $slidesRow.css('transform', 'translateX(' + distance + 'px)');
}

function navigationController(slideCount) {
    $navPoint.removeClass('active');
    $('.pointers[data-nav="' + (slideCount + 1) + '"]').addClass('active');
}

$arrowLeft.click(function () {
    slideCount--;
    if (slideCount < 0) slideCount = slides - 1;
    slidesController(slideCount);
    navigationController(slideCount);
    // setTimeout(function () {
    //     var sliderItem = $('.slide');
    //     console.log(sliderItem);
    //     sliderItem.eq(sliderItem.length - 1).prependTo($('.slides-row'));

    // }, 1000);
});
$arrowRight.click(function () {

    slideCount++;
    if (slideCount >= slides) slideCount = 0;
    slidesController(slideCount);
    navigationController(slideCount);
    // setTimeout(function () {
    //     var sliderItem = $('.slide');
    //     console.log(sliderItem);
    //     sliderItem.eq(0).appendTo($('.slides-row'));
    //     console.log(sliderItem);
    // }, 1000);

});

$navPoint.click(function () {
    var counter = parseFloat($(this).attr('data-nav'));
    slidesController(counter - 1);
    navigationController(counter - 1);
    slideCount = counter - 1;
});