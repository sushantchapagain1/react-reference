import React from "react";

console.log();

const ProgressBar = ({
  numQuestion,
  index,
  points,
  possiblePoints,
  selectedAnswer,
}) => {
  return (
    <header className="progress">
      {/* if we add directly + 1 it imediatly shows the progress which is 
      not better ux  */}
      {/* at first if user doesnot select the answer then the selectedAnswer is null so Number(false) will be
        coerced to 0 so index + 0 is 1 and so on. 
      */}
      <progress
        max={numQuestion}
        value={index + Number(selectedAnswer !== null)}
      />
      <p>
        Question {""}
        <strong>
          {index + 1}/ {numQuestion}
        </strong>
      </p>

      <p>
        <strong>
          {points}/ {possiblePoints} points
        </strong>
      </p>
    </header>
  );
};

export default ProgressBar;
