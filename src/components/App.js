import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      }

      case 'dataFailed':
        return {
          ...state,
          status: "failed",
        }

    case 'start':
      return {
        ...state,
        status: "active",
      }

      case 'newAnswer':
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points: action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        }

        case 'nextQuestion':
          return {
            ...state,
            index: state.index + 1,
            answer: null
          }

      default:
        throw new Error('action unknown');
  }

}

function App() {
  const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  console.log("Questions:", questions);
  console.log("Current Index:", index);

  useEffect(() => {
    fetch("http://localhost:8000/questions") // Ensure your backend is running
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => dispatch({type: "dataReceived", payload: data}))
      .catch((error) => dispatch({type: 'dataFailed'}));
  }, []); // Runs only once when the component mounts

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && questions[index] && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} index={index} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;