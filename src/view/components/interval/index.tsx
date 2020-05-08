import React from 'react';
import { Button } from '../common/button';
import { ButtonGroup, IntervalTitle, IntervalValue } from '../common/elements';
import { IntervalBox } from './elements';

interface IIntervalProps {
  currentInterval: number;
  increaseInterval: () => void;
  decreaseInterval: () => void;
}

const Interval: React.FC<IIntervalProps> = ({ currentInterval, increaseInterval, decreaseInterval }) => {
  const isDecAvailable = currentInterval > 0;
  return (
    <IntervalBox>
      <IntervalTitle>Интервал обновления секундомера: <IntervalValue>{currentInterval}</IntervalValue> сек.</IntervalTitle>
      Test 7
      <ButtonGroup>
         <Button color="blue" disabled={!isDecAvailable} onClick={isDecAvailable ? decreaseInterval : undefined}>-</Button>
         <Button color="blue" onClick={increaseInterval}>+</Button>
       </ButtonGroup>
    </IntervalBox>
  );
};

export default React.memo(Interval);
