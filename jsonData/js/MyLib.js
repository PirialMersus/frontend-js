////////////////////////////////////// calsalsdkjalkdsajk//////////////////////////////////

class MyLib {
  constructor(elem) {
    this._elem = elem;
    this.input = document.getElementById("inputFile");
    document.getElementById(
      "btnForEnterJSONFile"
    ).onclick = this.downloadingJSONFile.bind(this);
  }

  downloadingJSONFile(e) {
    e.preventDefault();
    const file = this.input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = JSON.parse(reader.result);
      let newTable = document.createElement("div");
      newTable.className = "tableWrapper";

      this._elem.append(newTable);

      new Table({ data, newTable });
    };
    reader.readAsText(file);
  }
}

new MyLib(document.getElementById("wrapper"));
