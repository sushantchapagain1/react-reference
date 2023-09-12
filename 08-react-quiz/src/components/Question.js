import Options from "./Options";
function Question({ question, dispatch, selectedAnswer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
}

export default Question;
