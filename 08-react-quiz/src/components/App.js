import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartQuizScreen from "./StartQuizScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

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

export default function App() {
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
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartQuizScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "running" && (
          <>
            <ProgressBar
              numQuestion={numQuestion}
              index={index}
              points={points}
              possiblePoints={possiblePoints}
              selectedAnswer={selectedAnswer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              selectedAnswer={selectedAnswer}
            />
            <Footer>
              <Timer secondRemaining={secondRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                selectedAnswer={selectedAnswer}
                index={index}
                numQuestions={numQuestion}
              />
            </Footer>
          </>
        )}
        {status === "complete" && (
          <FinishScreen
            points={points}
            possiblePoints={possiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
