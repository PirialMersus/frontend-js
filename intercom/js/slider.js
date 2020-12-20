$.fn.slider = function (options) {
  //vars

  let params = $.extend(
    {
      animationSpeed: 300,
    },
    options
  );

  let $selector = this;
  let $slidesRow = $(".sliderContainer .slidesRow");
  let $arrowLeft = $(".sliderContainer .arrows.left");
  let $arrowRight = $(".sliderContainer .arrows.right");
  let activeSlideCounter = 0;
  let offset = 0;
  let windowWidth = $(".sliderContainer").width();
  // console.log("window sizes", windowWidth);
  let slides = $(".sliderContainer .slidesRow .slide").length;
  let endCount = slides - 1;
  let slideCount = slides;
  let tempCounter = 1;
  let x1 = 0;
  let x2 = 0;
  let action = false;
  let distance = 0;
  let content = "";

  // Controllers

  function slidesCopyingAtTheBeginning(
    zeroActiveSlideCounter,
    zeroSlideCount,
    zeroTempCounter
  ) {
    activeSlideCounter = zeroActiveSlideCounter;
    slideCount = zeroSlideCount;
    tempCounter = zeroTempCounter;
    slidesController(slideCount);
    $slidesRow.css("transition-duration", "0s");
    let sliderItem = $(".slide");
    for (let i = 0; i < slides; i++) {
      sliderItem
        .eq(sliderItem.length - (i + 1))
        .clone()
        .prependTo($(".slidesRow"));
    }
    $slidesRow.css(
      "width",
      windowWidth * $(".sliderContainer .slidesRow .slide").length + 100 + "px"
    );
    setTimeout(function () {
      $slidesRow.css("transition-duration", params.animationSpeed + "ms");
    }, 50);
  }
  function slidesCopyingAtTheEnd() {
    let sliderItem = $(".slide");
    for (let i = 0; i < slides; i++) {
      sliderItem.eq(i).clone().appendTo($(".slidesRow"));
    }
    $slidesRow.css(
      "width",
      windowWidth * $(".sliderContainer .slidesRow .slide").length + 100 + "px"
    );
    endCount = endCount + slides;
  }
  function slidesController(slideCount) {
    let distance = slideCount * windowWidth * -1;
    $slidesRow.css("transform", "translateX(" + distance + "px)");
  }
  function navigationController(slideCount) {
    $(".switches").removeClass("active");
    $('.switches[data_nav="' + ((slideCount % slides) + 1) + '"]').addClass(
      "active"
    );
  }
  function slidesRowController(distance) {
    $slidesRow.css(
      "transform",
      "translateX(" + (slideCount * windowWidth * -1 + distance) + "px)"
    );
  }

  // Init

  $slidesRow.css("transition-duration", params.animationSpeed + "ms");
  $(".slide").css("width", windowWidth + "px");

  //
  window.addEventListener(
    "resize",
    function () {
      // console.log(slideCount, windowWidth, (slideCount * windowWidth * (-1) + distance));
      windowWidth = $(".sliderContainer").width();
      // $slidesRow.css('width', (slides * windowWidth + 100 + offset) + 'px');

      $(".slide").css("width", windowWidth + "px");
      $slidesRow.css(
        "width",
        windowWidth * $(".sliderContainer .slidesRow .slide").length +
          100 +
          "px"
      );

      slidesController(slideCount);
      console.log(slideCount, windowWidth);
    },
    false
  );

  //Actions

  slidesCopyingAtTheBeginning(2, slides, 1);
  slidesCopyingAtTheEnd();

  $arrowLeft.click(function () {
    slideCount--;
    tempCounter--;
    if (tempCounter < 1) {
      activeSlideCounter = activeSlideCounter - 1;
      tempCounter = slides;
    }
    if (slideCount < slides) {
      $slidesRow.css("transition-duration", "0ms");
      slidesController(slides * 2);
      setTimeout(function () {
        $slidesRow.css("transition-duration", params.animationSpeed + "ms");
        activeSlideCounter = 2;
        slideCount = slides * 2 - 1;
        tempCounter = slides;
        slidesController(slideCount);
        navigationController(slideCount);
      }, 30);
    }
    if (slideCount >= slides) {
      slidesController(slideCount);
      navigationController(slideCount);
    }
    setTimeout(function () {}, params.animationSpeed);
  });

  $arrowRight.click(function () {
    slideCount++;
    tempCounter++;
    if (tempCounter > slides) {
      activeSlideCounter = activeSlideCounter + 1;
      tempCounter = 1;
    }
    if (endCount < slideCount) {
      slidesCopyingAtTheEnd();
    }
    slidesController(slideCount);
    navigationController(slideCount);
  });

  $(".sliderContainer .navSlider .switches").click(function () {
    let counter = parseFloat($(this).attr("data_nav"));
    slidesController(activeSlideCounter * slides - (slides + 1) + counter);
    navigationController(activeSlideCounter * slides - (slides + 1) + counter);
    slideCount = activeSlideCounter * slides - (slides + 1) + counter;
    tempCounter = counter;
  });

  $(".sliderContainer").mousedown(function (e) {
    $slidesRow.addClass("disableAnimation");
    $slidesRow.css("transition-duration", "0s");
    x1 = e.pageX;
    action = true;
  });

  $(window).mouseup(function (e) {
    action = false;
    $slidesRow.removeClass("disableAnimation");
    $slidesRow.css("transition-duration", params.animationSpeed + "ms");
    if (distance >= 100) {
      slideCount--;
      tempCounter--;
      if (tempCounter < 1) {
        activeSlideCounter = activeSlideCounter - 1;
        tempCounter = slides;
      }
      if (slideCount < slides) {
        setTimeout(function () {
          slidesCopyingAtTheBeginning(2, 2 * slides - 1, slides);
        }, params.animationSpeed);
      }
      slidesController(slideCount);
      navigationController(slideCount);
    } else if (distance <= -100) {
      slideCount++;
      tempCounter++;
      if (tempCounter > slides) {
        activeSlideCounter = activeSlideCounter + 1;
        tempCounter = 1;
      }
      if (endCount < slideCount) {
        slidesCopyingAtTheEnd();
      }
      slidesController(slideCount);
      navigationController(slideCount);
    } else {
      slidesController(slideCount);
      navigationController(slideCount);
    }
    distance = 0;
  });

  $(window).mousemove(function (e) {
    if (action) {
      x2 = e.pageX;
      distance = x2 - x1;
      slidesRowController(distance);
    }
  });

  document
    .querySelector(".sliderContainer")
    .addEventListener("touchstart", function (e) {
      x1 = e.touches[0].pageX;
      $slidesRow.addClass("disableAnimation");
      action = true;
    });

  window.addEventListener("touchend", function (e) {
    action = false;
    $slidesRow.removeClass("disableAnimation");
    if (distance >= 100) {
      slideCount--;
      tempCounter--;
      if (tempCounter < 1) {
        activeSlideCounter = activeSlideCounter - 1;
        tempCounter = slides;
      }
      if (slideCount < slides) {
        setTimeout(function () {
          slidesCopyingAtTheBeginning(2, 2 * slides - 1, slides);
        }, params.animationSpeed);
      }
      slidesController(slideCount);
      navigationController(slideCount);
    } else if (distance <= -100) {
      slideCount++;
      tempCounter++;
      if (tempCounter > slides) {
        activeSlideCounter = activeSlideCounter + 1;
        tempCounter = 1;
      }
      if (endCount < slideCount) {
        slidesCopyingAtTheEnd();
      }
      slidesController(slideCount);
      navigationController(slideCount);
    } else {
      slidesController(slideCount);
      navigationController(slideCount);
    }
    distance = 0;
  });

  window.addEventListener("touchmove", function (e) {
    if (action) {
      x2 = e.changedTouches[0].pageX;
      distance = x2 - x1;
      slidesRowController(distance);
    }
  });
};
