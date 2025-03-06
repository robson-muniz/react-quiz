import React, { useEffect } from 'react';

function Timer({dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(function () {
    const intervalId = setInterval(function () {
      // console.log('Timer');
      dispatch({type: 'tick'})
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}

export default Timer;