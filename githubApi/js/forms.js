const form = document.getElementById("formId"),
  input = document.getElementById("inputData"),
  div = document.getElementsByClassName("user"),
  user = {};
// console.log(div[0]);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  div[0].innerHTML = "";
  div[0].classList.add("active");
  // findUserData(input.value);
  renderUser(input.value);
  input.value = "";
});

const renderUser = (nickName) => {
  fetch(`https://api.github.com/users/${nickName}`)
    .then((response) => response.json())
    .then((result) => {
      div[0].innerHTML = `
        <a href="${result.html_url}" class="nickNameLink">Ссылка на страничку акаунта</a>
        <img src="${result.avatar_url}"alt="ava" width="110px"/>
        <a href="https://github.com/${nickName}?tab=repositories"
           class="taskLink">Репозитории пользователя (${result.public_repos})</a>
        <h4> Последняя активность: ${result.updated_at}</h4>
      `;
    })
    .catch((err) => {
      div[0].innerHTML = `${err}`;
    });
  // .fail(function () {
  //   $(".user").html("Искомый пользователь не найден");
  // });
};

function findUserData(nickName) {
  user = fetch(`https://api.github.com/users/${nickName}`).then((response) =>
    response.json()
  );
  return user;
}
