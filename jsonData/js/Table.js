class Table {
  constructor(options) {
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
  }

  findClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      console.log(action);
      this[action](event);
    }
  }

  ///////////////////// Edit and saving row data //////////////////////

  onClickSaveInFormEditRow() {
    const inputs = this.element.getElementsByClassName("inputFormEdit");

    for (let i = 0; i < this.jsonKeys.length; i++) {
      this.data[this.rowAttribute][this.jsonKeys[i]] = inputs[i].value;
    }

    this.renderJSON(this.data);
    this.isFormToEditDataOpen = false;
    this.element.classList.remove("editModeOn");
  }

  ///////////////////// Cancelling editing row data //////////////////////

  onClickResetInFormEditRow(e) {
    e.preventDefault();
    this.selectedRow.innerHTML = this.createRoW(this.rowAttribute, this.data);
    this.isFormToEditDataOpen = false;
    this.selectedRow.classList.remove("active");
    this.element.classList.remove("editModeOn");
  }

  showInputsRow(event) {
    if (this.isFormToEditDataOpen) {
      return;
    }
    this.element.classList.add("editModeOn");
    this.isFormToEditDataOpen = true;

    const td = event.target.closest("td");
    this.rowAttribute = td.getAttribute("data-row");
    this.selectedRow = td.parentNode;

    const row = this.createInputsRow(this.rowAttribute);

    this.selectedRow.classList.add("active");
    this.selectedRow.innerHTML = row;
  }

  createInputsRow(rowAttribute) {
    let row = "";
    for (let j = 0; j < this.jsonKeys.length; j++) {
      if (j === this.jsonKeys.length - 1) {
        row += `
              <td><input name="${
                this.jsonKeys[j]
              }" class="inputFormEdit" value="${
          this.data[rowAttribute][this.jsonKeys[j]]
        }"/>
                <div class="wrapperButtons">
                  <button data-action="onClickSaveInFormEditRow" type="submit" class="iconsGeneralRulls saveIcon"></button>
                  <button data-action="onClickResetInFormEditRow" type="reset" class="iconsGeneralRulls cancelIcon"></button>
                </div>
              </td>`;
      } else {
        row += `<td><input
                      name="${this.jsonKeys[j]}"
                      class="inputFormEdit"
                      value="${this.data[rowAttribute][this.jsonKeys[j]]}"/>
                </td>`;
      }
      // this.numberOfCols = j;
    }
    return row;
  }

  ///////////////////// Render Data to Dom //////////////////////

  renderJSON(data) {
    let tableHeader = "";
    let tableRows = "";

    const buttonsForRender = `
      <button class="classForEditingButtons2" data-action="addOneRow">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Add a new row
      </button>
      <button class="classForEditingButtons2" data-action="saveAsJSON">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        save as JSON
      </button>
    `;

    for (let j = 0; j < this.jsonKeys.length; j++) {
      tableHeader += `<th>${this.jsonKeys[j]}</th>`;
    }

    for (let i = 0; i < data.length; i++) {
      tableRows += this.createRoW(i, data);
    }

    this.element.innerHTML = `
      <form class="formToWrapTable" action="#">
        <table
                border="1"
                class="dataTable">
          <caption>
            Данные из файла
          </caption>
          <tr>${tableHeader}</tr>
           ${tableRows}
          </table>
      </form>
      ${buttonsForRender}`;

    this.element
      .getElementsByClassName("formToWrapTable")[0]
      .addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.onClickSaveInFormEditRow();
      });
    this.element
      .getElementsByClassName("formToWrapTable")[0]
      .addEventListener("reset", (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.onClickResetInFormEditRow();
      });
  }

  /////////////////////Deleting the row //////////////////////

  createRoW(i, data) {
    this.templine = "";
    for (let j = 0; j < this.jsonKeys.length; j++) {
      if (j === this.jsonKeys.length - 1) {
        this.templine += `
      <td class="lastTd" data-row="${i}"}">
        ${data[i][this.jsonKeys[j]]}
        <div class="wrapForEditAndDelButtons">
            <button type="button" data-action="showInputsRow" class="pen editCancelButtonsGeneral"></button>
            <button type="button" data-action="deleteRow" class="deleteRowButton editCancelButtonsGeneral"></button>
        </div>
      </td>`;
      } else {
        this.templine += `<td data-row="${i}">${
          data[i][this.jsonKeys[j]]
        }</td>`;
      }
    }
    return `<tr>${this.templine}</tr>`;
  }

  /////////////////////Deleting the row //////////////////////

  deleteRow(event) {
    this.data.splice(event.target.closest("td").getAttribute("data-row"), 1);
    this.renderJSON(this.data);
    this.isFormToEditDataOpen = false;
    this.element.classList.remove("editModeOn");
  }

  /////////////////////Adding new row //////////////////////

  addOneRow() {
    this.element.classList.remove("editModeOn");
    if (this.data) {
      this.data.push({});
      const dataLength = this.data.length;
      for (let i = 0; i < this.jsonKeys.length; i++) {
        this.data[dataLength - 1][this.jsonKeys[i]] = "...click edit button...";
      }
      this.renderJSON(this.data);
    } else alert("download file first");
  }

  ///////////////////// reset //////////////////////
}
