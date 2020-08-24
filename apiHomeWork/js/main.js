$(".btn").click(function () {
  var zip = $(".data").val();
  getCityByZip(zip);
});

function getCityByZip(zip) {
  $.getJSON("http://api.zippopotam.us/us/" + zip)
    .done(function (data) {
      $(".city").html("искомый город - " + data.places[0]["place name"]);
      console.log(data);
    })
    .fail(function () {
      $(".city").html("Введите корректный код города");
    });
}
