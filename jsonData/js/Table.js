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
    this.sortData = [];
    this.arrayOfSortedItems = [];
    this.tempNumbersOfElementsToDelete = [];
  }

  findClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action](event);
    }
  }

  ///////////////////// Edit and saving row data //////////////////////

  onClickSaveInFormEditRow() {
    const inputs = this.element.getElementsByClassName("inputFormEdit");
    if (this.elementNumber !== "undefined") {
      for (let i = 0; i < this.jsonKeys.length; i++) {
        this.data[this.elementNumber][this.jsonKeys[i]] = inputs[i].value;
        this.sortData[this.rowAttribute][this.jsonKeys[i]] = inputs[i].value;
      }
      this.renderSortedData(this.sortData);
    } else {
      for (let i = 0; i < this.jsonKeys.length; i++) {
        this.data[this.rowAttribute][this.jsonKeys[i]] = inputs[i].value;
      }
      this.renderJSON(this.data);
    }
    this.isFormToEditDataOpen = false;
    this.element.classList.remove("editModeOn");
  }

  ///////////////////// Cancelling editing row data //////////////////////

  onClickResetInFormEditRow(e) {
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

  showInputsRow(event) {
    if (this.isFormToEditDataOpen) {
      return;
    }
    this.element.classList.add("editModeOn");
    this.isFormToEditDataOpen = true;

    const td = event.target.closest("td");
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
    }
    return row;
  }

  ///////////////////// Render Data to Dom //////////////////////

  renderJSON(data) {
    this.elementNumber = undefined;

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
      tableHeader += `<th>${this.jsonKeys[j]}
        <div class="sortIconDiv" data-tooltip="Sort">
          <i
            data-action="sortAllTable"
            data-col="${this.jsonKeys[j]}"
            class="fas fa-caret-square-down">
          </i>
        </div>
        <input
        data-col="${this.jsonKeys[j]}"
        placeholder="Enter some text"
        />
      </th>`;
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

    this.inputs = this.element.querySelectorAll("input");
    this.inputs.forEach((element) => {
      element.addEventListener("blur", () => {
        element.value = "";
      });
      element.addEventListener(
        "input",
        this.sortTableByEnteringSymbols.bind(this)
      );
    });
  }

  /////////////////////Deleting the row //////////////////////

  createRoW(numberOfRow, data) {
    this.templine = "";
    for (let j = 0; j < this.jsonKeys.length; j++) {
      if (j === this.jsonKeys.length - 1) {
        this.templine += `
      <td class="lastTd"
        data-row="${numberOfRow}"
        data-element_number="${data[numberOfRow].elementNumber}"}">
          ${data[numberOfRow][this.jsonKeys[j]]}
          <div class="wrapForEditAndDelButtons">
            <button type="button" data-action="showInputsRow" class="pen editCancelButtonsGeneral"></button>
            <button type="button" data-action="deleteRow" class="deleteRowButton editCancelButtonsGeneral"></button>
          </div>
      </td>`;
      } else {
        this.templine += `
        <td
          data-row="${numberOfRow}"
          data-elementNumber="${data[numberOfRow].elementNumber}">
          ${data[numberOfRow][this.jsonKeys[j]]}
        </td>`;
      }
    }
    return `<tr>${this.templine}</tr>`;
  }

  /////////////////////Deleting the row //////////////////////

  deleteRow(event) {
    this.rowAttribute = event.target.closest("td").getAttribute("data-row");
    this.elementNumber = event.target
      .closest("td")
      .getAttribute("data-element_number");
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

  renderSortedData(data) {
    const tableBody = this.element.querySelector("tbody");

    while (tableBody.children.length > 1) {
      tableBody.removeChild(tableBody.lastChild);
    }
    let sortedRowsForAddingToTable = "";
    for (let i = 0; i < data.length; i++) {
      sortedRowsForAddingToTable += this.createRoW(i, data);
    }
    tableBody.insertAdjacentHTML("beforeEnd", sortedRowsForAddingToTable);
  }

  sortTableByEnteringSymbols(e) {
    const colAttribute = e.target.closest("input").getAttribute("data-col");
    let inputValue = e.target.value;

    this.sortData = this.data
      .map((e) => Object.assign({}, e))
      .filter((element, index) => {
        if (
          element[colAttribute]
            .toLowerCase()
            .startsWith(inputValue.toLowerCase())
        ) {
          element.elementNumber = index;
          return element;
        }
      });

    this.renderSortedData(this.sortData);
  }

  deletingItemsFromData() {
    if (this.tempNumbersOfElementsToDelete.length) {
      this.tempNumbersOfElementsToDelete.sort(function (a, b) {
        return b - a;
      });
      for (let i = 0; i < this.tempNumbersOfElementsToDelete.length; i++) {
        this.data.splice(this.tempNumbersOfElementsToDelete[i], 1);
      }
      this.tempNumbersOfElementsToDelete = [];
    }
  }

  sortAllTable(event) {
    this.deletingItemsFromData();
    this.elementNumber = undefined;

    const iElement = event.target.closest("i");
    const colAttribute = iElement.getAttribute("data-col");

    let typeOfCol = "number";
    for (let i = 0; i < this.data.length; i++) {
      const elementForTypeChecking = this.data[i][colAttribute];
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
          let nA = a[colAttribute];
          let nB = b[colAttribute];
          if (nA < nB) return -1;
          else if (nA > nB) return 1;
          return 0;
        });
      }
      ////////////////////
      this.renderSortedData(this.data);
      /////////////////
      this.element
        .querySelectorAll(`[data-col="${colAttribute}"]`)[0]
        .classList.add("rotated");
    } else {
      if (typeOfCol === "number") {
        this.data.sort(function (a, b) {
          return Number(b[colAttribute]) - Number(a[colAttribute]);
        });
      } else {
        this.data.sort(function (a, b) {
          let nA = a[colAttribute];
          let nB = b[colAttribute];
          if (nA > nB) return -1;
          else if (nA < nB) return 1;
          return 0;
        });
      }

      this.renderSortedData(this.data);
      // this.sortData = this.data;

      this.element
        .querySelectorAll(`[data-col="${colAttribute}"]`)[0]
        .classList.remove("rotated");
    }
  }

  saveAsJSON() {
    this.deletingItemsFromData();

    if (this.data) {
      const text = JSON.stringify(this.data);
      let a = document.createElement("a");

      a.href = "data:attachment/text," + encodeURI(text);
      a.target = "_blank";
      a.download = "filename.json";
      a.click();
    } else alert("Сначала загрузите таблицу");
  }

  ///////////////////// reset //////////////////////
}
