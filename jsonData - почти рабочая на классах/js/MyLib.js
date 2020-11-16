////////////////////////////////////// calsalsdkjalkdsajk//////////////////////////////////

class MyLib {
  constructor(elem) {
    this._elem = elem;
    document.getElementById(
      "formForEnterJSONFile"
    ).onclick = this.downloadingJSONFile.bind(this);
    this.input = document.getElementById("inputFile");
  }

  // findClick(event) {
  //   let action = event.target.dataset.action;
  //   if (action) {
  //     this[action](event);
  //   }
  // }

  createAndRenderNewTable(data, newTable) {
    new Table({ data, newTable });
  }

  downloadingJSONFile() {
    const file = this.input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = JSON.parse(reader.result);
      let newTable = document.createElement("div");
      newTable.className = "tableWrapper";

      this._elem.append(newTable);

      this.createAndRenderNewTable(data, newTable);
    };
    reader.readAsText(file);
  }
}

new MyLib(document.getElementById("wrapper"));
