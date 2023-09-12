import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

// Coding Challenge
// export default function App() {
//   return (
//     <div className="App">
//       <Counter />
//     </div>
//   );
// }

// const Counter = () => {
//   const [step, setStep] = useState(1);
//   const [count, setCount] = useState(0);
//   const date = new Date();
//   date.setDate(date.getDate() + count);

//   return (
//     <div>
//       <div>
//         <button onClick={() => setStep((currStep) => currStep - 1)}>-</button>
//         <span>Step :{step}</span>
//         <button onClick={() => setStep((currStep) => currStep + 1)}>+</button>
//       </div>

//       <div style={{ marginTop: "12px" }}>
//         <button onClick={() => setCount((currCount) => currCount - step)}>
//           -
//         </button>
//         <span>Count :{count}</span>
//         <button onClick={() => setCount((currCount) => currCount + step)}>
//           +
//         </button>
//       </div>
//       <p>
//         <span>
//           {count === 0
//             ? "Today is "
//             : count > 0
//             ? `${count} days from today is `
//             : `${Math.abs(count)} days ago was`}
//         </span>
//         <span>{date.toDateString()}</span>
//       </p>
//     </div>
//   );
// };

const App = () => {
  // state is a value a component can hold over time ,also can be called memory of component,
  // when we update state it will make rerender the component,state keeps the track of ui with data .
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePreviousClick() {
    // if (step > 1) {setStep(step - 1)};

    //set state can recieve a callback function which holds the previous or current state value in parameter
    if (step > 1) {
      setStep((previousStep) => previousStep - 1);
    }
  }
  function handleNextClick() {
    // if we want to update the value of the state
    if (step < 3) {
      setStep((nextStep) => nextStep + 1);
      // setStep((nextStep) => nextStep + 1);
    }
  }

  return (
    <>
      <button
        className="close"
        onClick={() => setIsOpen((currentlyOpen) => !currentlyOpen)}
      >
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">{messages[step - 1]}</p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePreviousClick}
            >
              previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNextClick}
            >
              next
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default App;
