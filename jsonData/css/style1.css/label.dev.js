"use strict";

var inputs = document.querySelectorAll(".inputfile");
Array.prototype.forEach.call(inputs, function (input) {
  var label = input.nextElementSibling,
      labelVal = label.innerHTML;
  input.addEventListener("change", function (e) {
    var fileName = "";
    if (this.files && this.files.length > 1) fileName = (this.getAttribute("data-multiple-caption") || "").replace("{count}", this.files.length);else fileName = e.target.value.split("\\").pop();

    if (fileName) {
      label.querySelector("span").innerHTML = fileName;
    } else {
      label.innerHTML = labelVal;
    }
  });
});
var buttons = document.querySelectorAll(".classForEditingButtons");
buttons.forEach(function (btn) {
  btn.addEventListener("mouseenter", function (e) {
    var x = e.clientX - e.target.offsetLeft;
    var y = e.clientY - e.target.offsetTop;
    var ripples = document.createElement("span");
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    ripples.className = "tempSpan";
    this.appendChild(ripples);
    setTimeout(function () {
      ripples.remove();
    }, 1000);
  });
});