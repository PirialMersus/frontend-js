class Table {
  constructor(options) {
    this.state = {};

    this.element = options.newTable;
    this.element.onclick = this.findClick.bind(this);
    this.data = options.data;
    this.jsonKeys = Object.keys(options.data[0]);
    this.renderJSON(options.data);
    this.dataTable = this.element.querySelector("table");
    this.mainFormTable = this.element.querySelector("formToWrapTable");
    this.isFormToEditDataOpen = false;
    this.selectedRowBeforChangingData = "";
    this.selectedRow = "";
    this.rowAttribute = "";
    this.numberOfCols = 0;
    // this.isFileDownloaded = false;
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

    for (let i = 0; i < this.jsonKeys.length; i++) {
      this.data[this.rowAttribute][this.jsonKeys[i]] = inputs[i].value;
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

  editRow(event) {
    if (this.isFormToEditDataOpen) {
      return;
    }
    this.isFormToEditDataOpen = true;
    let row = "";
    const td = event.target.closest("td");
    this.rowAttribute = td.getAttribute("data-row");
    this.selectedRowBeforChangingData = td.parentNode.innerHTML;
    this.selectedRow = td.parentNode;

    for (let j = 0; j < this.jsonKeys.length; j++) {
      if (j === this.jsonKeys.length - 1) {
        row += `<td><input type="text" name="${
          this.jsonKeys[j]
        }" class="inputFormEdit" value="${
          this.data[this.rowAttribute][this.jsonKeys[j]]
        }"/> <div class="wrapperButtons">
                    <button data-action="onClickSaveInFormEditRow" type="submit" class="iconsGeneralRulls saveIcon"></button>
                    <button data-action="onClickResetInFormEditRow" type="reset" class="iconsGeneralRulls cancelIcon"></button>
                  </div>
            </td>`;
      } else {
        row += `<td><input type="text" name="${
          this.jsonKeys[j]
        }" class="inputFormEdit" value="${
          this.data[this.rowAttribute][this.jsonKeys[j]]
        }"/></td>`;
      }
      this.numberOfCols = j;
    }

    this.selectedRow.classList.add("active");
    this.selectedRow.innerHTML = row;
  }

  saveAsJSON() {
    if (this.data) {
      const text = JSON.stringify(this.data);
      let a = document.createElement("a");

      a.href = "data:attachment/text," + encodeURI(text);
      a.target = "_blank";
      a.download = "filename.json";
      a.click();
    } else alert("Сначала загрузите таблицу");
  }

  ///////////////////// Render Data to Dom //////////////////////

  renderJSON(data) {
    const buttonsForRender = `
      <button class="classForEditingButtons2" data-action="addOneRow" id="addOneRowId">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Add a new row
      </button>
      <button class="classForEditingButtons2" data-action="saveAsJSON" id="saveButton">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        save as JSON
      </button>
      <button class="classForEditingButtons2" data-action="resetFunction" id="reset">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Reset
      </button>`;
    let dataForRender,
      tableForRender = "";

    for (let j = 0; j < this.jsonKeys.length; j++) {
      tableForRender += `<th data-number>${this.jsonKeys[j]}</th>`;
    }

    dataForRender = `<tr>${tableForRender}</tr>`;
    tableForRender = "";

    for (let i = 0; i < data.length; i++) {
      let tempLine = "";
      for (let j = 0; j < this.jsonKeys.length; j++) {
        if (j === this.jsonKeys.length - 1) {
          tempLine += `<td class="lastTd" data-row="${i}" data-col="${
            this.jsonKeys[j]
          }">${data[i][this.jsonKeys[j]]} <div class="wrapForEditAndDelButtons">
               <button data-action="editRow" class="pen editCancelButtonsGeneral"></button>
               <button data-action="deleteRow" class="deleteRowButton editCancelButtonsGeneral"></button>
              </div>
            </td>`;
        } else {
          tempLine += `<td data-row="${i}" data-col="${this.jsonKeys[j]}">${
            data[i][this.jsonKeys[j]]
          }</td>`;
        }
      }
      tableForRender += `<tr>${tempLine}</tr>`;
    }
    dataForRender = `<form class="formToWrapTable" action="#" id="formToInputTableData">
          <table  data-action="findClickAndEditTable"
                  border="1"
                  id="dataTable">
            <caption>
              Данные из файла
            </caption>
            ${dataForRender}
            ${tableForRender}
          </table>
        </form>
        ${buttonsForRender}`;
    this.element.innerHTML = dataForRender;

    document
      .getElementById("formToInputTableData")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.onClickSaveInFormEditRow();
      });
    document
      .getElementById("formToInputTableData")
      .addEventListener("reset", (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.onClickResetInFormEditRow();
      });
  }

  /////////////////////Deleting the row //////////////////////

  deleteRow(event) {
    this.data.splice(event.target.closest("td").getAttribute("data-row"), 1);
    this.renderJSON(this.data);
  }

  /////////////////////Adding new row //////////////////////

  addOneRow() {
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

  resetFunction() {
    this.element.style.position = "relative";
    console.log("reset");
    Array.from(
      this.element.getElementsByClassName("wrapForEditAndDelButtons")
    ).forEach((element) => {
      element.style.display = "none";
    });

    html2canvas(this.element).then((canvas) => {
      let width = canvas.width;
      let height = canvas.height;
      let ctx = canvas.getContext("2d");
      let idata = ctx.getImageData(0, 0, width, height);
      let datums = [];
      for (let i = 0; i < 36; i++) {
        datums.push(ctx.createImageData(width, height));
      }
      for (let f = 0; f < width; f++) {
        for (let k = 0; k < height; k++) {
          for (let l = 0; l < 2; l++) {
            let n = 4 * (k * width + f);
            let m = Math.floor((36 * (Math.random() + (2 * f) / width)) / 3);
            for (let p = 0; p < 4; p++) {
              datums[m].data[n + p] = idata.data[n + p];
            }
          }
        }
      }
      datums.forEach((imagedata, i) => {
        let cloned = canvas.cloneNode();
        cloned.style.transition = "all 1.5s ease-out " + (1.5 * i) / 36 + "s";
        cloned.getContext("2d").putImageData(imagedata, 0, 0);
        document.body.appendChild(cloned);
        setTimeout(() => {
          let angle = (Math.random() - 0.5) * 2 * Math.PI;
          let rotateAngle = 15 * (Math.random() - 0.5);
          cloned.style.transform =
            "rotate(" +
            rotateAngle +
            "deg) translate(" +
            60 * Math.cos(angle) +
            "px," +
            60 * Math.sin(angle) +
            "px) rotate(" +
            rotateAngle +
            "deg)";
          cloned.style.opacity = 0;
        });
      });
    });
  }
}
