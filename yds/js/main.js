$('.background_slider').slider({
    animationSpeed: 900
});

$(document).ready(function () {
    $.fn.animate_Text = function () {
        var string = this.text();
        return this.each(function () {
            var $this = $(this);
            $this.html(string.replace(/./g, '<span class="new">$&</span>'));
            $this.find('span.new').each(function (i, el) {
                setTimeout(function () { $(el).addClass('div_opacity'); }, 400 * i);
            });
        });
    };
    setTimeout(function () {
        $('#text_appear_1').show();
        $('#text_appear_1').animate_Text();
        setTimeout(function () {
            $('#text_appear_2').show();
            $('#text_appear_2').animate_Text();
        }, 1700);
        setTimeout(function () {
            $('#text_appear_3').show();
            $('#text_appear_3').animate_Text();
        }, 4200);
    }, 3000);
});

$(document).on("scroll", window, function () {
    if (section_width > 600) {
        if ($(window).scrollTop() > 10) {
            $(".site_header").addClass('scroll');
        }
        else {
            $(".site_header").removeClass('scroll');
        }
    }
});

var section_width = $('.wellcome').width();
var container_width = $('.container').width();
var section_text_procent = 0;
var section_img_procent = 0;
if (section_width > 1200) {
    section_text_procent = (section_width / 100 * 40 - (section_width - container_width) / 2) * 100 / container_width;
    $('.our_services_text_column').css('max-width', section_text_procent + '%');
    $('.wellcome_text').css('max-width', section_text_procent + '%');
    $('.wellcome_img').css('max-width', (100 - section_text_procent) + '%');
    $('.our_projects_text').css('max-width', section_text_procent + '%');
    $('.our_projects_img').css('max-width', (100 - section_text_procent) + '%');
    console.log('section_width = ', section_width);
    console.log('container_width = ', container_width);
    console.log('section_text_procent = ', section_text_procent);
}

$('.click_menu_wrp').on('click touch', function () {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('.nav_bar').removeClass('active');
    } else {
        $(this).addClass('active');
        $('.nav_bar').addClass('active');
    }
});