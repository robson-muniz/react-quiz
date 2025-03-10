function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  const progress = ((index + Number(answer !== null)) / numQuestions) * 100;

  return (
    <header className="w-full mb-8">
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div
          className="bg-primary h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-2xl text-gray-600">
        <p>
          Question <strong>{index + 1}</strong> / {numQuestions}
        </p>
        <p>
          <strong>{points}</strong> / {maxPossiblePoints} points
        </p>
      </div>
    </header>
  );
}

export default Progress;