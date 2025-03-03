import React from 'react';
import Options from "./Options";

function Question({ question }) {
  console.log("Question Prop:", question);

  if (!question) {
    return <p>No question available.</p>;
  }

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;