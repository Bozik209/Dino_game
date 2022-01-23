import {
  incrementCustomProperty,
  getCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const dinoElem = document.querySelector("[data-dino]");
const JUNP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2; // we have 2 defferent frames of our animation
const FRAME_TIME = 100; // every single freame should last 100 millieseconds

let isJumping;
let dinoFrame;
let currentFarmeTime;
let yVelocity;

export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFarmeTime = 0;
  yVelocity = 0;
  setCustomProperty(dinoElem, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

export function updateDino(delta, speedScale) {
  handRun(delta, speedScale);
  heanJump(delta);
}

export function getDinoRects() {
  return dinoElem.getBoundingClientRect();
}

export function setDinoLose() {
  dinoElem.src = "imgs/dino-lose.png";
}

function handRun(delta, speedScale) {
  // cheack if dino is jumping
  if (!isJumping) {
    dinoElem.sec = `img/dino-stationaty.png`;
    return;
  }

  // if not jumping we want to oscillate the animation
  if (currentFarmeTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`;
    currentFarmeTime -= FRAME_TIME;
  }
  // evrey time we call function time get faster
  currentFarmeTime += delta * speedScale;
}

function heanJump(delta) {
  if (isJumping) return;

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta);
  // back to touch the ground
  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0);
    isJumping = false;
  }
  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;

  yVelocity = JUNP_SPEED;
  isJumping = false;
}
