function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🙈";

  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-primary mb-6">
        <span className="text-6xl">{emoji}</span> You scored{" "}
        <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="text-2xl text-gray-600 mb-8">
        High Score: <strong>{highScore}</strong> points
      </p>
      <button
        className="bg-primary text-white px-12 py-4 rounded-lg text-2xl font-semibold hover:bg-primary/90 transition-all duration-300"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default FinishScreen;