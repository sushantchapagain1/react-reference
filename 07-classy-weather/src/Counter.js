import React from "react";
import "./App.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement() {
    this.setState((currCount) => {
      return { count: currCount.count + 1 };
    });
  }

  handleDecrement() {
    this.setState((currCount) => {
      return { count: currCount.count - 1 };
    });
  }

  render() {
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + this.state.count);
    return (
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={this.handleIncrement}>+</button>
        <p>
          {date.toDateString()} [{this.state.count}]
        </p>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    );
  }
}

export default Counter;
