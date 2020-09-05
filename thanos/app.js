import html2canvas from "html2canvas";
import "./style.less";

html2canvas(document.querySelector("#capture")).then((canvas) => {
  //   document.body.appendChild(canvas);
  let width = canvas.width;
  let height = canvas.height;
  let ctx = canvas.getContext("2d");
  let idata = ctx.getImageData(0, 0, width, height);
  let datums = [];

  for (let i = 0; i < 36; i++) {
    datums.push(ctx.createImageData(width, height));
    // datums.push(idata);
  }

  for (let f = 0; f < width; f++) {
    for (let k = 0; k < height; k++) {
      let n = 4 * (k * width + f);
      console.log(idata.data[n]);
    }
  }

  datums.forEach((imagedata) => {
    let cloned = canvas.cloneNode();

    cloned.getContext("2d").putImageData(imagedata, 0, 0);
    document.body.appendChild(cloned);
  });
});
