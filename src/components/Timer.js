import React, { useEffect } from 'react';

function Timer({dispatch, secondsRemaining }) {
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
      {secondsRemaining}
    </div>
  );
}

export default Timer;