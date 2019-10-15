import "./index.css";
import { createStore } from "redux";

var body = document.getElementById("root") as HTMLBodyElement;
body.innerHTML = `
<p>
    Counter: <span id="counterValue"></span> times
    <button id="increment" >+</button>
    <button id="decrement" >-</button>
</p>
<div>
    <p>Flipping square</p>
    <div id="flippingSquare" class="square red">Flip me!<div/>
</div>
`;
console.log("Script started");

enum SquareColors {
  red = 0,
  blue = 1
}

const initialState = {
  counter: 0,
  color: SquareColors.red
};

function reducerFunction(state = initialState, action: any) {
  let newState = JSON.parse(JSON.stringify(state));
  console.log("copy of state:" + JSON.stringify(state));
  switch (action.type) {
    case "INCREMENT":
      newState.counter += 1;
      return newState;
    case "DECREMENT":
      newState.counter -= 1;
      return newState;
    case "FLIP":
      newState.color ^= 1;
      return newState;
    default:
      return newState;
  }
}

const store = createStore(reducerFunction);

const dynamicContent = document.getElementById(
  "counterValue"
) as HTMLSpanElement;

render();
function render() {
  console.log("DOM will be updated");
  dynamicContent.innerHTML = store.getState().counter.toString();
}

const incrementButton = document.getElementById(
  "increment"
) as HTMLButtonElement;
incrementButton.addEventListener("click", function() {
  store.dispatch({ type: "INCREMENT" });
});

const decrementButton = document.getElementById(
  "decrement"
) as HTMLButtonElement;
decrementButton.addEventListener("click", function() {
  const decrementAction = { type: "DECREMENT" };
  store.dispatch(decrementAction);
});

store.subscribe(render);

// ------ My code -------
const flippingSquare = document.getElementById(
  "flippingSquare"
) as HTMLDivElement;

flippingSquare.addEventListener("click", function() {
  store.dispatch({ type: "FLIP" });
});

//flip();

function flip() {
  console.log("Square color will be flipped");
  if (store.getState().color == SquareColors.red)
    flippingSquare.classList.replace("red", "blue");
  if (store.getState().color == SquareColors.blue)
    flippingSquare.classList.replace("blue", "red");
}

store.subscribe(flip);
