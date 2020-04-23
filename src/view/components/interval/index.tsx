import React from 'react';

interface IIntervalProps {
  currentInterval: number;
  increaseInterval: () => void;
  decreaseInterval: () => void;
}

export const Interval: React.FC<IIntervalProps> = ({ currentInterval, increaseInterval, decreaseInterval }) => {
  const isDecAvailable = currentInterval > 0;
  return (
    <div>
      <span>Интервал обновления секундомера: {currentInterval} сек.</span>
      <span>
         <button disabled={!isDecAvailable} onClick={isDecAvailable ? decreaseInterval : undefined}>-</button>
         <button onClick={increaseInterval}>+</button>
       </span>
    </div>
  );
};
