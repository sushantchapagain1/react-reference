import React from "react";
import ReactDOM from "react-dom/client";
import pizzaData from "./data";
import "./index.css";

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      {numPizzas > 0 ? (
        // React Fragment lets us group some elements without getting in trace of HTML tree.
        <>
          <p>Lorem Ipsum Dummy Menu List Description. </p>
          <ul className="pizzas">
            {/* cannot use forEach cz forEach donot create new array and it will not render any */}
            {pizzas.map((pizza, i) => (
              <Pizza key={i + 1} {...pizza} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're currently working on menu. Please come back later :( </p>
      )}
    </div>
  );
}

function Pizza(pizza) {
  return (
    <li className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}>
      <img src={pizza.photoName} alt={pizza.name} />
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        <span>{pizza.soldOut ? "Sold out" : pizza.price}</span>
      </div>
    </li>
  );
}

function Order({ closeHour }) {
  return (
    <div className="order">
      <button className="btn">Order</button>
      <p>W're open until {closeHour}:00.Come visit us or order online. </p>
    </div>
  );
}

function Footer() {
  const currentHour = new Date().getHours();
  const openHour = 10;
  const closeHour = 21; // which is 9 pm
  const isOpen = currentHour >= openHour && currentHour <= closeHour;

  // return React.createElement(
  //   "footer",
  //   null,
  //   `${new Date().toLocaleTimeString()} W're Currently Open`
  // );

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          W're happy to welcome you between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  );
}

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // In stict mode our component are rendered twice
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;

// before react 18
// React.render(<App />, document.getElementById("root"));

// JSX is declarative syntax to describe how Ui looks like and how they work  which returns a block of html ,
// the extension jsx or tsx will allow to write js html and css together.

// if there is a
//  <header>
// <h1>Hello World!</h1>
// </header>
// then behind the scenes its Babel took will compile the html code to js like below
