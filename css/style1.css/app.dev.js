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
      var n = 4 * (k * width + f);
      console.log(idata.data[n]);
    }
  }

  datums.forEach(function (imagedata) {
    var cloned = canvas.cloneNode();
    cloned.getContext("2d").putImageData(imagedata, 0, 0);
    document.body.appendChild(cloned);
  });
});