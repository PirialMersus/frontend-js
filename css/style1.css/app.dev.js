"use strict";

var _html2canvas = _interopRequireDefault(require("html2canvas"));

require("./style.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _html2canvas["default"])(document.querySelector("#capture")).then(function (canvas) {
  //   document.body.appendChild(canvas);
  var width = canvas.width;
  var height = canvas.height;
  var ctx = canvas.getContext("2d");
  var idata = ctx.getImageData(0, 0, width, height);
  var datums = [];

  for (var i = 0; i < 36; i++) {
    datums.push(ctx.createImageData(width, height)); // datums.push(idata);
  }

  for (var f = 0; f < width; f++) {
    for (var k = 0; k < height; k++) {
      for (var l = 0; l < 2; l++) {
        var n = 4 * (k * width + f);
        var m = Math.floor(36 * (Math.random() + 2 * f / width) / 3);

        for (var p = 0; p < 4; p++) {
          // console.log(idata.data[n]);
          datums[m].data[n + p] = idata.data[n + p];
        }
      }
    }
  }

  datums.forEach(function (imagedata, i) {
    var cloned = canvas.cloneNode();
    cloned.style.transition = "all 1.5s ease-out " + 1.5 * i / 36 + "s";
    cloned.getContext("2d").putImageData(imagedata, 0, 0);
    document.body.appendChild(cloned);
    setTimeout(function () {
      var angle = (Math.random() - 0.5) * 2 * Math.PI;
      var rotateAngle = 15 * (Math.random() - 0.5);
      cloned.style.transform = "rotate(" + rotateAngle + "deg) translate(" + 60 * Math.cos(angle) + "px," + 60 * Math.sin(angle) + "px) rotate(" + rotateAngle + "deg)";
      cloned.style.opacity = 0;
    });
  });
});