import React from "react";
import { useQuestion } from "../context/QuestionContext";

function Options({ question }) {
  const { selectedAnswer, dispatch } = useQuestion();
  const hasAnswered = selectedAnswer !== null;

  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          key={i + 1}
          className={`btn btn-option ${selectedAnswer === i ? "answer" : ""}  ${
            hasAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "selectAnswer", payload: i })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
