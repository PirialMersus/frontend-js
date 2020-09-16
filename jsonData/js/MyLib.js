class MyLib {
  constructor(options) {
    this.state = {
      backgroundColor: options.backgroundColor,
    };
    this.input = document.getElementById("inputFile");
    this.dataTable = document.getElementById("dataTable");
    this.isFormToReductDataOpen = false;
    this.selectedRowBeforChangingData = "";
    this.selectedRow = "";
    this.data;
    this.rowAttribute = "";
    this.jsonKeys;
    this.numberOfCols = 0;
    this.input.addEventListener("change", this.downloadingJSONFile.bind(this));
    this.dataTable.addEventListener(
      "click",
      this.findClickAndReductTable.bind(this)
    );

    document
      .getElementById("addOneRowId")
      .addEventListener("click", this.addNewRow.bind(this));

    document.getElementById("saveButton").addEventListener("click", () => {
      let text = JSON.stringify(this.data);
      let a = document.createElement("a");

      a.href = "data:attachment/text," + encodeURI(text);
      a.target = "_blank";
      a.download = "filename.json";
      a.click();
    });

    document
      .getElementById("reset")
      .addEventListener("click", this.resetFunction);

    // document.getElementById("test").htmlgl();
    // document.rasterize(element, optionsObject): ImageData;
  }

  /////////////////////downloading JSON File //////////////////////
  downloadingJSONFile(event) {
    const file = this.input.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      this.data = JSON.parse(reader.result);
      this.jsonKeys = Object.keys(this.data[0]);
      this.renderJSON(this.data);
    }.bind(this);
    reader.readAsText(file);
  }

  ///////////////////// Render Data to Dom //////////////////////

  renderJSON(data) {
    let dataForRender,
      tableForRender = "";

    for (let j = 0; j < this.jsonKeys.length; j++) {
      tableForRender += `<th data-number>${this.jsonKeys[j]}</th>`;
    }
    dataForRender = `<tr>${tableForRender}</tr>`;
    tableForRender = "";

    for (let i = 0; i < this.data.length; i++) {
      let tempLine = "";
      for (let j = 0; j < this.jsonKeys.length; j++) {
        if (j === this.jsonKeys.length - 1) {
          tempLine += `<td class="lastTd" data-row="${i}" data-col="${
            this.jsonKeys[j]
          }">${
            this.data[i][this.jsonKeys[j]]
          }<div class="wrapForReductAndDelButtons"><button class="pen reductCancelButtonsGeneral"></button><button class="deleteRow reductCancelButtonsGeneral"></button></div></td>`;
        } else {
          tempLine += `<td data-row="${i}" data-col="${this.jsonKeys[j]}">${
            this.data[i][this.jsonKeys[j]]
          }</td>`;
        }
      }
      tableForRender += `<tr>${tempLine}</tr>`;
    }
    dataForRender = `
      <caption>
        Данные из файла
      </caption>
      ${dataForRender}
      ${tableForRender}`;
    document.getElementsByClassName(
      "wrapper"
    )[0].style.backgoundColor = this.state.backgroundColor;
    this.dataTable.innerHTML = dataForRender;
    console.log(document.getElementsByClassName("wrapper")[0]);
  }

  ///////////////////// Finding click and reduct table //////////////////////

  findClickAndReductTable() {
    if (this.isFormToReductDataOpen) return;

    let row = "";
    const td = event.target.closest("td");
    this.rowAttribute = td.getAttribute("data-row");
    const deleteButton = event.target.closest(".deleteRow");
    if (deleteButton) {
      this.deleteRow(this.rowAttribute);
    } else {
      if (!td || !this.dataTable.contains(td)) return;
      this.isFormToReductDataOpen = true;
      this.selectedRowBeforChangingData = td.parentNode.innerHTML;
      this.selectedRow = td.parentNode;

      for (let j = 0; j < this.jsonKeys.length; j++) {
        if (j === this.jsonKeys.length - 1) {
          row += `<td><input type="text" name="${
            this.jsonKeys[j]
          }" class="inputFormReduct" value="${
            this.data[this.rowAttribute][this.jsonKeys[j]]
          }"/> <div class="wrapperButtons">
                  <button type="submit" class="iconsGeneralRulls saveIcon"></button>
                  <button type="reset" class="iconsGeneralRulls cancelIcon"></button>
                </div>
          </td>`;
        } else {
          row += `<td><input type="text" name="${
            this.jsonKeys[j]
          }" class="inputFormReduct" value="${
            this.data[this.rowAttribute][this.jsonKeys[j]]
          }"/></td>`;
        }
        this.numberOfCols = j;
      }

      this.selectedRow.classList.add("active");
      this.selectedRow.innerHTML = row;

      const inputs = document.getElementsByClassName("inputFormReduct");

      document
        .getElementById("formToInputTableData")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          e.stopPropagation();

          console.log("before", this.rowAttribute);
          const inputsValues = [];
          for (let i = 0; i < inputs.length; i++) {
            inputsValues[i] = inputs[i].value;
          }
          this.onClickSaveInFormReductRow(this.rowAttribute, inputsValues);
        });

      document
        .getElementById("formToInputTableData")
        .addEventListener("reset", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.onClickResetInFormReductRow();
        });
    }
  }

  /////////////////////Deleting the row //////////////////////

  deleteRow(numberOfRow) {
    this.data.splice(numberOfRow, 1);
    this.renderJSON(this.data);
  }

  /////////////////////Adding new row //////////////////////

  addNewRow() {
    if (this.data) {
      this.data.push({});
      const dataLength = this.data.length;
      for (let i = 0; i < this.jsonKeys.length; i++) {
        this.data[dataLength - 1][this.jsonKeys[i]] = "...click here...";
      }
      this.renderJSON(this.data);
    } else alert("download file first");
  }

  ///////////////////// Reduct and saving row data //////////////////////

  onClickSaveInFormReductRow(rowAttr, values) {
    console.log("after", rowAttr);
    for (let i = 0; i < values.length; i++) {
      this.data[rowAttr][this.jsonKeys[i]] = values[i];
    }
    this.renderJSON(this.data);
    this.isFormToReductDataOpen = false;
  }

  ///////////////////// Cancelling reducting row data //////////////////////

  onClickResetInFormReductRow() {
    this.selectedRow.innerHTML = this.selectedRowBeforChangingData;
    this.isFormToReductDataOpen = false;
    this.selectedRow.classList.remove("active");
  }

  ///////////////////// reset //////////////////////

  resetFunction() {
    Array.from(
      document.getElementsByClassName("wrapForReductAndDelButtons")
    ).forEach((element) => {
      element.style.display = "none";
    });

    html2canvas(document.querySelector("#formToInputTableData")).then(
      (canvas) => {
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
      }
    );
  }
}

new MyLib({
  options: {
    backgroundColor: "red",
  },
});
