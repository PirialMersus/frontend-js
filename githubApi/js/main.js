let div = $(".user");

$(".btn").click(function () {
  let acc = $(".data").val();
  div.html("");
  getDataByAcc(acc);
  acc.value = "";
  document.getElementById("inputData").value = "";
});

function getDataByAcc(acc) {
  $.getJSON("https://api.github.com/users/" + acc)
    .done(function (data) {
      div[0].insertAdjacentHTML(
        "beforeend",
        "<a href=" + data.html_url + ">Ссылка на страничку акаунта</a>"
      );

      div[0].insertAdjacentHTML(
        "beforeend",
        "<img src=" + data.avatar_url + "alt='ava' width='110px'/>"
      );

      div[0].insertAdjacentHTML(
        "beforeend",
        '<a href="https://github.com/' +
          acc +
          '?tab=repositories">Репозитории пользователя (' +
          data.public_repos +
          ")</a>"
      );

      div[0].insertAdjacentHTML(
        "beforeend",
        "<h4> Последняя активность: " + data.updated_at + "</h4>"
      );

      console.log(data);
    })
    .fail(function () {
      $(".user").html("Искомый пользователь не найден");
    });
}
