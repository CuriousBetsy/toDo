"use strict";
import { dataObj as model } from "./model.js";
import { DisplayStuffObj as view } from "./view.js";

view.displayList(model.listItems);

// This function will call methods view methods that add event listeners to dom objects. Within the init function will pass the functions that will handle the events

function init() {
  view.addButtonListener(view.addCreator, model.addItemToList.bind(model));
  view.addListItemListener(
    view.listItemClickEventHandler,
    model.removeItemFromList.bind(model),
    model.moveItemToTheBackOfTheListIfChecked.bind(model),
    model.listItems,
    model.changeCheckedStatus.bind(model),
    model.moveItemToTheTopOfTheListIfUnchecked.bind(model)
  );
  view.clearAllButtonListener(
    view.clearAllHandler,
    model.clearList.bind(model)
  );
}

init();
