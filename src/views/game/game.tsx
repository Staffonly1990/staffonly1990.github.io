import React, { FC, useMemo, useRef, useState } from 'react';
import styles from './game.module.css'
import ninja1 from '../../assets/images/ninja1.png'
import monster from '../../assets/images/monster.png'
import Timer from '../../ui/timer/timer';

const numsLeft = ['4', '3', '2', '1', '0'];
const numsRight = ['5', '6', '7', '8', '9'];

interface IDifficultyList {
  title: string;
  minNum: number;
  maxNum: number;
  amount: number;
  adens: number;
}

const difficultyList: IDifficultyList[] = [
  {
    title: 'easy',
    amount: 2,
    minNum: 0,
    maxNum: 10,
    adens: 1
  },
  {
    title: 'medium',
    amount: 2,
    minNum: 10,
    maxNum: 100,
    adens: 2
  },
  {
    title: 'hard',
    amount: 2,
    minNum: 100,
    maxNum: 1000,
    adens: 3
  }
]

const changeLvl = 10;

const Game: FC = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const [trueAnswer, setTrueAnswer] = useState<number>();
  // useMemo
  const [example, setExample] = useState('');
  // useMemo
  const [adens, setAdens] = useState(0);
  const [lvl, setLvl] = useState(0);
  const [error, setError] = useState(false);

  const timer = useMemo(() => { return <Timer triger={lvl} /> }, [lvl]);

  const addNumber = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const number = e?.currentTarget?.textContent ?? e?.currentTarget?.innerText;
    setUserAnswer((prevNumber) => prevNumber + number);
  };

  const cleare = () => { setUserAnswer(''); };

  const answerClick = () => {
    const err = Number(userAnswer) !== trueAnswer;

    const difficulty = Math.floor((lvl) / changeLvl);

    setAdens((prevAdens) => { if (err) { return 0 } else if (err === false) { return prevAdens + difficultyList[difficulty].adens } else { return prevAdens } });

    start(err, lvl + 1);
  };

  const start = (err?: boolean, nextLvl?: number) => {

    const difficulty = Math.floor((nextLvl ?? 0) / changeLvl);

    const numberOne = Math.floor(Math.random() * (difficultyList[difficulty].maxNum - difficultyList[difficulty].minNum)) + difficultyList[difficulty].minNum;
    const numberTwo = Math.floor(Math.random() * (difficultyList[difficulty].maxNum - difficultyList[difficulty].minNum)) + difficultyList[difficulty].minNum;

    setLvl((prevLvl) => { if (err) { return 0 } else { return prevLvl + 1 } });

    setExample(err ? `${trueAnswer}` : `${numberOne}+${numberTwo}`);

    setTrueAnswer(numberOne + numberTwo);
    setError(err ?? false);
    setUserAnswer('');
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="relative h-full up-block">

        <div className={styles.background}>
          <div className={styles.cube}></div>
          <div className={styles.cube}></div>
          <div className={styles.cube}></div>
          <div className={styles.cube}></div>
          <div className={styles.cube}></div>
        </div>

        <div className="absolute left-0 top-0 h-full w-full flex flex-col justify-between items-center border-y-4 border-t-black border-b-black">
          <div className="w-full">
            <div className={`w-full flex justify-between ${styles.details}`}>
              <span>Adden: {adens}</span>
              <span>lvl: {lvl}</span>
            </div>

            {timer}

          </div>
          {example ?
            <div className={`text-center ${styles.example} border-y-4 border-black ${error ? 'text-red-600 border-none' : ''} `}>{example}</div>
            :
            <div className={`text-center ${styles.example} border-y-4 border-black`}>Get Started</div>
          }

          <div className={`w-full ${styles.interactive} flex justify-between`}>
            <img src={ninja1} alt='You' />
            <img src={monster} alt='Enemy' />
          </div>
        </div>

      </div>

      <div className="flex justify-between">
        <ul>
          {numsLeft.map((num, index) =>
            <li key={num + index} className={styles.liNum}>
              <button onClick={addNumber} className={`h-full w-full ${styles.liNumBtn}`}>{num}</button>
            </li>)}
        </ul>

        <div className="w-full flex flex-col justify-between">
          <span className={`w-full ${styles.inputAnswer}`}>{userAnswer}</span>
          {example && !error ?
            <button onClick={answerClick} className={`${styles.btnAnswer} bg-green-400 hover:bg-green-600`}>Answer</button>
            :
            <button onClick={() => { start(); }} className={`${styles.btnAnswer} bg-green-400 hover:bg-green-600`}>Start</button>
          }
          <button onClick={cleare} className={`bg-blue-500 hover:bg-blue-600 ${styles.clearBtn}`}>Clear</button>
        </div>

        <ul>
          {numsRight.map((num, index) =>
            <li key={num + index} className={styles.liNum}>
              <button onClick={addNumber} className={`h-full w-full ${styles.liNumBtn}`}>{num}</button>
            </li>)}
        </ul>
      </div>



    </div>
  );
}

Game.displayName = 'Game';
export default Game;
