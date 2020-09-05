"use strict";

var input = document.getElementById("inputFile");
var dataTable = document.getElementById("dataTable");
var isFormToReductDataOpen = false;
var selectedRow = "";
var selectedRowBeforChangingData = "";
var rowAttribute = 0;
var data;
var jsonKeys;

function onClickSubmitInFormReductRow(rowAttr, values) {
  for (var i = 0; i < values.length; i++) {
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
      if (_j === jsonKeys.length - 1) {
        tempLine += "<td class=\"lastTd\" data-row=\"".concat(i, "\" data-col=\"").concat(_j, "\">").concat(data[i][jsonKeys[_j]], "<div class=\"pen\"></div></td>");
      } else {
        tempLine += "<td data-row=\"".concat(i, "\" data-col=\"").concat(_j, "\">").concat(data[i][jsonKeys[_j]], "</td>");
      }
    }

    tableForRender += "<tr>".concat(tempLine, "</tr>");
  }

  dataForRender = "\n  <caption>\n  \u0414\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 \u0444\u0430\u0439\u043B\u0430\n  </caption>\n  ".concat(dataForRender, "\n  ").concat(tableForRender, "\n  ");
  dataTable.innerHTML = dataForRender;
}

input.addEventListener("change", function (event) {
  var file = input.files[0];
  var reader = new FileReader();

  reader.onload = function (event) {
    data = JSON.parse(reader.result);
    jsonKeys = Object.keys(data[0]);
    renderJSON(data);
  };

  reader.readAsText(file); //????????????зачем эта строка
}, false);

dataTable.onclick = function (event) {
  var row = "";
  if (isFormToReductDataOpen) return;
  var thAll = document.querySelectorAll("th");
  var numberOfCols = 0;
  var td = event.target.closest("td");
  if (!td) return;
  if (!dataTable.contains(td)) return;
  isFormToReductDataOpen = true;
  selectedRowBeforChangingData = td.parentNode.innerHTML;
  var height = td.parentNode.clientHeight;
  var width = td.parentNode.clientWidth;
  selectedRow = td.parentNode;
  rowAttribute = td.getAttribute("data-row");

  for (var j = 0; j < jsonKeys.length; j++) {
    row += "<input type=\"text\" name=\"".concat(j, "\" class=\"inputFormReduct\" value=\"").concat(data[rowAttribute][jsonKeys[j]], "\"/>");
    numberOfCols = j;
  }

  var dataForInputRow = "<td>\n    <form id=\"formReductRow\" action=\"#\">".concat(row, "\n    <div class=\"wrapperButtons\">\n          <button type=\"submit\" class=\"iconsGeneralRulls saveIcon\"></button>\n          <button type=\"reset\" class=\"iconsGeneralRulls cancelIcon\"></button>\n        </div>\n    </form>\n  </td>\n  ");
  selectedRow.innerHTML = dataForInputRow;
  selectedRow.style.height = height + "px";
  selectedRow.style.width = width + "px";
  document.getElementById("formReductRow").style.height = height + "px";
  document.getElementById("formReductRow").style.width = width - numberOfCols + "px";
  var inputs = document.getElementsByClassName("inputFormReduct");
  var inputsValues = [];

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].style.width = thAll[i].clientWidth - 1 + "px";
    inputsValues[i] = inputs[i].value;
  }

  document.getElementById("formReductRow").addEventListener("submit", function (e) {
    e.preventDefault();

    for (var _i = 0; _i < inputs.length; _i++) {
      inputsValues[_i] = e.srcElement[_i].value;
    }

    onClickSubmitInFormReductRow(rowAttribute, inputsValues);
  });
  document.getElementById("formReductRow").addEventListener("reset", function (e) {
    onClickResetInFormReductRow();
  });
};

document.getElementById("save").onclick = function () {
  var text = JSON.stringify(data);
  this.href = "data:attachment/text," + encodeURI(text);
  this.target = "_blank";
  this.download = "filename.json";
};