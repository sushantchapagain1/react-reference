// Challange 1
// function FlashCards() {
//   const [selectedQuestionId, setSelectedQuestionId] = useState(null);

import { useState } from "react";

//   function handleSelectedQuestionId(id) {
//     setSelectedQuestionId(id !== selectedQuestionId ? id : null);
//   }

//   return (
//     <div className="flashcards">
//       {questions.map((question) => {
//         return (
//           <div
//             key={question.id}
//             className={question.id === selectedQuestionId ? "selected" : ""}
//             onClick={() => handleSelectedQuestionId(question.id)}
//           >
//             <p>
//               {question.id === selectedQuestionId
//                 ? question.answer
//                 : question.question}
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// Chanllenge 2

// function Counter() {
//   const [count, setCount] = useState(0);
//   const [step, setStep] = useState(1);

//   function handleReset() {
//     setCount(0);
//     setStep(1);
//   }

//   const date = new Date("june 21 2027");
//   date.setDate(date.getDate() + count);

//   return (
//     <div>
//       <div>
//         <input
//           type="range"
//           min="0"
//           max="10"
//           value={step}
//           onChange={(e) => setStep(Number(e.target.value))}
//         />
//         <span>Step: {step}</span>
//       </div>

//       <div>
//         <button onClick={() => setCount((c) => c - step)}>-</button>
//         <input
//           type="text"
//           value={count}
//           onChange={(e) => setCount(Number(e.target.value))}
//         />
//         <button onClick={() => setCount((c) => c + step)}>+</button>
//       </div>

//       <p>
//         <span>
//           {count === 0
//             ? "Today is "
//             : count > 0
//             ? `${count} days from today is `
//             : `${Math.abs(count)} days ago was `}
//         </span>
//         <span>{date.toDateString()}</span>
//       </p>

//       {count !== 0 || step !== 1 ? (
//         <div>
//           <button onClick={handleReset}>Reset</button>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// Challenge 3
// function Accordion({ data }) {
//   const [isCurrOpen, setIsCurrOpen] = useState(null);
//   return (
//     <div className="accordion">
//       {data.map((el, i) => (
//         <AccordionItem
//           title={el.title}
//           num={i}
//           key={el.title}
//           currOpen={isCurrOpen}
//           onSetCurrOpen={setIsCurrOpen}
//         >
//           {el.text}
//         </AccordionItem>
//       ))}
//     </div>
//   );
// }

// function AccordionItem({ num, title, currOpen, onSetCurrOpen, children }) {
//   const isOpen = num === currOpen;

//   function handleToggle() {
//     onSetCurrOpen(isOpen ? null : num);
//   }

//   return (
//     <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
//       <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
//       <p className="title">{title}</p>
//       <p className="icon">{isOpen ? "-" : "+"}</p>

//       {isOpen && <div className="content-box">{children}</div>}
//     </div>
//   );
// }

const BillInput = ({ bill, onSetBill }) => {
  return (
    <div>
      <label style={{ marginRight: "6px" }}>How much was the bill?</label>
      <input
        type="number"
        value={bill}
        placeholder="Bill value"
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
};

const SelectPercentageInput = ({ children, tip, onSetTip }) => {
  return (
    <div style={{ marginTop: "8px" }}>
      <label style={{ marginRight: "6px" }}>{children}</label>
      <select value={tip} onChange={(e) => onSetTip(Number(e.target.value))}>
        <option value="0">Disatisfied(0%)</option>
        <option value="5">Disatisfied(5%)</option>
        <option value="10">Disatisfied(10%)</option>
        <option value="20">Disatisfied(20%)</option>
      </select>
    </div>
  );
};

const TotalBill = ({ bill, totalTip }) => {
  const totalBill = bill + totalTip;
  return (
    <h2>
      You pay ${totalBill} (${bill} + ${totalTip} tip)
    </h2>
  );
};

const ResetBill = ({ onResetBill }) => {
  return <button onClick={onResetBill}>Reset</button>;
};

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [yourTip, setYourTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  // value coming from state is called derived state.
  const totalTip = bill * ((yourTip + friendTip) / 2 / 100);

  function handleReset() {
    setBill("");
    setYourTip(0);
    setFriendTip(0);
  }

  return (
    <>
      <BillInput bill={bill} onSetBill={setBill} />
      {/* TO send two prop to a single compoenent is making two states and passing it through single prop name  */}
      <SelectPercentageInput tip={yourTip} onSetTip={setYourTip}>
        How did you like the service?
      </SelectPercentageInput>
      {/* Tip and onSetTip are same  */}
      <SelectPercentageInput tip={friendTip} onSetTip={setFriendTip}>
        How did your friend the service?
      </SelectPercentageInput>
      {bill > 0 && (
        <>
          <TotalBill
            bill={bill}
            yourTip={yourTip}
            friendTip={friendTip}
            totalTip={totalTip}
          />
          <ResetBill onResetBill={handleReset} />
        </>
      )}
    </>
  );
}
