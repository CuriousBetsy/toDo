"use strict";
class Data {
  constructor() {
    this.listItems = [];
    this.counter = 1;
    setInterval(() => console.log(this.listItems), 5000);
  }

  addItemToList(header, description, checked = "false") {
    this.listItems.push({
      header: header,
      description: description,
      id: this.counter,
      checked: checked,
    });
    this.counter++;
  }

  removeItemFromList(id) {
    this.listItems.forEach((obj, i) => {
      if (obj.id == id) this.listItems.splice(i, 1);
    });
  }

  moveItemToTheBackOfTheListIfChecked(id) {
    this.listItems.forEach((obj, i) => {
      if (obj.id == id) this.listItems.push(this.listItems.splice(i, 1)[0]);
    });
  }

  moveItemToTheTopOfTheListIfUnchecked(id) {
    this.listItems.forEach((obj, i) => {
      if (obj.id == id) this.listItems.unshift(this.listItems.splice(i, 1)[0]);
    });
  }

  changeCheckedStatus(id) {
    console.log("function is working where expected", `id: ${id}`);
    this.listItems.forEach((obj, i) => {
      if (obj.id == id) {
        if (obj.checked == "false") {
          obj.checked = "true";
          return;
        }

        if (obj.checked == "true") obj.checked = "false";
      }
    });
  }

  clearList() {
    this.listItems.length = 0;
  }
}

export let dataObj = new Data();

// dataObj.listItems.push({
//   header: "Fly to Armenia",
//   description: "Need to avoid moblization",
//   checked: false,
// });
