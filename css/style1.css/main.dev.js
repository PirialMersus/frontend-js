"use strict";

var _this = void 0;

(void 0).mainFormTable.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  _this.onClickSaveInFormEditRow(_this.rowAttribute, inputsValues);
});
(void 0).mainFormTable.addEventListener("reset", function (e) {
  e.preventDefault();
  e.stopPropagation();

  _this.onClickResetInFormEditRow();
});