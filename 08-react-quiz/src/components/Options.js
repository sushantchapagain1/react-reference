import React from "react";

function Options({ question, selectedAnswer, dispatch }) {
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
