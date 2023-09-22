import React from "react";
import { useQuestion } from "../context/QuestionContext";

function NextButton() {
  const { dispatch, selectedAnswer, index, numQuestion } = useQuestion();

  if (selectedAnswer === null) return null;

  if (index < numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
