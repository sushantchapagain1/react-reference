import React from "react";
import { useQuestion } from "../context/QuestionContext";

function StartQuizScreen() {
  const { numQuestion, dispatch } = useQuestion();
  return (
    <div className="start">
      <h2>Welcome to the react quiz!</h2>
      <h3>{numQuestion} questions to test your skills.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start Now
      </button>
    </div>
  );
}

export default StartQuizScreen;
