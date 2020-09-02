let input = document.getElementById("inputFile");
let dataTable = document.getElementById("dataTable");
// let copyTable = document.getElementById("copyTable");
let selectedRow = "";
// copyTable.classList.remove("selected");
// let dataJSON;
// input.addEventListener(
//   "change",
//   function (event) {
//     let file = input.files[0];
//     let reader = new FileReader();
//     reader.onload = function (event) {
//       // console.log(reader.result);
//       dataJSON = JSON.parse(reader.result);
//       renderJSON(dataJSON);
//     };
//     reader.readAsText(file); //????????????зачем эта строка
//     // let files = input.files;
//   },
//   false
// );
const data = [
  {
    candidateName: "Peter Petrov",
    candidateStatus: "pending",
    candidateNeedOffer: 1800,
  },
  {
    candidateName: "Ivan Ivanov",
    candidateStatus: "pending",
    candidateNeedOffer: 3000,
  },
  {
    candidateName: "Roman Romanov",
    candidateStatus: "oninterview",
    candidateNeedOffer: 2400,
  },
  {
    candidateName: "Konstantin Fesenko",
    candidateStatus: "on_test_perdiod",
    candidateNeedOffer: 3000,
  },
  {
    candidateName: "Roman Konstantinov",
    candidateStatus: "on_test_perdiod",
    candidateNeedOffer: 123456,
  },
  {
    candidateName: "Konstantin Konstantinov",
    candidateStatus: "on_test_perdiod",
    candidateNeedOffer: 3000,
  },
  {
    candidateName: "Optre Hgterrw",
    candidateStatus: "on_test_perdiod",
    candidateNeedOffer: 5678,
  },
  {
    candidateName: "Omg Ksdsfnov",
    candidateStatus: "on_prison",
    candidateNeedOffer: 3000,
  },
  {
    candidateName: "Naz Rtu",
    candidateStatus: "validate",
    candidateNeedOffer: 200,
  },
];

function renderJSON(data) {
  const jsonKeys = Object.keys(data[0]);
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
      // console.log(data[i][jsonKeys[j]]);
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
  // console.log(dataForRender);
}

function renderCopyTable(data) {
  const jsonKeys = Object.keys(data[0]);
  let dataForRender,
    tableForRender = "";
  for (let j = 0; j < jsonKeys.length; j++) {
    tableForRender += `<th>${jsonKeys[j]}</th>`;
  }
  dataForRender = `<tr>${tableForRender}</tr>`;
  tableForRender = "";

  for (let i = 0; i < data.length; i++) {
    let tempLine = "";
    for (let j = 0; j < jsonKeys.length; j++) {
      if (j === jsonKeys.length - 1) {
        tempLine += `<td class="lastTd">${
          data[i][jsonKeys[j]]
        }<div class="pen"></div></td>`;
      } else {
        tempLine += `<td>${data[i][jsonKeys[j]]}</td>`;
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
  copyTable.innerHTML = dataForRender;
  // console.log(dataForRender);
}

renderJSON(data);
// renderCopyTable(data);

dataTable.onclick = function (event) {
  const jsonKeys = Object.keys(data[0]);
  const thAll = document.querySelectorAll("th[data-number]");
  let numberOfCols = 0;
  let td = event.target.closest("td"); // (1)

  if (!td) return; // (2)

  if (!dataTable.contains(td)) return; // (3)

  if (selectedRow) {
    selectedRow.classList.remove("selected");
  }
  const height = td.parentNode.clientHeight;
  const width = td.parentNode.clientWidth;
  selectedRow = td.parentNode;
  const rowAttribute = td.getAttribute("data-row");
  selectedRow.classList.add("selected");
  selectedRow.style.height = height + "px";
  selectedRow.style.width = width + "px";
  selectedRow.style.position = "relative";

  // <form action="">
  //   <input type="text" value="${data[rowAttribute][jsonKeys[j]]}" />
  // </form>;

  let row = "";

  for (let j = 0; j < jsonKeys.length; j++) {
    row += `<input type="text" class="inputFormReduct" value="${
      data[rowAttribute][jsonKeys[j]]
    }"/>`;
    numberOfCols = j;
  }
  const dataForInputRow = `<td>
    <form id="formReductRow" action="#">${row}
        <div class="wrapperIcons">
          <div class="iconsGeneralRulls saveIcon"></div>
          <div class="iconsGeneralRulls cancelIcon"></div>
        </div>
    </form>
  </td>
  <td></td>
  <td></td>`;

  selectedRow.innerHTML = dataForInputRow;
  document.getElementById("formReductRow").style.height = height + "px";
  document.getElementById("formReductRow").style.width =
    width - numberOfCols + "px";

  const inputs = document.getElementsByClassName("inputFormReduct");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.width = thAll[i].clientWidth - 1 + "px";
  }

  // console.log();
};
