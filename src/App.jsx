import { useEffect, useRef, useState } from 'react';
import './App.css';

function getTimeDate() {
  const date = new Date();

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes() / 10 < 1 ? `0${date.getMinutes()}` : date.getMinutes(),
    seconds: date.getSeconds() / 10 < 1 ? `0${date.getSeconds()}` : date.getSeconds(),
  }
}

function App() {
  const timer = useRef(null);
  const [date, setDate] = useState(getTimeDate);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setDate(() => {
        return getTimeDate()
      });
    }, 1000);

    return () => {
      console.log('clear interval timer');
      window.clearInterval(timer.current);
    }
  }, []);

  return (
    <div className='main'>
      <div className='content'>
        <div className='block'>

          <svg width={200} height={200}>
            <circle
                cx={100}
                cy={100}
                r={95}
                stroke="#d3d3d3"
                fill="#102a44"
                strokeWidth={5}
                strokeLinecap="round"
              />
            <circle
              className='circle'
              cx={100}
              cy={100}
              r={95}
              stroke="#ff4a00"
              fill="#102a44"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={`${Math.PI * 95 * 2 * (date.seconds / 60)} ${Math.PI * 95 * 2}`}
              transform='rotate(-90, 100, 100)'
            />
          </svg>

          <div className='time__block'>
            <span className='hours'>{date.hours}</span>
            <span className='semicolon'>:</span>
            <span className='minutes'>{date.minutes}</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
