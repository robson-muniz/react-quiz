import Header from "./Header";
import Main from "./Main";
import { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

// Initial state for the app
const initialState = {
  questions: [], // Array of questions
  status: "loading", // Current status of the app
  index: 0, // Current question index
  answer: null, // Selected answer index
  points: 0, // Total points scored
  highscore: 0,
};

// Reducer function to handle state updates
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      // Update state with fetched questions and set status to "ready"
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      // Set status to "failed" if data fetching fails
      return {
        ...state,
        status: "error",
      };

    case "start":
      // Set status to "active" to start the quiz
      return {
        ...state,
        status: "active",
      };

    case "newAnswer": {
      // Update points based on the selected answer
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion":
      // Move to the next question and reset the answer
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      // Set status to "finished" when the quiz ends
      return {
        ...state,
        status: "finished",
        hints: state.points > state.highscore ? state.points: state.highscore,
      };

    default:
      throw new Error("action unknown");
  }
}

function App() {
  // Use reducer to manage state
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length; // Total number of questions
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0); // Maximum possible points

  console.log("Questions:", questions); // Log questions for debugging
  console.log("Current Index:", index); // Log current index for debugging

  // Fetch questions from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />} {/* Show loader while loading */}
        {status === "error" && <Error />} {/* Show error if data fetching fails */}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )} {/* Show start screen when ready */}
        {status === "active" && questions[index] && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            /> {/* Show progress bar */}
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            /> {/* Show current question */}
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            /> {/* Show next button */}
          </>
        )}
        {status === "finished" && <FinishScreen  points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} />}
      </Main>
    </div>
  );
}

export default App;