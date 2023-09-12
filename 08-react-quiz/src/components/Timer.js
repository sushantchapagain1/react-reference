import React, { useEffect } from "react";

function Timer({ secondRemaining, dispatch }) {
  const mins = Math.floor(secondRemaining / 60);
  const secs = secondRemaining % 60;

  useEffect(() => {
    function handler() {
      dispatch({ type: "timer" });
    }

    const id = setInterval(handler, 1000);

    return () => {
      clearInterval(id);
    };
  }, [secondRemaining, dispatch]);

  return (
    <div className="btn timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
