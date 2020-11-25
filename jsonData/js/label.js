var inputs = document.querySelectorAll(".inputfile");
Array.prototype.forEach.call(inputs, function (input) {
  var label = input.nextElementSibling,
    labelVal = label.innerHTML;

  input.addEventListener("change", function (e) {
    var fileName = "";
    if (this.files && this.files.length > 1)
      fileName = (this.getAttribute("data-multiple-caption") || "").replace(
        "{count}",
        this.files.length
      );
    else fileName = e.target.value.split("\\").pop();

    if (fileName) {
      label.querySelector("span").innerHTML = fileName;
    } else {
      label.innerHTML = labelVal;
    }
  });
});

// const buttons = document.querySelectorAll(".classForEditingButtons");
// buttons.forEach((btn) => {
//   btn.addEventListener("mouseenter", function (e) {
//     let x = e.clientX - e.target.offsetLeft;
//     let y = e.clientY - e.target.offsetTop;

//     let ripples = document.createElement("span");
//     ripples.style.left = x + "px";
//     ripples.style.top = y + "px";
//     ripples.className = "tempSpan";
//     this.appendChild(ripples);

//     setTimeout(() => {
//       ripples.remove();
//     }, 1000);
//   });
// });
