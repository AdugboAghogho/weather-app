import React, { useState, useEffect } from 'react';
import './index.css';

const Show = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const deg = 6;

  const setClock = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    const intervalId = setInterval(setClock, 1000);
    return () => clearInterval(intervalId); // Cleanup function for interval
  }, []);

  const switchTheme = (evt) => {
    const switchBtn = evt.target;
    if (switchBtn.textContent.toLowerCase() === 'light') {
      switchBtn.textContent = 'dark';
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      switchBtn.textContent = 'light';
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const getRotationAngle = (value) => value * deg;

  const getHourAngle = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return hours * 30 + minutes / 12; // Adjust for minute hand influence
  };

  return (
    <>
    <div className="clock-div">
      <div className="clock">
        <div
          className="hour"
          style={{ transform: `rotateZ(${getHourAngle()}deg)` }}
        />
        <div className="min" style={{ transform: `rotateZ(${getRotationAngle(currentTime.getMinutes())}deg)` }} />
        <div className="sec" style={{ transform: `rotateZ(${getRotationAngle(currentTime.getSeconds())}deg)` }} />
      </div>

      <div className="switch-cont">
        <button className="switch-btn" onClick={switchTheme}>
          {currentTime.getHours() >= 18 ? 'Dark' : 'Light'}
        </button>
      </div>

    </div>
    </>
  );
};



export default Show;