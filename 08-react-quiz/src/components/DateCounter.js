import { useReducer } from "react";

const initialState = {
  count: 0,
  step: 1,
};

function reducer(currentState, action) {
  console.log(currentState, action);

  switch (action.type) {
    case "inc":
      return { ...currentState, count: currentState.count + currentState.step };
    case "dec":
      return { ...currentState, count: currentState.count - currentState.step };

    case "setCount":
      return { ...currentState, count: action.payload };

    case "setStep":
      return { ...currentState, step: action.payload };

    case "reset":
      return initialState;

    default:
      throw new Error("Unknown action type: ");
  }
}

function DateCounter() {
  // useReducer is a hook where it holds  state object and state Setter function in one reducer function.
  //usefull when we have to set all state with huge logic.
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
