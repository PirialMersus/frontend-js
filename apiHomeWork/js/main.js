
var city;


$('.btn').click(function () {
    var zip = $('.data').val();
    getCityByZip(zip);
});

function getCityByZip(zip) {
    $.getJSON('http://api.zippopotam.us/us/' + zip)
        .done(function (data) {
            city = data.places[0]['place name'];
            $('.city').html('искомый город - ' + city);
        });
}


