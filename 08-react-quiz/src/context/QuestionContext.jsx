import React, { createContext, useReducer, useContext, useEffect } from "react";

const QuestionContext = createContext(null);

const initialState = {
  questions: [],
  // "loading" | "error" | "ready" | "running" | "complete
  status: "loading",
  index: 0,
  selectedAnswer: null,
  points: 0,
  highScore: 0,
  secondRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(currState, action) {
  switch (action.type) {
    case "getQuestions":
      return {
        ...currState,
        questions: action.payload,
        status: "ready",
      };

    case "errorGettingQuestion":
      return {
        ...currState,
        status: "error",
      };

    case "start":
      return {
        ...currState,
        status: "running",
        secondRemaining: currState.questions.length * SECS_PER_QUESTION,
      };

    case "selectAnswer":
      const question = currState.questions.at(currState.index);

      return {
        ...currState,
        selectedAnswer: action.payload,
        points:
          action.payload === question.correctOption
            ? currState.points + question.points
            : currState.points,
      };

    case "nextQuestion":
      return {
        ...currState,
        selectedAnswer: null,
        index: currState.index + 1,
      };

    case "finish":
      return {
        ...currState,
        status: "complete",
        highScore:
          currState.points > currState.highScore
            ? currState.points
            : currState.highScore,
      };

    case "timer":
      return {
        ...currState,
        secondRemaining: currState.secondRemaining - 1,
        status: currState.secondRemaining === 0 ? "complete" : currState.status,
      };

    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: currState.questions,
        highScore: currState.highScore,
      };

    default:
      throw new Error("ERROR: reducer ");
  }
}

function QuestionProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      selectedAnswer,
      points,
      highScore,
      secondRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestion = questions.length;
  const possiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();
        dispatch({ type: "getQuestions", payload: data });
      } catch (error) {
        console.log(error);
        dispatch({ type: "errorGettingQuestion" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        status,
        questions,
        index,
        selectedAnswer,
        points,
        highScore,
        secondRemaining,
        numQuestion,
        possiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestion() {
  const context = useContext(QuestionContext);
  if (context === null)
    throw new Error("CONTEXT SHOULD BE USED INSIDE PROVIDER");
  return context;
}

export { QuestionProvider, useQuestion };
