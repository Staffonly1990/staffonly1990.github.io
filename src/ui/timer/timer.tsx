import React, { FC, useEffect, useState } from 'react';
import styles from './timer.module.css'

interface ITimer {
  triger?: number;
}

var id: any;

const Timer: FC<ITimer> = ({ triger }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    clearInterval(id);
    setTime(0);

    id = setInterval(() => {
      setTime((preTime) => { if (triger) { return preTime + 1 } else { return 0 } })
    }, 1000);
  }, [triger])

  return (
    <div className={`${styles.time} text-center`}>
      <div>TIME</div>
      <div>{time}</div>
    </div>
  );
}

Timer.displayName = 'Timer';
export default Timer;