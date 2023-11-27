// import Counter from './Counter';

// export default function App() {
//   return (
//     <div>
//       <h1>Compound Component Pattern</h1>
//       {/* <Counter
//         iconIncrease="+"
//         iconDecrease="-"
//         label="My NOT so flexible counter"
//         hideLabel={false}
//         hideIncrease={false}
//         hideDecrease={false}
//       /> */}
//       <Counter>
//         <Counter.Label>My NOT so flexible counter</Counter.Label>
//         <Counter.Increase icon="+" />
//         <Counter.Count />
//         <Counter.Decrease icon="-" />
//       </Counter>
//     </div>
//   );
// }

// import { createContext, useContext, useState } from "react";

// const CountContext = createContext();

// function Counter({ children }) {
//   const [count, setCount] = useState(0);
//   function increase() {
//     setCount((count) => count + 1);
//   }
//   function decrease() {
//     setCount((count) => count - 1);
//   }

//   return (
//     <CountContext.Provider value={{ count, increase, decrease }}>
//       {children}
//     </CountContext.Provider>
//   );
// }

// function Count() {
//   const { count } = useContext(CountContext);
//   return <span>{count}</span>;
// }

// function Label({ children }) {
//   return <span>{children}</span>;
// }

// function Increase({ icon }) {
//   const { increase } = useContext(CountContext);
//   return <button onClick={increase}>{icon}</button>;
// }

// function Decrease({ icon }) {
//   const { decrease } = useContext(CountContext);
//   return <button onClick={decrease}>{icon}</button>;
// }

// Counter.Count = Count;
// Counter.Label = Label;
// Counter.Increase = Increase;
// Counter.Decrease = Decrease;

// export default Counter;
