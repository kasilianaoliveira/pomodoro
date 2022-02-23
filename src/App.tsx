import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Time } from "./components/Time";

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);

  let intervalTime = useRef<any>();
  let sessionCount = useRef(0);

  const handleSeconds = useCallback(() => {
    if (isTimerActive) {
      intervalTime.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) return 59;

          return prevSeconds - 1;
        });
      }, 1000);
    }
  }, [isTimerActive]);

  const handleMinutes = useCallback(() => {
    isTimerActive &&
      seconds === 0 &&
      setTimeout(() => {
        setMinutes((prevMinutes) => (prevMinutes > 0 ? prevMinutes - 1 : 0));
      }, 1000);
  }, [seconds, isTimerActive]);

  const formatTime = (time: number) => (time < 10 ? "0" + time : time);

  const handleClickStart = () => {
    sessionCount.current = 0;
    setIsTimerActive(true);
  };

  const handleClickPause = () => {
    clearInterval(intervalTime.current);
    setIsTimerActive(false);
  };

  const handleClickReset = () => {
    clearTimeout(intervalTime.current);
    setIsTimerActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  useEffect(() => {
    handleSeconds();
  }, [handleSeconds]);

  useEffect(() => {
    handleMinutes();
  }, [handleMinutes]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      if (!isBreakTime) {
        console.log("first");
        setTimeout(() => {
          setMinutes(5);
          setSeconds(0);
          setIsBreakTime(true);
        }, 1000);
        sessionCount.current++;
      } else if (isBreakTime && sessionCount.current <= 4) {
        setTimeout(() => {
          setIsBreakTime(false);
          setMinutes(25);
          setSeconds(0);
        }, 1000);
      } else if (sessionCount.current > 4) {
        /*setTimeout(() => {
          setMinutes(10);
          setSeconds(0);
          setIsBreakTime(true);
        }, 1000);*/
        setIsBreakTime(false);
        handleClickReset();
      }
    }
  }, [minutes, seconds, isBreakTime]);

  return (
    <main className="App">
      <div className="container">
        <Header />
        <div className="content">
          <Time
            formatMin={formatTime(minutes)}
            formatSec={formatTime(seconds)}
          />

          <div className="button">
            <Button onClick={handleClickStart} text="Start" />
            <Button onClick={handleClickPause} text="Pause" />
            <Button onClick={handleClickReset} text="Reset" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
