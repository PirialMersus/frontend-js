const form = document.querySelector("form"),
  input = document.querySelector("input"),
  div = document.querySelector("div");

form.addEventListener("submit", (e) => {
  let nickName = input.value;
  render(nickName);
  e.preventDefault();
});

function getDataByNickName(nickName) {
  $.getJSON("https://api.github.com/users/" + nickName)
    .done(function (data) {
      div.insertAdjacentHTML(
        "beforeend",
        "<a href=" +
          data.html_url +
          " class='nickNameLink'>Ссылка на страничку акаунта</a>"
      );

      div.insertAdjacentHTML(
        "beforeend",
        "<img src=" + data.avatar_url + "alt='ava' width='110px'/>"
      );

      div.insertAdjacentHTML(
        "beforeend",
        '<a href="https://github.com/' +
          nickName +
          '?tab=repositories" class="taskLink">Репозитории пользователя (' +
          data.public_repos +
          ")</a>"
      );

      div.insertAdjacentHTML(
        "beforeend",
        "<h4> Последняя активность: " + data.updated_at + "</h4>"
      );
    })
    .fail(function () {
      $(".user").html("Искомый пользователь не найден");
    });
}

function render(nickName) {
  div.innerHTML = "";
  getDataByNickName(nickName);
  input.value = "";
}
