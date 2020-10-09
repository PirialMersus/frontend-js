this.mainFormTable.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();

  this.onClickSaveInFormEditRow(this.rowAttribute, inputsValues);
});

this.mainFormTable.addEventListener("reset", (e) => {
  e.preventDefault();
  e.stopPropagation();

  this.onClickResetInFormEditRow();
});



onClickSaveInFormEditRow() {
    const inputs = document.getElementsByClassName("inputFormEdit");
    const inputsValues = [];
    for (let i = 0; i < inputs.length; i++) {
      inputsValues[i] = inputs[i].value;
    }
    console.log("saveRow");
    for (let i = 0; i < values.length; i++) {
      this.data[this.rowAttribute][this.jsonKeys[i]] = values[i];
    }
    this.renderJSON(this.data);
    this.isFormToEditDataOpen = false;
  }

  onClickResetInFormEditRow() {
    this.selectedRow.innerHTML = this.selectedRowBeforChangingData;
    this.isFormToEditDataOpen = false;
    this.selectedRow.classList.remove("active");
  }





  
  

   ///////////////////// Edit and saving row data //////////////////////

 onClickSaveInFormEditRow(rowAttr, values) {
    console.log("saveRow");
    for (let i = 0; i < values.length; i++) {
      this.data[rowAttr][this.jsonKeys[i]] = values[i];
    }
    this.renderJSON(this.data);
    this.isFormToEditDataOpen = false;
  }
  
  ///////////////////// Cancelling editing row data //////////////////////
  
  onClickResetInFormEditRow() {
    this.selectedRow.innerHTML = this.selectedRowBeforChangingData;
    this.isFormToEditDataOpen = false;
    this.selectedRow.classList.remove("active");
  }