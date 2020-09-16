"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MyLib =
/*#__PURE__*/
function () {
  function MyLib(options) {
    var _this = this;

    _classCallCheck(this, MyLib);

    this.state = {
      backgroundColor: options.backgroundColor
    };
    this.input = document.getElementById("inputFile");
    this.dataTable = document.getElementById("dataTable");
    this.isFormToReductDataOpen = false;
    this.selectedRowBeforChangingData = "";
    this.selectedRow = "";
    this.data;
    this.rowAttribute = "";
    this.jsonKeys;
    this.numberOfCols = 0;
    this.input.addEventListener("change", this.downloadingJSONFile.bind(this));
    this.dataTable.addEventListener("click", this.findClickAndReductTable.bind(this));
    document.getElementById("addOneRowId").addEventListener("click", this.addNewRow.bind(this));
    document.getElementById("saveButton").addEventListener("click", function () {
      var text = JSON.stringify(_this.data);
      var a = document.createElement("a");
      a.href = "data:attachment/text," + encodeURI(text);
      a.target = "_blank";
      a.download = "filename.json";
      a.click();
    });
    document.getElementById("reset").addEventListener("click", this.resetFunction); // document.getElementById("test").htmlgl();
    // document.rasterize(element, optionsObject): ImageData;
  } /////////////////////downloading JSON File //////////////////////


  _createClass(MyLib, [{
    key: "downloadingJSONFile",
    value: function downloadingJSONFile(event) {
      var file = this.input.files[0];
      var reader = new FileReader();

      reader.onload = function (event) {
        this.data = JSON.parse(reader.result);
        this.jsonKeys = Object.keys(this.data[0]);
        this.renderJSON(this.data);
      }.bind(this);

      reader.readAsText(file);
    } ///////////////////// Render Data to Dom //////////////////////

  }, {
    key: "renderJSON",
    value: function renderJSON(data) {
      var dataForRender,
          tableForRender = "";

      for (var j = 0; j < this.jsonKeys.length; j++) {
        tableForRender += "<th data-number>".concat(this.jsonKeys[j], "</th>");
      }

      dataForRender = "<tr>".concat(tableForRender, "</tr>");
      tableForRender = "";

      for (var i = 0; i < this.data.length; i++) {
        var tempLine = "";

        for (var _j = 0; _j < this.jsonKeys.length; _j++) {
          if (_j === this.jsonKeys.length - 1) {
            tempLine += "<td class=\"lastTd\" data-row=\"".concat(i, "\" data-col=\"").concat(this.jsonKeys[_j], "\">").concat(this.data[i][this.jsonKeys[_j]], "<div class=\"wrapForReductAndDelButtons\"><button class=\"pen reductCancelButtonsGeneral\"></button><button class=\"deleteRow reductCancelButtonsGeneral\"></button></div></td>");
          } else {
            tempLine += "<td data-row=\"".concat(i, "\" data-col=\"").concat(this.jsonKeys[_j], "\">").concat(this.data[i][this.jsonKeys[_j]], "</td>");
          }
        }

        tableForRender += "<tr>".concat(tempLine, "</tr>");
      }

      dataForRender = "\n      <caption>\n        \u0414\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 \u0444\u0430\u0439\u043B\u0430\n      </caption>\n      ".concat(dataForRender, "\n      ").concat(tableForRender);
      document.getElementsByClassName("wrapper")[0].style.backgoundColor = this.state.backgroundColor;
      this.dataTable.innerHTML = dataForRender;
      console.log(document.getElementsByClassName("wrapper")[0]);
    } ///////////////////// Finding click and reduct table //////////////////////

  }, {
    key: "findClickAndReductTable",
    value: function findClickAndReductTable() {
      var _this2 = this;

      if (this.isFormToReductDataOpen) return;
      var row = "";
      var td = event.target.closest("td");
      this.rowAttribute = td.getAttribute("data-row");
      var deleteButton = event.target.closest(".deleteRow");

      if (deleteButton) {
        this.deleteRow(this.rowAttribute);
      } else {
        if (!td || !this.dataTable.contains(td)) return;
        this.isFormToReductDataOpen = true;
        this.selectedRowBeforChangingData = td.parentNode.innerHTML;
        this.selectedRow = td.parentNode;

        for (var j = 0; j < this.jsonKeys.length; j++) {
          if (j === this.jsonKeys.length - 1) {
            row += "<td><input type=\"text\" name=\"".concat(this.jsonKeys[j], "\" class=\"inputFormReduct\" value=\"").concat(this.data[this.rowAttribute][this.jsonKeys[j]], "\"/> <div class=\"wrapperButtons\">\n                  <button type=\"submit\" class=\"iconsGeneralRulls saveIcon\"></button>\n                  <button type=\"reset\" class=\"iconsGeneralRulls cancelIcon\"></button>\n                </div>\n          </td>");
          } else {
            row += "<td><input type=\"text\" name=\"".concat(this.jsonKeys[j], "\" class=\"inputFormReduct\" value=\"").concat(this.data[this.rowAttribute][this.jsonKeys[j]], "\"/></td>");
          }

          this.numberOfCols = j;
        }

        this.selectedRow.classList.add("active");
        this.selectedRow.innerHTML = row;
        var inputs = document.getElementsByClassName("inputFormReduct");
        document.getElementById("formToInputTableData").addEventListener("submit", function (e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("before", _this2.rowAttribute);
          var inputsValues = [];

          for (var i = 0; i < inputs.length; i++) {
            inputsValues[i] = inputs[i].value;
          }

          _this2.onClickSaveInFormReductRow(_this2.rowAttribute, inputsValues);
        });
        document.getElementById("formToInputTableData").addEventListener("reset", function (e) {
          e.preventDefault();
          e.stopPropagation();

          _this2.onClickResetInFormReductRow();
        });
      }
    } /////////////////////Deleting the row //////////////////////

  }, {
    key: "deleteRow",
    value: function deleteRow(numberOfRow) {
      this.data.splice(numberOfRow, 1);
      this.renderJSON(this.data);
    } /////////////////////Adding new row //////////////////////

  }, {
    key: "addNewRow",
    value: function addNewRow() {
      if (this.data) {
        this.data.push({});
        var dataLength = this.data.length;

        for (var i = 0; i < this.jsonKeys.length; i++) {
          this.data[dataLength - 1][this.jsonKeys[i]] = "...click here...";
        }

        this.renderJSON(this.data);
      } else alert("download file first");
    } ///////////////////// Reduct and saving row data //////////////////////

  }, {
    key: "onClickSaveInFormReductRow",
    value: function onClickSaveInFormReductRow(rowAttr, values) {
      console.log("after", rowAttr);

      for (var i = 0; i < values.length; i++) {
        this.data[rowAttr][this.jsonKeys[i]] = values[i];
      }

      this.renderJSON(this.data);
      this.isFormToReductDataOpen = false;
    } ///////////////////// Cancelling reducting row data //////////////////////

  }, {
    key: "onClickResetInFormReductRow",
    value: function onClickResetInFormReductRow() {
      this.selectedRow.innerHTML = this.selectedRowBeforChangingData;
      this.isFormToReductDataOpen = false;
      this.selectedRow.classList.remove("active");
    } ///////////////////// reset //////////////////////

  }, {
    key: "resetFunction",
    value: function resetFunction() {
      Array.from(document.getElementsByClassName("wrapForReductAndDelButtons")).forEach(function (element) {
        element.style.display = "none";
      });
      html2canvas(document.querySelector("#formToInputTableData")).then(function (canvas) {
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
    }
  }]);

  return MyLib;
}();

new MyLib({
  options: {
    backgroundColor: "red"
  }
});