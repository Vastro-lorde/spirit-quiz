import { useState, useEffect } from 'react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className='flex gap-2 text-2xs md:text-base'>
      <p>Current Time:</p>
      <p>{time.toLocaleString()}</p>
    </div>
  );
}

export default Clock;
