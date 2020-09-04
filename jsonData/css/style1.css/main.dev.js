"use strict";

var input = document.getElementById("inputFile");
var dataTable = document.getElementById("dataTable");
var isFormToReductDataOpen = false; // let copyTable = document.getElementById("copyTable");

var selectedRow = ""; // copyTable.classList.remove("selected");
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

var data = [{
  candidateName: "Peter Petrov",
  candidateStatus: "pending",
  candidateNeedOffer: 1800
}, {
  candidateName: "Ivan Ivanov",
  candidateStatus: "pending",
  candidateNeedOffer: 3000
}, {
  candidateName: "Roman Romanov",
  candidateStatus: "oninterview",
  candidateNeedOffer: 2400
}, {
  candidateName: "Konstantin Fesenko",
  candidateStatus: "on_test_perdiod",
  candidateNeedOffer: 3000
}, {
  candidateName: "Roman Konstantinov",
  candidateStatus: "on_test_perdiod",
  candidateNeedOffer: 123456
}, {
  candidateName: "Konstantin Konstantinov",
  candidateStatus: "on_test_perdiod",
  candidateNeedOffer: 3000
}, {
  candidateName: "Optre Hgterrw",
  candidateStatus: "on_test_perdiod",
  candidateNeedOffer: 5678
}, {
  candidateName: "Omg Ksdsfnov",
  candidateStatus: "on_prison",
  candidateNeedOffer: 3000
}, {
  candidateName: "Naz Rtu",
  candidateStatus: "validate",
  candidateNeedOffer: 200
}];

function renderJSON(data) {
  var jsonKeys = Object.keys(data[0]);
  var dataForRender,
      tableForRender = "";

  for (var j = 0; j < jsonKeys.length; j++) {
    tableForRender += "<th data-number>".concat(jsonKeys[j], "</th>");
  }

  dataForRender = "<tr>".concat(tableForRender, "</tr>");
  tableForRender = "";

  for (var i = 0; i < data.length; i++) {
    var tempLine = "";

    for (var _j = 0; _j < jsonKeys.length; _j++) {
      // console.log(data[i][jsonKeys[j]]);
      if (_j === jsonKeys.length - 1) {
        tempLine += "<td class=\"lastTd\" data-row=\"".concat(i, "\" data-col=\"").concat(_j, "\">").concat(data[i][jsonKeys[_j]], "<div class=\"pen\"></div></td>");
      } else {
        tempLine += "<td data-row=\"".concat(i, "\" data-col=\"").concat(_j, "\">").concat(data[i][jsonKeys[_j]], "</td>");
      }
    }

    tableForRender += "<tr>".concat(tempLine, "</tr>");
  }

  dataForRender = "\n      <caption>\n        \u0414\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 \u0444\u0430\u0439\u043B\u0430\n      </caption>\n      ".concat(dataForRender, "\n      ").concat(tableForRender, "\n    ");
  dataTable.innerHTML = dataForRender; // console.log(dataForRender);
}

renderJSON(data); // renderCopyTable(data);

dataTable.onclick = function (event) {
  if (isFormToReductDataOpen) return;
  isFormToReductDataOpen = true;
  var jsonKeys = Object.keys(data[0]);
  var thAll = document.querySelectorAll("th[data-number]");
  var numberOfCols = 0;
  var td = event.target.closest("td"); // (1)

  if (!td) return; // (2)

  if (!dataTable.contains(td)) return; // (3)

  if (selectedRow) {
    selectedRow.classList.remove("selected");
  }

  var height = td.parentNode.clientHeight;
  var width = td.parentNode.clientWidth;
  selectedRow = td.parentNode;
  var rowAttribute = td.getAttribute("data-row");
  selectedRow.classList.add("selected");
  selectedRow.style.height = height + "px";
  selectedRow.style.width = width + "px";
  selectedRow.style.position = "relative"; // <form action="">
  //   <input type="text" value="${data[rowAttribute][jsonKeys[j]]}" />
  // </form>;

  var row = "";

  for (var j = 0; j < jsonKeys.length; j++) {
    row += "<input type=\"text\" class=\"inputFormReduct\" value=\"".concat(data[rowAttribute][jsonKeys[j]], "\"/>");
    numberOfCols = j;
  }

  var dataForInputRow = "<td>\n    <form id=\"formReductRow\" action=\"#\">".concat(row, "\n    <div class=\"wrapperButtons\">\n          <button type=\"submit\" class=\"iconsGeneralRulls saveIcon\"></button>\n          <button class=\"iconsGeneralRulls cancelIcon\"></button>\n        </div>\n    </form>\n  </td>\n  <td></td>\n  <td></td>");
  selectedRow.innerHTML = dataForInputRow;
  document.getElementById("formReductRow").style.height = height + "px";
  document.getElementById("formReductRow").style.width = width - numberOfCols + "px";
  var inputs = document.getElementsByClassName("inputFormReduct");

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].style.width = thAll[i].clientWidth - 1 + "px";
  }
};

document.getElementById("formReductRow").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("working");
});