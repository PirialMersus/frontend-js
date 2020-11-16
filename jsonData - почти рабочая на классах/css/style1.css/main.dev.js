"use strict";

var input = document.getElementById("inputFile");
var dataTable = document.getElementById("dataTable");
var isFormToReductDataOpen = false;
var selectedRow = "";
var selectedRowBeforChangingData = "";
var rowAttribute = 0;
var data;
var jsonKeys;
var numberOfCols = 0;

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

function addNewRow() {
  if (data) {
    data.push({});
    var dataLength = data.length;

    for (var i = 0; i < jsonKeys.length; i++) {
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
        tempLine += "<td class=\"lastTd\" data-row=\"".concat(i, "\" data-col=\"").concat(_j, "\">").concat(data[i][jsonKeys[_j]], "<div class=\"wrapForReductAndDeklButtons\"><div class=\"pen\"></div><div class=\"deleteRow\"></div></div></td>");
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
    setTimeout(function () {
      dataTable.style.transform = "scale(" + 1 + ")";
      dataTable.style.opacity = 1;
    }, 100);
  };

  reader.readAsText(file);
}, false);

dataTable.onclick = function (event) {
  var row = "";
  if (isFormToReductDataOpen) return;
  var thAll = document.querySelectorAll("th");
  var td = event.target.closest("td");
  var deleteButton = event.target.closest(".deleteRow");

  if (deleteButton) {
    deleteRow(td.getAttribute("data-row"));
  } else {
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

    var dataForInputRow = "<form id=\"formReductRow\" action=\"#\">".concat(row, "\n          <div class=\"wrapperButtons\">\n            <button type=\"submit\" class=\"iconsGeneralRulls saveIcon\"></button>\n            <button type=\"reset\" class=\"iconsGeneralRulls cancelIcon\"></button>\n          </div>\n      </form>\n    ");
    selectedRow.firstElementChild.insertAdjacentHTML("beforeEnd", dataForInputRow);
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
  }
}; //////////////////////// click ADD NEW ROW


document.getElementById("addOneRowId").onclick = function () {
  addNewRow();
}; //////////////////////// click SAVE


document.getElementById("save").onclick = function () {
  if (data) {
    var text = JSON.stringify(data);
    this.href = "data:attachment/text," + encodeURI(text);
    this.target = "_blank";
    this.download = "filename.json";
  } else alert("Download file first");
}; //////////////////////// click RESET


document.getElementById("reset").onclick = function () {
  Array.from(document.getElementsByClassName("wrapForReductAndDeklButtons")).forEach(function (element) {
    element.style.display = "none";
  });

  if (true) {
    html2canvas(document.querySelector("#capture")).then(function (canvas) {
      var width = canvas.width;
      var height = canvas.height;
      var ctx = canvas.getContext("2d");
      var idata = ctx.getImageData(0, 0, width, height);
      var datums = [];

      for (var i = 0; i < 36; i++) {
        datums.push(ctx.createImageData(width, height));
      }

      for (var f = 0; f < width; f++) {
        for (var k = 0; k < height; k++) {
          for (var l = 0; l < 2; l++) {
            var n = 4 * (k * width + f);
            var m = Math.floor(36 * (Math.random() + 2 * f / width) / 3);

            for (var p = 0; p < 4; p++) {
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
  } else alert("Table is Empty");
}; ///////////