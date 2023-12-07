"use strict";
class DisplayStuff {
  constructor() {
    this.list = document.querySelector(".list");
    this.addButton = document.querySelector(".add-button");
    this.clearButton = document.querySelector(".clear-button");
    this.creatorExists = false;
    this.counter = 1;
  }

  // A so called publisher subsriber pattern example. A function that will be listening to events and call the function that will be passed as an argument withing the controller.
  addButtonListener(handlerF, addItemToList) {
    this.addButton.addEventListener(
      "click",
      handlerF.bind(this, addItemToList)
    );
  }
  //A button that clears the list
  clearAllButtonListener(handlerF, clearList) {
    this.clearButton.clearList = clearList;
    this.clearButton.addEventListener("click", handlerF.bind(this));
  }

  clearAllHandler() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="modal-window">
      <p>Are you sure you want to clear the list?</p>
      <div class="buttons-container">
        <button class="yes-button">Yes</button>
        <button class="no-button">No</button>
      </div>
    </div>
    <div class="modal-background"></div>
    <div class="modal-background-2"></div>
    `
    );
    document.querySelector(".yes-button").addEventListener(
      "click",
      function () {
        this.list.innerHTML = "";
        this.clearButton.clearList();
        document.querySelector(".modal-window").remove();
        document.querySelector(".modal-background").remove();
        document.querySelector(".modal-background-2").remove();
      }.bind(this)
    );
    document.querySelector(".no-button").addEventListener(
      "click",
      function () {
        document.querySelector(".modal-window").remove();
        document.querySelector(".modal-background").remove();
        document.querySelector(".modal-background-2").remove();
      }.bind(this)
    );
  }
  //A function that adds creator to the top of the list
  addCreator(addItemToList) {
    if (this.creatorExists) return;
    // creatorExists is a variable that makes sure that you can't add an additional creator item while another is being served. It should be set to false again when the creator form is confirmed or deleted;
    this.creatorExists = true;
    this.list.insertAdjacentHTML(
      "afterbegin",
      `
      <li class="list-item creator">
      <div class="creator--plus-sign-wrapper">
        <img
          class="creator--plus-sign"
          src="icons/plus.svg"
          alt="plus sign icon"
        />
      </div>
      <div class="creator--textarea-container">
        <textarea
          class="creator--header-textarea"
          placeholder="HEADER"
          maxlength="31"
          rows="1"
        ></textarea>
        <textarea
          class="creator--description-textarea"
          placeholder="DESCRIPTION"
          maxlength="55"
          rows="1"
        ></textarea>
      </div>
      
      <img
        class="creator--cancel"
        src="icons/cancel.svg"
        alt="cancel icon"
      />
    
    </li> 
    `
    );
    // adding event listeners to the buttons of the creator elements
    this.creatorCancelButton = document.querySelector(".creator--cancel");
    this.creatorPlusButton = document.querySelector(
      ".creator--plus-sign-wrapper"
    );
    this.creator = document.querySelector(".creator");

    // cacnel button listener
    this.creatorCancelButton.addEventListener(
      "click",
      this.removingCreator.bind(this)
    );
    // plus button listener
    this.creatorPlusButton.addEventListener(
      "click",
      this.addingListItemButton.bind(this, addItemToList)
    );
  }

  // A function that is passed as a callback to event listeners of buttons that delete list items
  removingCreator() {
    this.creatorCancelButton.removeEventListener("click", this.removingCreator);
    this.creatorCancelButton.parentElement.remove();
    this.creatorExists = false;
  }
  // A function this is passed as a callback to event listener of the plus button of the creator. It adds a new list items if it has at least one character in either header  or description. After adding it deletes creator item;
  addingListItemButton(addItemToList) {
    this.header = this.creator.querySelector(".creator--header-textarea").value;
    this.description = this.creator.querySelector(
      ".creator--description-textarea"
    ).value;
    addItemToList(this.header, this.description);
    this.list.insertAdjacentHTML(
      "beforeend",
      `
      <li class="list-item" id="${this.counter}" data-checked='false'>
      <input class="list-item--checkbox" type="checkbox" />
      <div class="list-item--text-elements-container">
        <h2 class="list-item--header">${this.header}</h2>
        <p class="list-item--description">
          ${this.description}
      </p>
      </div>
      <img
        class="list-item--trashbin"
        src="icons/trashbin.svg"
        alt="trash bin icon"
      />
    </li>
    `
    );
    this.counter++;
    this.removingCreator();
  }

  // Event listener and function that will remove an item from the list if the trash bucked is clicked on
  addListItemListener(
    handlerF,
    removeItemFromList,
    moveItemToTheBackOfTheListIfChecked,
    listItems,
    changeCheckedStatus,
    moveItemToTheTopOfTheListIfUnchecked
  ) {
    this.list.removeItemFromList = removeItemFromList;
    this.list.moveItemToTheBackOfTheListIfChecked =
      moveItemToTheBackOfTheListIfChecked;
    this.list.listItems = listItems;
    this.list.changeCheckedStatus = changeCheckedStatus;
    this.list.moveItemToTheTopOfTheListIfUnchecked =
      moveItemToTheTopOfTheListIfUnchecked;
    this.list.addEventListener("click", handlerF.bind(this));
  }

  listItemClickEventHandler(e) {
    if (e.target.classList.contains("list-item--trashbin")) {
      this.list.removeItemFromList(e.target.parentElement.id);
      e.target.parentElement.remove();
    }

    if (e.target.classList.contains("list-item--checkbox")) {
      e.target.parentElement.classList.toggle("checked");
      // if checked
      if (e.target.parentElement.classList.contains("checked")) {
        e.target.parentElement.dataset.checked = "true";
        this.list.changeCheckedStatus(e.target.parentElement.id);
        this.list.moveItemToTheBackOfTheListIfChecked(
          e.target.parentElement.id
        );

        this.clearList();
        this.displayList(this.list.listItems);
      }

      //if unchecked
      if (!e.target.parentElement.classList.contains("checked")) {
        e.target.parentElement.dataset.checked = "false";
        this.list.changeCheckedStatus(e.target.parentElement.id);
        this.list.moveItemToTheTopOfTheListIfUnchecked(
          e.target.parentElement.id
        );
        this.clearList();
        this.displayList(this.list.listItems);
      }
    }
  }

  //   A function that displays To Do list items. it takes an array of objects that contain a header and a description, but also whether the list item is checked or not. It is probably going to be useful if I'am goint to implement memory cells.
  displayList(arr) {
    arr.forEach((obj) => {
      this.list.insertAdjacentHTML(
        "beforeend",
        `
        <li class="list-item ${obj.checked == "true" ? "checked" : ""}" id="${
          obj.id
        }" data-checked="${obj.checked}">
          <input class="list-item--checkbox" type="checkbox" ${
            obj.checked == "true" ? "checked" : ""
          }/>
          <div class="list-item--text-elements-container">
            <h2 class="list-item--header">${obj.header}</h2>
            <p class="list-item--description">
              ${obj.description}
            </p>
          </div>
          <img
            class="list-item--trashbin"
            src="icons/trashbin.svg"
            alt="trash bin icon"
          />
        </li>
      `
      );
    });
  }

  // ClearsList
  clearList() {
    this.list.innerHTML = "";
  }
}

export let DisplayStuffObj = new DisplayStuff();
