var $start = $('.btn.start');
var $pause = $('.btn.pause');
var $stop = $('.btn.stop');

var $box = $('.box')

var action = false;

var deg = 0;
var intervalId = 0;


$start.click(function () {
    if (!action) {
        action = true;
        intervalId = setInterval(function () {
            deg++;
            if (deg >= 360) {
                deg = 0;
            }
            $box.css('transform', 'rotateY(' + deg + 'deg)');
        }, 17);
    }


});

$pause.click(function () {
    clearInterval(intervalId);
    action = false;
});

$stop.click(function () {
    clearInterval(intervalId);
    deg = 0;
    $box.css('transform', 'rotateY(' + deg + 'deg)');
    action = false;
});