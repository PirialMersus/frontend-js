var $sliderContainer = $('.slider-container');
var $slidesRow = $('.slider-container .slides-row');
var $arrowLeft = $('.slider-container .arrows.left');
var $arrowRight = $('.slider-container .arrows.right');

var windowWidth = $(window).width();

var slideCount = 0;
var slides = $('.slider-container .slides-row .slide').length;
console.log(slides);
$slidesRow.css('width', (slides * windowWidth + 100) + '0px');

function slidesController(slideCount) {
    var distance = slideCount * windowWidth * (-1);
    $slidesRow.css('transform', 'translateX(' + distance + 'px)');
}

$arrowLeft.click(function () {
    slideCount--;
    if (slideCount < 0) slideCount = slides - 1;
    slidesController(slideCount);
});
$arrowRight.click(function () {
    slideCount++;
    if (slideCount >= slides) slideCount = 0;
    slidesController(slideCount);

});