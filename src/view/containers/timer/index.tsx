import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { changeInterval } from '../../../store/actions/change-interval';
import { initialIntervalState, intervalReducer } from '../../../store/reducers/timer';
import { getSecondsDifferenceOfDate } from '../../../utils';
import { Button } from '../../components/common/button';
import { ButtonGroup } from '../../components/common/elements';
import { Interval } from '../../components/interval';
import { StopwatchBox, StopwatchValue, TimerBox, TimerContainer } from './elements';

let timerId: number;

export const Timer: React.FC = React.memo(() => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [{value: currentInterval}, dispatch] = useReducer(intervalReducer, initialIntervalState);
  const isControlAvailable = currentInterval > 0;
  const isStarted = startTime > 0;

  const decreaseInterval = useCallback(() => {
    dispatch(changeInterval(-1))
  }, []);

  const increaseInterval = useCallback(() => {
    dispatch(changeInterval(1))
  }, []);

  const handleTick = useCallback(() => {
    setCurrentTime(getSecondsDifferenceOfDate(startTime));
  }, [startTime]);

  const handleStart = useCallback(() => {
    if (isControlAvailable) {
      setStartTime(Date.now());
    }
  }, [currentInterval]);

  const startTimer = useCallback(() => {
    timerId = +setTimeout(() => {
      clearTimeout(timerId);
      handleTick();
      startTimer();
    }, currentInterval * 1000);
  }, [currentInterval, startTime]);

  const handleStop = useCallback(() => {
    setStartTime(0);
    setCurrentTime(0);
    throw Error(`startTime - ${startTime}`);
  }, [startTime]);

  useEffect(() => {
    if (startTime > 0) {
      clearTimeout(timerId);
      startTimer();
    } else {
      clearTimeout(timerId);
    }
  }, [startTime, currentInterval]);

  return (
    <TimerBox>
      <TimerContainer>
        <Interval
          currentInterval={currentInterval}
          increaseInterval={increaseInterval}
          decreaseInterval={decreaseInterval}
        />
        <StopwatchBox>
          Секундомер: <StopwatchValue>{currentTime}</StopwatchValue> сек.
        </StopwatchBox>
        <ButtonGroup>
          <Button disabled={!isControlAvailable || isStarted} onClick={handleStart}>Старт</Button>
          <Button disabled={!isControlAvailable || !isStarted} onClick={handleStop}>Стоп</Button>
        </ButtonGroup>
      </TimerContainer>
    </TimerBox>
  );
});
