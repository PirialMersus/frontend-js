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

class Table {
  constructor(options) {
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

    this.element
      .getElementsByClassName("formToWrapTable")[0]
      .addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log("submit");

        this.onClickSaveInFormEditRow();
      });

    this.element
      .getElementsByClassName("formToWrapTable")[0]
      .addEventListener("reset", (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log("reset");

        this.onClickResetInFormEditRow();
      });
  }

  findClick(event, el) {
    let action;

    // if (el) {
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
    }
    // debugger;
  }

  ///////////////////// Edit and saving row data //////////////////////

  onClickSaveInFormEditRow() {
    const inputs = this.element.getElementsByClassName("inputFormEdit");
    if (this.elementNumber !== "notSorted") {
      for (let i = 0; i < this.jsonKeys.length; i++) {
        this.data[Number(this.elementNumber)][this.jsonKeys[i]] =
          inputs[i].value;

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

  /**
   * JS docs
   * @param {Event} e Ивент кнопки
   */
  onClickResetInFormEditRow(e) {
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

  showInputsRow(event) {
    if (this.isFormToEditDataOpen) {
      return;
    }
    this.element.classList.add("editModeOn");
    this.isFormToEditDataOpen = true;
    let elementNumber;

    const td = event.target.closest("td");
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
    this.elementNumber = "notSorted";

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
      <br>
        <button class="sortIconBtn" type="button" data-tooltip="Sort">
          <i
            data-action="sortAllTable"
            data-col="${this.jsonKeys[j]}"
            class="fas fa-caret-square-down">
          </i>
        </button>
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

  /////////////////////Creating the row //////////////////////

  createRoW(numberOfRow, data) {
    this.templine = "";
    for (let j = 0; j < this.jsonKeys.length; j++) {
      if (j === this.jsonKeys.length - 1) {
        this.templine += `
      <td class="lastTd"
        data-row="${numberOfRow}"
        data-elementnumber="${
          data[numberOfRow].elementNumber
            ? data[numberOfRow].elementNumber
            : "notSorted"
        }">
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
          data-elementNumber="${
            data[numberOfRow].elementNumber
              ? data[numberOfRow].elementNumber
              : "notSorted"
          }">
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
      .getAttribute("data-elementnumber");

    // FIXME: иправить!!!
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
      this.renderSortedData(this.data);
    } else alert("download file first");
  }

  renderSortedData(data) {
    const tableBody = this.tableBody;

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
    this.deletingItemsFromData();
    const colAttribute = e.target.closest("input").getAttribute("data-col");
    let inputValue = e.target.value;
    this.sortData = this.data
      .map((e) => Object.assign({}, e))
      .filter((element, index) => {
        if (
          String(element[colAttribute])
            .toLowerCase()
            .includes(inputValue.toLowerCase())
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
    this.elementNumber = "notSorted";

    const iElement = event.target.closest("i");
    const colAttribute = iElement.getAttribute("data-col");
    let wasSortDataChangedByThisMethod = false;

    if (!this.sortData.length) {
      this.sortData = this.data.map((e) => Object.assign({}, e));
      wasSortDataChangedByThisMethod = true;
    }

    let typeOfCol = "number";
    for (let i = 0; i < this.sortData.length; i++) {
      const elementForTypeChecking = this.sortData[i][colAttribute];
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
          let nA = String(a[colAttribute]);
          let nB = String(b[colAttribute]);
          if (nA < nB) return -1;
          else if (nA > nB) return 1;
          return 0;
        });
      }
      ////////////////////
      this.renderSortedData(this.sortData);
      /////////////////
      this.element
        .querySelectorAll(`[data-col="${colAttribute}"]`)[0]
        .classList.add("rotated");
    } else {
      if (typeOfCol === "number") {
        this.sortData.sort(function (a, b) {
          return Number(b[colAttribute]) - Number(a[colAttribute]);
        });
      } else {
        this.sortData.sort(function (a, b) {
          let nA = a[colAttribute];
          let nB = b[colAttribute];
          if (nA > nB) return -1;
          else if (nA < nB) return 1;
          return 0;
        });
      }

      this.renderSortedData(this.sortData);

      this.element
        .querySelectorAll(`[data-col="${colAttribute}"]`)[0]
        .classList.remove("rotated");
    }

    if (wasSortDataChangedByThisMethod) {
      this.sortData.length = 0;
    }

    console.log(this.data);
    console.log(this.sortData);
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

  ///////////////////// autoheight //////////////////////
  drawinAnInfiniteList() {
    //CHANGE THESE IF YOU WANT
    let hideScrollBar = true;
    const table = this.table;
    let numberOfItems = this.data.length;
    //

    let view = null;

    //get the height of a single item
    const itemHeight = (() => {
      //generate a fake item
      const tempRow = this.createRoW(0, this.data);
      this.tableBody.appendChild(tempRow);

      //get its height and remove it
      const output = tempRow.offsetHeight;
      this.tableBody.removeChild(tempRow);
      return output;
    })();

    //displays a suitable number of items
    function refreshWindow() {
      //remove old view
      if (view !== null) this.table.removeChild(view);
      //create new view
      view = this.table.appendChild(document.createElement("div"));

      let firstItem = Math.floor(table.scrollTop / itemHeight);
      let lastItem = firstItem + Math.ceil(table.offsetHeight / itemHeight) + 1;
      if (lastItem + 1 >= items.length) lastItem = items.length - 1;

      //position view in users face
      view.id = "view";
      view.style.top = firstItem * itemHeight + "px";

      let div;
      //add the items
      for (let index = firstItem; index <= lastItem; ++index) {
        div = document.createElement("div");
        div.innerHTML = items[index];
        div.className = "listItem";
        view.appendChild(div);
      }
      console.log("viewing items " + firstItem + " to " + lastItem);
    }

    refreshWindow();

    document.getElementById("heightForcer").style.height =
      items.length * itemHeight + "px";
    if (hideScrollBar) {
      //work around for non-chrome browsers, hides the scrollbar
      table.style.width = table.offsetWidth * 2 - view.offsetWidth + "px";
    }

    function delayingHandler() {
      //wait for the scroll to finish
      setTimeout(refreshWindow, 10);
    }
    if (table.addEventListener)
      table.addEventListener("scroll", delayingHandler, false);
    else table.attachEvent("onscroll", delayingHandler);
  }
}
