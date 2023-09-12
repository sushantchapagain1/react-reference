import React from "react";

function FinishScreen({ points, possiblePoints, highScore, dispatch }) {
  const percentage = (points / possiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {possiblePoints} (
        {Math.ceil(percentage)}
        %)
      </p>
      <p className="highscore">(highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
