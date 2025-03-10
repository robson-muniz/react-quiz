function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="bg-primary text-white px-12 py-4 rounded-lg text-2xl font-semibold hover:bg-primary/90 transition-all duration-300"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className="bg-accent text-white px-12 py-4 rounded-lg text-2xl font-semibold hover:bg-accent/90 transition-all duration-300"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;