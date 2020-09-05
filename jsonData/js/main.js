const input = document.getElementById("inputFile");
const dataTable = document.getElementById("dataTable");

let isFormToReductDataOpen = false;
let selectedRow = "";
let selectedRowBeforChangingData = "";
let rowAttribute = 0;
let data;
let jsonKeys;

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
        }<div class="pen"></div></td>`;
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
    };
    reader.readAsText(file); //????????????зачем эта строка
  },
  false
);

dataTable.onclick = function (event) {
  let row = "";

  if (isFormToReductDataOpen) return;
  const thAll = document.querySelectorAll("th");
  let numberOfCols = 0;
  let td = event.target.closest("td");
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
  const dataForInputRow = `<td>
    <form id="formReductRow" action="#">${row}
    <div class="wrapperButtons">
          <button type="submit" class="iconsGeneralRulls saveIcon"></button>
          <button type="reset" class="iconsGeneralRulls cancelIcon"></button>
        </div>
    </form>
  </td>
  `;

  selectedRow.innerHTML = dataForInputRow;
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
};

document.getElementById("save").onclick = function () {
  let text = JSON.stringify(data);
  this.href = "data:attachment/text," + encodeURI(text);
  this.target = "_blank";
  this.download = "filename.json";
};
