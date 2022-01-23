/////////////////////////////////////////
// ------custome property-------
//// elem - ground element
//// prop - --left property
//// value - value we want to set
//// inc - amount to increment by
/////////////////////////////////////////

export function getCustomProperty(elem, prop) {
  // Get css variable
  // The getComputedStyle() method gets the computed CSS properties and values of an HTML element.
  // The getPropertyValue() method returns the value of the specified CSS property.
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(elem, prop, value) {
  // The setProperty() method sets a new or modifies an existing CSS property in a CSS declaration block.
  // move the ground
  elem.style.setProperty(prop, value);
}

export function incrementCustomProperty(elem, prop, inc) {
  // getting the current value , adding incremend amount to it , and setting the value forward
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}
