import {
  setCustomProperty,
  getCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05; // need to be same as dino speed
const CACTUS_INTERVAL_MIN = 500; // interval for how long cactus wiil show on screen
const CACTUS_INTERVAL_MAX = 2000; // between 500 to 2000
const worldElem = document.querySelector("[data-world]");

let nextCactusTime;
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  // remove before start game
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    cactus.remove();
  });
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    //creact the cacuts
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1);
    //remove the cactus
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove();
    }
  });
  // timeing between cactus
  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
      speedScale;
  }
  nextCactusTime -= delta;
}

export function getCactusRects(){
    return [...document.querySelectorAll("[data-cactus]")].map(cactus=>{
        // The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
        return cactus.getBoundingClientRect()
    })
}


function createCactus() {
  const cactus = document.createElement("img");
  cactus.dataset.cactus = true; // select all cactus
  cactus.src = "imgs/cactus.png";
  cactus.classList.add("cactus");
  setCustomProperty(cactus, "--left", 100);
  worldElem.append(cactus);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
