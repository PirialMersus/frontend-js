"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// function Table(options) {
//   this.element = options.newTable;
//     this.element.onclick = this.findClick.bind(this);
//     this.data = options.data;
//     this.jsonKeys = Object.keys(options.data[0]);
//     this.renderJSON(options.data);
//     this.isFormToEditDataOpen = false;
//     this.selectedRow = "";
//     this.rowAttribute = "";
//     this.sortData = [];
//     this.tempNumbersOfElementsToDelete = [];
// };
// Table.prototype.qwe = function(event, el) {
//   let action;
//   if (el) {
//     action = el.dataset.action;
//   } else {
//     action = event.target.dataset.action;
//   }
//   if (action) {
//     this[action](event);
//   } else {
//     // find paren node
//     findClick(null /* parent node */);
//   }
// }
var Table =
/*#__PURE__*/
function () {
  function Table(options) {
    var _this = this;

    _classCallCheck(this, Table);

    this.element = options.newTable;
    this.element.onclick = this.findClick.bind(this);
    this.data = options.data;
    this.jsonKeys = Object.keys(options.data[0]);
    this.renderJSON(options.data);
    this.isFormToEditDataOpen = false;
    this.selectedRow = "";
    this.rowAttribute = "";
    this.sortData = [];
    this.tempNumbersOfElementsToDelete = [];
    this.table = this.element.querySelector("table");
    this.tableBody = this.element.querySelector("tbody");
    this.element.getElementsByClassName("formToWrapTable")[0].addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("submit");

      _this.onClickSaveInFormEditRow();
    });
    this.element.getElementsByClassName("formToWrapTable")[0].addEventListener("reset", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("reset");

      _this.onClickResetInFormEditRow();
    });
  }

  _createClass(Table, [{
    key: "findClick",
    value: function findClick(event, el) {
      var action; // if (el) {
      //   action = el.dataset.action;
      // } else {
      //   action = event.target.dataset.action;
      // }
      // if (action) {
      //   this[action](event);
      // }

      /* else {
        // find parent node
        findClick(null, event.target.parentNode);
      } */

      if (event.target.closest("[data-action]")) {
        action = event.target.closest("[data-action]").dataset.action;
        this[action](event);
      } // debugger;

    } ///////////////////// Edit and saving row data //////////////////////

  }, {
    key: "onClickSaveInFormEditRow",
    value: function onClickSaveInFormEditRow() {
      var inputs = this.element.getElementsByClassName("inputFormEdit");

      if (this.elementNumber !== "notSorted") {
        for (var i = 0; i < this.jsonKeys.length; i++) {
          this.data[Number(this.elementNumber)][this.jsonKeys[i]] = inputs[i].value;
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

    /**
     * JS docs
     * @param {Event} e Ивент кнопки
     */

  }, {
    key: "onClickResetInFormEditRow",
    value: function onClickResetInFormEditRow(e) {
      e.preventDefault();

      if (this.elementNumber !== "notSorted") {
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
      var elementNumber;
      var td = event.target.closest("td");
      this.rowAttribute = td.getAttribute("data-row");
      this.elementNumber = td.getAttribute("data-elementnumber");
      this.selectedRow = td.parentNode;
      this.selectedRow.classList.add("active");

      if (this.elementNumber === "notSorted") {
        elementNumber = Number(this.rowAttribute);
      } else {
        elementNumber = Number(this.elementNumber);
      }

      this.selectedRow.innerHTML = this.createInputsRow(elementNumber);
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
      var _this2 = this;

      this.elementNumber = "notSorted";
      var tableHeader = "";
      var tableRows = "";
      var buttonsForRender = "\n      <button class=\"classForEditingButtons2\" data-action=\"addOneRow\">\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n        Add a new row\n      </button>\n      <button class=\"classForEditingButtons2\" data-action=\"saveAsJSON\">\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n        save as JSON\n      </button>\n    ";

      for (var j = 0; j < this.jsonKeys.length; j++) {
        tableHeader += "<th>".concat(this.jsonKeys[j], "\n      <br>\n        <button class=\"sortIconBtn\" type=\"button\" data-tooltip=\"Sort\">\n          <i\n            data-action=\"sortAllTable\"\n            data-col=\"").concat(this.jsonKeys[j], "\"\n            class=\"fas fa-caret-square-down\">\n          </i>\n        </button>\n        <input\n        data-col=\"").concat(this.jsonKeys[j], "\"\n        placeholder=\"Enter some text\"\n        />\n      </th>");
      }

      for (var i = 0; i < data.length; i++) {
        tableRows += this.createRoW(i, data);
      }

      this.element.innerHTML = "\n      <form class=\"formToWrapTable\" action=\"#\">\n        <table\n                border=\"1\"\n                class=\"dataTable\">\n          <caption>\n            \u0414\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 \u0444\u0430\u0439\u043B\u0430\n          </caption>\n          <tr>".concat(tableHeader, "</tr>\n           ").concat(tableRows, "\n          </table>\n      </form>\n      ").concat(buttonsForRender);
      this.inputs = this.element.querySelectorAll("input");
      this.inputs.forEach(function (element) {
        element.addEventListener("blur", function () {
          element.value = "";
        });
        element.addEventListener("input", _this2.sortTableByEnteringSymbols.bind(_this2));
      });
    } /////////////////////Creating the row //////////////////////

  }, {
    key: "createRoW",
    value: function createRoW(numberOfRow, data) {
      this.templine = "";

      for (var j = 0; j < this.jsonKeys.length; j++) {
        if (j === this.jsonKeys.length - 1) {
          this.templine += "\n      <td class=\"lastTd\"\n        data-row=\"".concat(numberOfRow, "\"\n        data-elementnumber=\"").concat(data[numberOfRow].elementNumber ? data[numberOfRow].elementNumber : "notSorted", "\">\n          ").concat(data[numberOfRow][this.jsonKeys[j]], "\n          <div class=\"wrapForEditAndDelButtons\">\n            <button type=\"button\" data-action=\"showInputsRow\" class=\"pen editCancelButtonsGeneral\"></button>\n            <button type=\"button\" data-action=\"deleteRow\" class=\"deleteRowButton editCancelButtonsGeneral\"></button>\n          </div>\n      </td>");
        } else {
          this.templine += "\n        <td\n          data-row=\"".concat(numberOfRow, "\"\n          data-elementNumber=\"").concat(data[numberOfRow].elementNumber ? data[numberOfRow].elementNumber : "notSorted", "\">\n          ").concat(data[numberOfRow][this.jsonKeys[j]], "\n        </td>");
        }
      }

      return "<tr>".concat(this.templine, "</tr>");
    } /////////////////////Deleting the row //////////////////////

  }, {
    key: "deleteRow",
    value: function deleteRow(event) {
      this.rowAttribute = event.target.closest("td").getAttribute("data-row");
      this.elementNumber = event.target.closest("td").getAttribute("data-elementnumber"); // FIXME: иправить!!!

      if (this.elementNumber !== "notSorted") {
        this.tempNumbersOfElementsToDelete.push(Number(this.elementNumber));
        this.sortData.splice(this.rowAttribute, 1);
        this.renderSortedData(this.sortData);
      } else {
        this.data.splice(this.rowAttribute, 1);
        this.renderSortedData(this.data);
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

        this.renderSortedData(this.data);
      } else alert("download file first");
    }
  }, {
    key: "renderSortedData",
    value: function renderSortedData(data) {
      var tableBody = this.tableBody;

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
      this.deletingItemsFromData();
      var colAttribute = e.target.closest("input").getAttribute("data-col");
      var inputValue = e.target.value;
      this.sortData = this.data.map(function (e) {
        return Object.assign({}, e);
      }).filter(function (element, index) {
        if (String(element[colAttribute]).toLowerCase().includes(inputValue.toLowerCase())) {
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
      this.elementNumber = "notSorted";
      var iElement = event.target.closest("i");
      var colAttribute = iElement.getAttribute("data-col");
      var wasSortDataChangedByThisMethod = false;

      if (!this.sortData.length) {
        this.sortData = this.data.map(function (e) {
          return Object.assign({}, e);
        });
        wasSortDataChangedByThisMethod = true;
      }

      var typeOfCol = "number";

      for (var i = 0; i < this.sortData.length; i++) {
        var elementForTypeChecking = this.sortData[i][colAttribute];

        if (isNaN(elementForTypeChecking)) {
          typeOfCol = "string";
        }
      }

      if (!iElement.classList.contains("rotated")) {
        if (typeOfCol === "number") {
          this.sortData.sort(function (a, b) {
            return Number(a[colAttribute]) - Number(b[colAttribute]);
          });
        } else {
          this.sortData.sort(function (a, b) {
            var nA = String(a[colAttribute]);
            var nB = String(b[colAttribute]);
            if (nA < nB) return -1;else if (nA > nB) return 1;
            return 0;
          });
        } ////////////////////


        this.renderSortedData(this.sortData); /////////////////

        this.element.querySelectorAll("[data-col=\"".concat(colAttribute, "\"]"))[0].classList.add("rotated");
      } else {
        if (typeOfCol === "number") {
          this.sortData.sort(function (a, b) {
            return Number(b[colAttribute]) - Number(a[colAttribute]);
          });
        } else {
          this.sortData.sort(function (a, b) {
            var nA = a[colAttribute];
            var nB = b[colAttribute];
            if (nA > nB) return -1;else if (nA < nB) return 1;
            return 0;
          });
        }

        this.renderSortedData(this.sortData);
        this.element.querySelectorAll("[data-col=\"".concat(colAttribute, "\"]"))[0].classList.remove("rotated");
      }

      if (wasSortDataChangedByThisMethod) {
        this.sortData.length = 0;
      }

      console.log(this.data);
      console.log(this.sortData);
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
    } ///////////////////// autoheight //////////////////////

  }, {
    key: "drawinAnInfiniteList",
    value: function drawinAnInfiniteList() {
      var _this3 = this;

      //CHANGE THESE IF YOU WANT
      var hideScrollBar = true;
      var table = this.table;
      var numberOfItems = this.data.length; //

      var view = null; //get the height of a single item

      var itemHeight = function () {
        //generate a fake item
        var tempRow = _this3.createRoW(0, _this3.data);

        _this3.tableBody.appendChild(tempRow); //get its height and remove it


        var output = tempRow.offsetHeight;

        _this3.tableBody.removeChild(tempRow);

        return output;
      }(); //displays a suitable number of items


      function refreshWindow() {
        //remove old view
        if (view !== null) this.table.removeChild(view); //create new view

        view = this.table.appendChild(document.createElement("div"));
        var firstItem = Math.floor(table.scrollTop / itemHeight);
        var lastItem = firstItem + Math.ceil(table.offsetHeight / itemHeight) + 1;
        if (lastItem + 1 >= items.length) lastItem = items.length - 1; //position view in users face

        view.id = "view";
        view.style.top = firstItem * itemHeight + "px";
        var div; //add the items

        for (var index = firstItem; index <= lastItem; ++index) {
          div = document.createElement("div");
          div.innerHTML = items[index];
          div.className = "listItem";
          view.appendChild(div);
        }

        console.log("viewing items " + firstItem + " to " + lastItem);
      }

      refreshWindow();
      document.getElementById("heightForcer").style.height = items.length * itemHeight + "px";

      if (hideScrollBar) {
        //work around for non-chrome browsers, hides the scrollbar
        table.style.width = table.offsetWidth * 2 - view.offsetWidth + "px";
      }

      function delayingHandler() {
        //wait for the scroll to finish
        setTimeout(refreshWindow, 10);
      }

      if (table.addEventListener) table.addEventListener("scroll", delayingHandler, false);else table.attachEvent("onscroll", delayingHandler);
    }
  }]);

  return Table;
}();