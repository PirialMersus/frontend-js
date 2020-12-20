"use strict";

$(document).ready(function () {
  $(".slider__wrapper").slick({
    rows: 2,
    slidesToShow: 4,
    slidesPerRow: 1,
    dots: true,
    swipeToSlide: true,
    prevArrow: "<button class='slick-prev'><img src='img/icons/arrow-left.png' alt=''></button>",
    nextArrow: "<button class='slick-next'><img src='img/icons/arrow-right.png' alt=''></button>"
  });
});
$(".sliderContainer").slider({
  animationSpeed: 300
});
$(document).on("scroll", window, function () {
  if ($(window).scrollTop() > 10) {
    $(".siteHeader").addClass("scroll");
  } else {
    $(".siteHeader").removeClass("scroll");
  }
});
$(document).ready(function () {
  $(".sliderFullComplexOfServices").slick({
    dots: true,
    swipeToSlide: true,
    infinite: false,
    prevArrow: "<button class='slick-prev'><img src='img/icons/arrow-left.png' alt=''></button>",
    nextArrow: "<button class='slick-next'><img src='img/icons/arrow-right.png' alt=''></button>"
  });
});