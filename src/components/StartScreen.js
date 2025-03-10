function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-primary mb-6">Welcome to the React Quiz!</h2>
      <h3 className="text-2xl text-gray-600 mb-8">
        {numQuestions} questions to test your React mastery
      </h3>
      <button
        className="bg-primary text-white px-12 py-4 rounded-lg text-2xl font-semibold hover:bg-primary/90 transition-all duration-300"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;