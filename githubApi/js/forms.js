const form = document.getElementById("formId"),
  input = document.getElementById("inputData"),
  divUser = document.getElementsByClassName("user");
let user;
// console.log(divUser[0]);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  divUser[0].innerHTML = "";
  user = input.value;

  findUserData(user)
    .then((userData) => {
      renderUser(userData, user);
      input.value = "";
    })
    .then(() => {
      divUser[0].classList.add("active");
    })
    .catch((err) => {
      alert(err);
      divUser[0].classList.remove("active");
    });
});

const findUserData = (nickName) => {
  return fetch(`https://api.github.com/users/${nickName}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error("Введенный пользователь не найден");
      }
    })
    .then((user) => {
      userData = user;
      return userData;
    });
};

function renderUser(userData, nickName) {
  divUser[0].innerHTML = `
        <img src="${userData.avatar_url}"alt="ava" width="110px" height="110px"/>
        <a href="${userData.html_url}" class="nickNameLink">Ссылка на страничку акаунта</a>
        <a href="https://github.com/${nickName}?tab=repositories"
          class="taskLink">Репозитории пользователя (${userData.public_repos})</a>
        <h4> Последняя активность:<br/> ${userData.updated_at}</h4>
      `;
}
