import React, { FC, useEffect, useState } from 'react';
import styles from './timer.module.css'

interface ITimer {
  triger: number;
}

const Timer: FC<ITimer> = ({ triger }) => {
  const [seconds, setSeconds] = useState(0);

  const [intervalState, setIntervalState] = useState<NodeJS.Timer>();

  console.log('render');

  const start = () => {
    setIntervalState((preInterval) => {
      if (preInterval) clearTimeout(preInterval);
      return triger ? setInterval(() => setSeconds((preSeconds) => preSeconds + 1), 1000) : undefined;
    })
  };

  useEffect(() => {
    setSeconds(0);
    start();
  }, [triger])

  return (
    <div className={`${styles.time} text-center`}>
      <div>TIME</div>
      <div>{seconds}</div>
    </div>
  );
}

Timer.displayName = 'Timer';
export default Timer;