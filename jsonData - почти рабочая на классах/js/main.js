const input = document.getElementById("inputFile");
const dataTable = document.getElementById("dataTable");

let isFormToReductDataOpen = false;
let selectedRow = "";
let selectedRowBeforChangingData = "";
let rowAttribute = 0;
let data;
let jsonKeys;
let numberOfCols = 0;

function onClickSubmitInFormReductRow(rowAttr, values) {
  for (let i = 0; i < values.length; i++) {
    data[rowAttr][jsonKeys[i]] = values[i];
  }
  renderJSON(data);
  isFormToReductDataOpen = false;
}

function onClickResetInFormReductRow() {
  selectedRow.innerHTML = selectedRowBeforChangingData;
  isFormToReductDataOpen = false;
}

function addNewRow() {
  if (data) {
    data.push({});
    const dataLength = data.length;
    for (let i = 0; i < jsonKeys.length; i++) {
      data[dataLength - 1][jsonKeys[i]] = "...enter value...";
    }
    renderJSON(data);
  } else alert("download file first");
}

function deleteRow(numberOfRow) {
  data.splice(numberOfRow, 1);
  renderJSON(data);
}

function renderJSON(data) {
  let dataForRender,
    tableForRender = "";

  for (let j = 0; j < jsonKeys.length; j++) {
    tableForRender += `<th data-number>${jsonKeys[j]}</th>`;
  }
  dataForRender = `<tr>${tableForRender}</tr>`;
  tableForRender = "";

  for (let i = 0; i < data.length; i++) {
    let tempLine = "";
    for (let j = 0; j < jsonKeys.length; j++) {
      if (j === jsonKeys.length - 1) {
        tempLine += `<td class="lastTd" data-row="${i}" data-col="${j}">${
          data[i][jsonKeys[j]]
        }<div class="wrapForReductAndDeklButtons"><div class="pen"></div><div class="deleteRow"></div></div></td>`;
      } else {
        tempLine += `<td data-row="${i}" data-col="${j}">${
          data[i][jsonKeys[j]]
        }</td>`;
      }
    }
    tableForRender += `<tr>${tempLine}</tr>`;
  }
  dataForRender = `
  <caption>
  Данные из файла
  </caption>
  ${dataForRender}
  ${tableForRender}
  `;
  dataTable.innerHTML = dataForRender;
}

input.addEventListener(
  "change",
  function (event) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.onload = function (event) {
      data = JSON.parse(reader.result);
      jsonKeys = Object.keys(data[0]);
      renderJSON(data);
      setTimeout(() => {
        dataTable.style.transform = "scale(" + 1 + ")";
        dataTable.style.opacity = 1;
      }, 100);
    };
    reader.readAsText(file);
  },
  false
);

dataTable.onclick = function (event) {
  let row = "";

  if (isFormToReductDataOpen) return;
  const thAll = document.querySelectorAll("th");

  let td = event.target.closest("td");
  let deleteButton = event.target.closest(".deleteRow");
  if (deleteButton) {
    deleteRow(td.getAttribute("data-row"));
  } else {
    if (!td) return;
    if (!dataTable.contains(td)) return;
    isFormToReductDataOpen = true;
    selectedRowBeforChangingData = td.parentNode.innerHTML;
    const height = td.parentNode.clientHeight;
    const width = td.parentNode.clientWidth;
    selectedRow = td.parentNode;
    rowAttribute = td.getAttribute("data-row");

    for (let j = 0; j < jsonKeys.length; j++) {
      row += `<input type="text" name="${j}" class="inputFormReduct" value="${
        data[rowAttribute][jsonKeys[j]]
      }"/>`;
      numberOfCols = j;
    }
    const dataForInputRow = `<form id="formReductRow" action="#">${row}
          <div class="wrapperButtons">
            <button type="submit" class="iconsGeneralRulls saveIcon"></button>
            <button type="reset" class="iconsGeneralRulls cancelIcon"></button>
          </div>
      </form>
    `;

    selectedRow.firstElementChild.insertAdjacentHTML(
      "beforeEnd",
      dataForInputRow
    );
    selectedRow.style.height = height + "px";
    selectedRow.style.width = width + "px";
    document.getElementById("formReductRow").style.height = height + "px";
    document.getElementById("formReductRow").style.width =
      width - numberOfCols + "px";

    const inputs = document.getElementsByClassName("inputFormReduct");
    const inputsValues = [];
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.width = thAll[i].clientWidth - 1 + "px";
      inputsValues[i] = inputs[i].value;
    }

    document.getElementById("formReductRow").addEventListener("submit", (e) => {
      e.preventDefault();

      for (let i = 0; i < inputs.length; i++) {
        inputsValues[i] = e.srcElement[i].value;
      }
      onClickSubmitInFormReductRow(rowAttribute, inputsValues);
    });

    document.getElementById("formReductRow").addEventListener("reset", (e) => {
      onClickResetInFormReductRow();
    });
  }
};

//////////////////////// click ADD NEW ROW

document.getElementById("addOneRowId").onclick = function () {
  addNewRow();
};

//////////////////////// click SAVE

document.getElementById("save").onclick = function () {
  if (data) {
    let text = JSON.stringify(data);
    this.href = "data:attachment/text," + encodeURI(text);
    this.target = "_blank";
    this.download = "filename.json";
  } else alert("Download file first");
};

//////////////////////// click RESET

document.getElementById("reset").onclick = function () {
  Array.from(
    document.getElementsByClassName("wrapForReductAndDeklButtons")
  ).forEach((element) => {
    element.style.display = "none";
  });

  if (true) {
    html2canvas(document.querySelector("#capture")).then((canvas) => {
      let width = canvas.width;
      let height = canvas.height;
      let ctx = canvas.getContext("2d");
      let idata = ctx.getImageData(0, 0, width, height);
      let datums = [];
      for (let i = 0; i < 36; i++) {
        datums.push(ctx.createImageData(width, height));
      }
      for (let f = 0; f < width; f++) {
        for (let k = 0; k < height; k++) {
          for (let l = 0; l < 2; l++) {
            let n = 4 * (k * width + f);
            let m = Math.floor((36 * (Math.random() + (2 * f) / width)) / 3);
            for (let p = 0; p < 4; p++) {
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
  } else alert("Table is Empty");
};

///////////
