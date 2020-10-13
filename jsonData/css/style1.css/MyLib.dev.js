"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

////////////////////////////////////// calsalsdkjalkdsajk//////////////////////////////////
var MyLib =
/*#__PURE__*/
function () {
  function MyLib(elem) {
    _classCallCheck(this, MyLib);

    this._elem = elem;
    document.getElementById("formForEnterJSONFile").onclick = this.findClick.bind(this);
    this.input = document.getElementById("inputFile");
  }

  _createClass(MyLib, [{
    key: "findClick",
    value: function findClick(event) {
      var action = event.target.dataset.action;

      if (action) {
        this[action](event);
      }
    }
  }, {
    key: "createAndRenderNewTable",
    value: function createAndRenderNewTable(data, newTable) {
      new Table({
        data: data,
        newTable: newTable
      });
    }
  }, {
    key: "downloadingJSONFile",
    value: function downloadingJSONFile() {
      var _this = this;

      var file = this.input.files[0];
      var reader = new FileReader();

      reader.onload = function () {
        var data = JSON.parse(reader.result);
        var newTable = document.createElement("div");
        newTable.className = "tableWrapper";

        _this._elem.append(newTable);

        _this.createAndRenderNewTable(data, newTable);
      };

      reader.readAsText(file);
    }
  }]);

  return MyLib;
}();

new MyLib(wrapper);