"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// function MyLib(options) {
//   this.state = {
//     backgroundColor: options.backgroundColor,
//   };
//   this.input = document.getElementById("inputFile");
//   this.dataTable = document.getElementById("dataTable");
//   this.isFormToEditDataOpen = false;
//   this.selectedRowBeforChangingData = "";
//   this.selectedRow = "";
//   this.data;
//   this.rowAttribute = "";
//   this.jsonKeys;
//   this.numberOfCols = 0;
//   this.input.addEventListener("change", this.downloadingJSONFile.bind(this));
//   this.dataTable.addEventListener(
//     "click",
//     this.findClickAndEditTable.bind(this)
//   );
//   document
//     .getElementById("addOneRowId")
//     .addEventListener("click", this.addNewRow.bind(this));
//   document
//     .getElementById("saveButton")
//     .addEventListener("click", this.saveButton.bind(this));
//   document
//     .getElementById("reset")
//     .addEventListener("click", this.resetFunction);
//   // document.getElementById("test").htmlgl();
//   // document.rasterize(element, optionsObject): ImageData;
// }
// MyLib.prototype.resetFunction = function () {};
var MyLib =
/*#__PURE__*/
function () {
  function MyLib(options) {
    _classCallCheck(this, MyLib);

    this.state = {
      backgroundColor: options.backgroundColor // element: options.element,

    }; // this._elem = options.element;
    // options.elem.onclick = this.onClick.bind(this);

    this.input = document.getElementById("inputFile");
    this.dataTable = document.getElementById("dataTable");
    this.mainFormTable = document.getElementById("formToInputTableData");
    this.isFormToEditDataOpen = false;
    this.selectedRowBeforChangingData = "";
    this.selectedRow = "";
    this.data;
    this.rowAttribute = "";
    this.jsonKeys;
    this.numberOfCols = 0;
    document.getElementsByClassName("wrapper")[0].addEventListener("click", this.findClick.bind(this)); // this.input.addEventListener("change", this.downloadingJSONFile.bind(this));
    // this.mainFormTable.addEventListener(
    //   "click",
    //   this.findClickAndEditTable.bind(this)
    // );
    // this.mainFormTable.addEventListener("submit", (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   const inputs = document.getElementsByClassName("inputFormEdit");
    //   const inputsValues = [];
    //   for (let i = 0; i < inputs.length; i++) {
    //     inputsValues[i] = inputs[i].value;
    //   }
    //   this.onClickSaveInFormEditRow(this.rowAttribute, inputsValues);
    // });
    // this.mainFormTable.addEventListener("reset", (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   this.onClickResetInFormEditRow();
    // });
    // document
    //   .getElementById("addOneRowId")
    //   .addEventListener("click", this.addNewRow.bind(this));
    // document
    //   .getElementById("saveButton")
    //   .addEventListener("click", this.saveButton.bind(this));
    // document
    //   .getElementById("reset")
    //   .addEventListener("click", this.resetFunction);
  }

  _createClass(MyLib, [{
    key: "findClick",
    value: function findClick(event) {
      var action = event.target.dataset.action;

      if (action) {
        console.log(action);
        this[action]();
      }
    } // onClick(event) {
    //   let action = event.target.dataset.action;
    //   if (action) {
    //     this[action]();
    //   }
    //   console.log("super");
    // }

  }, {
    key: "saveAsJSON",
    value: function saveAsJSON() {
      if (this.data) {
        var text = JSON.stringify(this.data);
        var a = document.createElement("a");
        a.href = "data:attachment/text," + encodeURI(text);
        a.target = "_blank";
        a.download = "filename.json";
        a.click();
      } else alert("Сначала загрузите таблицу");
    } /////////////////////downloading JSON File //////////////////////

  }, {
    key: "downloadingJSONFile",
    value: function downloadingJSONFile() {
      var _this = this;

      var file = this.input.files[0];
      var reader = new FileReader();

      reader.onload = function () {
        var data = JSON.parse(reader.result);
        _this.data = data;
        _this.jsonKeys = Object.keys(_this.data[0]);
        console.log("1");

        _this.renderJSON(data);
      };

      console.log("2");
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

      for (var i = 0; i < data.length; i++) {
        var tempLine = "";

        for (var _j = 0; _j < this.jsonKeys.length; _j++) {
          if (_j === this.jsonKeys.length - 1) {
            tempLine += "<td class=\"lastTd\" data-row=\"".concat(i, "\" data-col=\"").concat(this.jsonKeys[_j], "\">").concat(data[i][this.jsonKeys[_j]], "<div class=\"wrapForEditAndDelButtons\"><button class=\"pen editCancelButtonsGeneral\"></button><button class=\"deleteRow editCancelButtonsGeneral\"></button></div></td>");
          } else {
            tempLine += "<td data-row=\"".concat(i, "\" data-col=\"").concat(this.jsonKeys[_j], "\">").concat(data[i][this.jsonKeys[_j]], "</td>");
          }
        }

        tableForRender += "<tr>".concat(tempLine, "</tr>");
      }

      dataForRender = "\n      <caption>\n        \u0414\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 \u0444\u0430\u0439\u043B\u0430\n      </caption>\n      ".concat(dataForRender, "\n      ").concat(tableForRender);
      document.getElementsByClassName("wrapper")[0].style.backgroundColor = this.state.backgroundColor;
      this.dataTable.innerHTML = dataForRender;
    } ///////////////////// Finding click and edit table //////////////////////

  }, {
    key: "findClickAndEditTable",
    value: function findClickAndEditTable(event) {
      console.log("findClickAndEditTable");

      if (this.isFormToEditDataOpen) {
        return;
      }

      var row = "";
      var td = event.target.closest("td");
      this.rowAttribute = td.getAttribute("data-row");
      var deleteButton = event.target.closest(".deleteRow"); // if (
      //   td.parentNode.classList.contains("active") ||
      //   td.parentNode.parentNode.classList.contains("active")
      // ) {
      //   console.log("im working");
      //   return;
      // }

      if (deleteButton) {
        this.deleteRow(this.rowAttribute);
      } else if (td || this.dataTable.contains(td)) {
        this.isFormToEditDataOpen = true;
        this.selectedRowBeforChangingData = td.parentNode.innerHTML;
        this.selectedRow = td.parentNode;

        for (var j = 0; j < this.jsonKeys.length; j++) {
          if (j === this.jsonKeys.length - 1) {
            row += "<td><input type=\"text\" name=\"".concat(this.jsonKeys[j], "\" class=\"inputFormEdit\" value=\"").concat(this.data[this.rowAttribute][this.jsonKeys[j]], "\"/> <div class=\"wrapperButtons\">\n                  <button type=\"submit\" class=\"iconsGeneralRulls saveIcon\"></button>\n                  <button type=\"reset\" class=\"iconsGeneralRulls cancelIcon\"></button>\n                </div>\n          </td>");
          } else {
            row += "<td><input type=\"text\" name=\"".concat(this.jsonKeys[j], "\" class=\"inputFormEdit\" value=\"").concat(this.data[this.rowAttribute][this.jsonKeys[j]], "\"/></td>");
          }

          this.numberOfCols = j;
        }

        this.selectedRow.classList.add("active");
        this.selectedRow.innerHTML = row;
      }
    } /////////////////////Deleting the row //////////////////////

  }, {
    key: "deleteRow",
    value: function deleteRow(numberOfRow) {
      this.data.splice(numberOfRow, 1);
      this.renderJSON(this.data);
    } /////////////////////Adding new row //////////////////////

  }, {
    key: "addOneRow",
    value: function addOneRow() {
      if (this.data) {
        this.data.push({});
        var dataLength = this.data.length;

        for (var i = 0; i < this.jsonKeys.length; i++) {
          this.data[dataLength - 1][this.jsonKeys[i]] = "...click here...";
        }

        this.renderJSON(this.data);
      } else alert("download file first");
    } ///////////////////// Edit and saving row data //////////////////////

  }, {
    key: "onClickSaveInFormEditRow",
    value: function onClickSaveInFormEditRow(rowAttr, values) {
      console.log("save as json");

      for (var i = 0; i < values.length; i++) {
        this.data[rowAttr][this.jsonKeys[i]] = values[i];
      }

      this.renderJSON(this.data);
      this.isFormToEditDataOpen = false;
    } ///////////////////// Cancelling editing row data //////////////////////

  }, {
    key: "onClickResetInFormEditRow",
    value: function onClickResetInFormEditRow() {
      this.selectedRow.innerHTML = this.selectedRowBeforChangingData;
      this.isFormToEditDataOpen = false;
      this.selectedRow.classList.remove("active");
    } ///////////////////// reset //////////////////////

  }, {
    key: "resetFunction",
    value: function resetFunction() {
      console.log("reset");
      Array.from(document.getElementsByClassName("wrapForEditAndDelButtons")).forEach(function (element) {
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
  backgroundColor: "rgba(233, 227, 248, 0.8)",
  element: "wrapper"
});