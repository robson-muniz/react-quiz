function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="grid grid-cols-1 gap-4">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`w-full text-left p-6 rounded-lg text-2xl transition-all duration-300 ${
            hasAnswered
              ? index === question.correctOption
                ? "bg-accent text-white"
                : "bg-error/10 text-error"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;