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
      for (let l = 0; l < 2; l++) {
        let n = 4 * (k * width + f);
        let m = Math.floor((36 * (Math.random() + (2 * f) / width)) / 3);
        for (let p = 0; p < 4; p++) {
          // console.log(idata.data[n]);
          datums[m].data[n + p] = idata.data[n + p];
        }
      }
    }
  }

  datums.forEach((imagedata, i) => {
    let cloned = canvas.cloneNode();

    cloned.style.transition = "all 1.5s ease-out " + (1.5 * i) / 36 + "s";

    cloned.getContext("2d").putImageData(imagedata, 0, 0);
    document.body.appendChild(cloned);

    setTimeout(() => {
      let angle = (Math.random() - 0.5) * 2 * Math.PI;
      let rotateAngle = 15 * (Math.random() - 0.5);
      cloned.style.transform =
        "rotate(" +
        rotateAngle +
        "deg) translate(" +
        60 * Math.cos(angle) +
        "px," +
        60 * Math.sin(angle) +
        "px) rotate(" +
        rotateAngle +
        "deg)";
      cloned.style.opacity = 0;
    });
  });
});
