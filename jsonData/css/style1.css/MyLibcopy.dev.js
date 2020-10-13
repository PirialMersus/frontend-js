"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

////////////////////////////////////// calsalsdkjalkdsajk//////////////////////////////////
var Tables =
/*#__PURE__*/
function () {
  function Tables(elem) {
    _classCallCheck(this, Tables);

    this._elem = elem;
    elem.onclick = this.findClick.bind(this);
    this.input = document.getElementById("inputFile");
  }

  _createClass(Tables, [{
    key: "findClick",
    value: function findClick(event) {
      var action = event.target.dataset.action;

      if (action) {
        this[action](event);
      }
    }
  }, {
    key: "createAndRenderNewClass",
    value: function createAndRenderNewClass(wrapper, data, elem) {
      var myLib_1 = new MyLib({
        wrapper: wrapper,
        data: data,
        elem: elem
      });
      myLib_1.renderJSON(data);
    }
  }, {
    key: "downloadingJSONFile",
    value: function downloadingJSONFile() {
      var _this = this;

      console.log(this.input.files);
      var file = this.input.files[0];
      var reader = new FileReader();

      reader.onload = function () {
        var data = JSON.parse(reader.result);
        _this.data = data;
        var elem = _this._elem;

        _this.createAndRenderNewClass(wrapper, data, elem);
      };

      this.isFileDownloaded = true;
      reader.readAsText(file);
    }
  }, {
    key: "onClickSaveInFormEditRow",
    value: function onClickSaveInFormEditRow() {
      myLib_1.onClickSaveInFormEditRow().bind(createAndRenderNewClass);
    }
  }, {
    key: "onClickResetInFormEditRow",
    value: function onClickResetInFormEditRow() {
      myLib_1.onClickResetInFormEditRow().bind(createAndRenderNewClass);
    }
  }, {
    key: "editRow",
    value: function editRow() {
      myLib_1.editRow().bind(createAndRenderNewClass);
    }
  }, {
    key: "saveAsJSON",
    value: function saveAsJSON() {
      myLib_1.saveAsJSON().bind(createAndRenderNewClass);
    }
  }, {
    key: "deleteRow",
    value: function deleteRow() {
      myLib_1.deleteRow().bind(createAndRenderNewClass);
    }
  }, {
    key: "addOneRow",
    value: function addOneRow() {
      myLib_1.addOneRow().bind(createAndRenderNewClass);
    }
  }]);

  return Tables;
}(); // function MyLib(options) {
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


new Tables(wrapper);