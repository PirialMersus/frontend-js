"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Table =
/*#__PURE__*/
function () {
  function Table(options) {
    _classCallCheck(this, Table);

    this.state = {};
    this.element = options.newTable;
    this.element.onclick = this.findClick.bind(this);
    this.data = options.data;
    this.jsonKeys = Object.keys(options.data[0]);
    this.renderJSON(options.data);
    this.dataTable = this.element.querySelector("table");
    this.isFormToEditDataOpen = false;
    this.selectedRowBeforChangingData = "";
    this.selectedRow = "";
    this.rowAttribute = "";
    this.numberOfCols = 0;
    this.sortData = [];
    this.arrayOfSortedItems = [];
    this.tempNumbersOfElementsToDelete = [];
  }

  _createClass(Table, [{
    key: "findClick",
    value: function findClick(event) {
      var action = event.target.dataset.action;

      if (action) {
        this[action](event);
      }
    } ///////////////////// Edit and saving row data //////////////////////

  }, {
    key: "onClickSaveInFormEditRow",
    value: function onClickSaveInFormEditRow() {
      var inputs = this.element.getElementsByClassName("inputFormEdit");

      if (this.elementNumber !== "undefined") {
        for (var i = 0; i < this.jsonKeys.length; i++) {
          this.data[this.elementNumber][this.jsonKeys[i]] = inputs[i].value;
          this.sortData[this.rowAttribute][this.jsonKeys[i]] = inputs[i].value;
        }

        this.renderSortedData(this.sortData);
      } else {
        for (var _i = 0; _i < this.jsonKeys.length; _i++) {
          this.data[this.rowAttribute][this.jsonKeys[_i]] = inputs[_i].value;
        }

        this.renderJSON(this.data);
      }

      this.isFormToEditDataOpen = false;
      this.element.classList.remove("editModeOn");
    } ///////////////////// Cancelling editing row data //////////////////////

  }, {
    key: "onClickResetInFormEditRow",
    value: function onClickResetInFormEditRow(e) {
      e.preventDefault();

      if (this.elementNumber !== "undefined") {
        this.renderSortedData(this.sortData);
      } else {
        this.renderJSON(this.data);
      }

      this.isFormToEditDataOpen = false;
      this.selectedRow.classList.remove("active");
      this.element.classList.remove("editModeOn");
    }
  }, {
    key: "showInputsRow",
    value: function showInputsRow(event) {
      if (this.isFormToEditDataOpen) {
        return;
      }

      this.element.classList.add("editModeOn");
      this.isFormToEditDataOpen = true;
      var td = event.target.closest("td");
      this.rowAttribute = td.getAttribute("data-row");
      this.elementNumber = td.getAttribute("data-element_number");
      this.selectedRow = td.parentNode;
      this.selectedRow.classList.add("active");

      if (this.elementNumber !== "undefined") {
        this.selectedRow.innerHTML = this.createInputsRow(this.elementNumber);
      } else {
        this.selectedRow.innerHTML = this.createInputsRow(this.rowAttribute);
      }
    }
  }, {
    key: "createInputsRow",
    value: function createInputsRow(rowAttribute) {
      var row = "";

      for (var j = 0; j < this.jsonKeys.length; j++) {
        if (j === this.jsonKeys.length - 1) {
          row += "\n              <td><input name=\"".concat(this.jsonKeys[j], "\" class=\"inputFormEdit\" value=\"").concat(this.data[rowAttribute][this.jsonKeys[j]], "\"/>\n                <div class=\"wrapperButtons\">\n                  <button data-action=\"onClickSaveInFormEditRow\" type=\"submit\" class=\"iconsGeneralRulls saveIcon\"></button>\n                  <button data-action=\"onClickResetInFormEditRow\" type=\"reset\" class=\"iconsGeneralRulls cancelIcon\"></button>\n                </div>\n              </td>");
        } else {
          row += "<td><input\n                      name=\"".concat(this.jsonKeys[j], "\"\n                      class=\"inputFormEdit\"\n                      value=\"").concat(this.data[rowAttribute][this.jsonKeys[j]], "\"/>\n                </td>");
        }
      }

      return row;
    } ///////////////////// Render Data to Dom //////////////////////

  }, {
    key: "renderJSON",
    value: function renderJSON(data) {
      var _this = this;

      this.elementNumber = undefined;
      var tableHeader = "";
      var tableRows = "";
      var buttonsForRender = "\n      <button class=\"classForEditingButtons2\" data-action=\"addOneRow\">\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n        Add a new row\n      </button>\n      <button class=\"classForEditingButtons2\" data-action=\"saveAsJSON\">\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n        save as JSON\n      </button>\n    ";

      for (var j = 0; j < this.jsonKeys.length; j++) {
        tableHeader += "<th>".concat(this.jsonKeys[j], "\n        <div class=\"sortIconDiv\" data-tooltip=\"Sort\">\n          <i\n            data-action=\"sortAllTable\"\n            data-col=\"").concat(this.jsonKeys[j], "\"\n            class=\"fas fa-caret-square-down\">\n          </i>\n        </div>\n        <input\n        data-col=\"").concat(this.jsonKeys[j], "\"\n        placeholder=\"Enter some text\"\n        />\n      </th>");
      }

      for (var i = 0; i < data.length; i++) {
        tableRows += this.createRoW(i, data);
      }

      this.element.innerHTML = "\n      <form class=\"formToWrapTable\" action=\"#\">\n        <table\n                border=\"1\"\n                class=\"dataTable\">\n          <caption>\n            \u0414\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 \u0444\u0430\u0439\u043B\u0430\n          </caption>\n          <tr>".concat(tableHeader, "</tr>\n           ").concat(tableRows, "\n          </table>\n      </form>\n      ").concat(buttonsForRender);
      this.element.getElementsByClassName("formToWrapTable")[0].addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this.onClickSaveInFormEditRow();
      });
      this.element.getElementsByClassName("formToWrapTable")[0].addEventListener("reset", function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this.onClickResetInFormEditRow();
      });
      this.inputs = this.element.querySelectorAll("input");
      this.inputs.forEach(function (element) {
        element.addEventListener("blur", function () {
          element.value = "";
        });
        element.addEventListener("input", _this.sortTableByEnteringSymbols.bind(_this));
      });
    } /////////////////////Deleting the row //////////////////////

  }, {
    key: "createRoW",
    value: function createRoW(numberOfRow, data) {
      this.templine = "";

      for (var j = 0; j < this.jsonKeys.length; j++) {
        if (j === this.jsonKeys.length - 1) {
          this.templine += "\n      <td class=\"lastTd\"\n        data-row=\"".concat(numberOfRow, "\"\n        data-element_number=\"").concat(data[numberOfRow].elementNumber, "\"}\">\n          ").concat(data[numberOfRow][this.jsonKeys[j]], "\n          <div class=\"wrapForEditAndDelButtons\">\n            <button type=\"button\" data-action=\"showInputsRow\" class=\"pen editCancelButtonsGeneral\"></button>\n            <button type=\"button\" data-action=\"deleteRow\" class=\"deleteRowButton editCancelButtonsGeneral\"></button>\n          </div>\n      </td>");
        } else {
          this.templine += "\n        <td\n          data-row=\"".concat(numberOfRow, "\"\n          data-elementNumber=\"").concat(data[numberOfRow].elementNumber, "\">\n          ").concat(data[numberOfRow][this.jsonKeys[j]], "\n        </td>");
        }
      }

      return "<tr>".concat(this.templine, "</tr>");
    } /////////////////////Deleting the row //////////////////////

  }, {
    key: "deleteRow",
    value: function deleteRow(event) {
      this.rowAttribute = event.target.closest("td").getAttribute("data-row");
      this.elementNumber = event.target.closest("td").getAttribute("data-element_number");

      if (this.elementNumber !== "undefined") {
        this.tempNumbersOfElementsToDelete.push(Number(this.elementNumber));
        this.sortData.splice(this.rowAttribute, 1);
        this.renderSortedData(this.sortData);
      } else {
        this.data.splice(this.rowAttribute, 1);
        this.renderJSON(this.data);
      }

      this.isFormToEditDataOpen = false;
      this.element.classList.remove("editModeOn");
    } /////////////////////Adding new row //////////////////////

  }, {
    key: "addOneRow",
    value: function addOneRow() {
      this.element.classList.remove("editModeOn");

      if (this.data) {
        this.data.push({});
        var dataLength = this.data.length;

        for (var i = 0; i < this.jsonKeys.length; i++) {
          this.data[dataLength - 1][this.jsonKeys[i]] = "...click edit button...";
        }

        this.renderJSON(this.data);
      } else alert("download file first");
    }
  }, {
    key: "renderSortedData",
    value: function renderSortedData(data) {
      var tableBody = this.element.querySelector("tbody");

      while (tableBody.children.length > 1) {
        tableBody.removeChild(tableBody.lastChild);
      }

      var sortedRowsForAddingToTable = "";

      for (var i = 0; i < data.length; i++) {
        sortedRowsForAddingToTable += this.createRoW(i, data);
      }

      tableBody.insertAdjacentHTML("beforeEnd", sortedRowsForAddingToTable);
    }
  }, {
    key: "sortTableByEnteringSymbols",
    value: function sortTableByEnteringSymbols(e) {
      var colAttribute = e.target.closest("input").getAttribute("data-col");
      var inputValue = e.target.value;
      this.sortData = this.data.map(function (e) {
        return Object.assign({}, e);
      }).filter(function (element, index) {
        if (element[colAttribute].toLowerCase().startsWith(inputValue.toLowerCase())) {
          element.elementNumber = index;
          return element;
        }
      });
      this.renderSortedData(this.sortData);
    }
  }, {
    key: "deletingItemsFromData",
    value: function deletingItemsFromData() {
      if (this.tempNumbersOfElementsToDelete.length) {
        this.tempNumbersOfElementsToDelete.sort(function (a, b) {
          return b - a;
        });

        for (var i = 0; i < this.tempNumbersOfElementsToDelete.length; i++) {
          this.data.splice(this.tempNumbersOfElementsToDelete[i], 1);
        }

        this.tempNumbersOfElementsToDelete = [];
      }
    }
  }, {
    key: "sortAllTable",
    value: function sortAllTable(event) {
      this.deletingItemsFromData();
      this.elementNumber = undefined;
      var iElement = event.target.closest("i");
      var colAttribute = iElement.getAttribute("data-col");
      var typeOfCol = "number";

      for (var i = 0; i < this.data.length; i++) {
        var elementForTypeChecking = this.data[i][colAttribute];

        if (isNaN(elementForTypeChecking)) {
          typeOfCol = "string";
        }
      }

      if (!iElement.classList.contains("rotated")) {
        if (typeOfCol === "number") {
          this.data.sort(function (a, b) {
            return Number(a[colAttribute]) - Number(b[colAttribute]);
          });
        } else {
          this.data.sort(function (a, b) {
            var nA = a[colAttribute];
            var nB = b[colAttribute];
            if (nA < nB) return -1;else if (nA > nB) return 1;
            return 0;
          });
        } ////////////////////


        this.renderSortedData(this.data); /////////////////

        this.element.querySelectorAll("[data-col=\"".concat(colAttribute, "\"]"))[0].classList.add("rotated");
      } else {
        if (typeOfCol === "number") {
          this.data.sort(function (a, b) {
            return Number(b[colAttribute]) - Number(a[colAttribute]);
          });
        } else {
          this.data.sort(function (a, b) {
            var nA = a[colAttribute];
            var nB = b[colAttribute];
            if (nA > nB) return -1;else if (nA < nB) return 1;
            return 0;
          });
        }

        this.renderSortedData(this.data); // this.sortData = this.data;

        this.element.querySelectorAll("[data-col=\"".concat(colAttribute, "\"]"))[0].classList.remove("rotated");
      }
    }
  }, {
    key: "saveAsJSON",
    value: function saveAsJSON() {
      this.deletingItemsFromData();

      if (this.data) {
        var text = JSON.stringify(this.data);
        var a = document.createElement("a");
        a.href = "data:attachment/text," + encodeURI(text);
        a.target = "_blank";
        a.download = "filename.json";
        a.click();
      } else alert("Сначала загрузите таблицу");
    } ///////////////////// reset //////////////////////

  }]);

  return Table;
}();