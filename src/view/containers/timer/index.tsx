import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { changeInterval } from '../../../store/actions/change-interval';
import { initialIntervalState, intervalReducer } from '../../../store/reducers/timer';
import { getSecondsDifferenceOfDate } from '../../../utils';
import { Button } from '../../components/common/button';
import { ButtonGroup, IntervalTitle, IntervalValue } from '../../components/common/elements';
import { SpinnerContainer, StopwatchBox, StopwatchValue, TimerBox, TimerContainer } from './elements';
import Loader from 'react-loader-spinner'

const Interval = React.lazy(() => import('../../components/interval'));

let timerId: number;

export const Timer: React.FC = React.memo(() => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [{value: currentInterval}, dispatch] = useReducer(intervalReducer, initialIntervalState);
  const [isIntervalVisible, setVisible] = useState(false);
  const isControlAvailable = currentInterval > 0;
  const isStarted = startTime > 0;

  const showInterval = useCallback(() => {
    setVisible(true);
  }, []);

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
  }, []);

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
        {isIntervalVisible ? (
          <React.Suspense fallback={(
            <SpinnerContainer>
              <Loader
                type="Circles"
                color="#00BFFF"
                height={40}
                width={40}
                timeout={3000} //3 secs

              />
            </SpinnerContainer>
          )}>
            <Interval
              currentInterval={currentInterval}
              increaseInterval={increaseInterval}
              decreaseInterval={decreaseInterval}
            />
          </React.Suspense>
        ) : (<IntervalTitle><Button color="ghost" onClick={showInterval}>Интервал</Button> обновления секундомера: <IntervalValue>{currentInterval}</IntervalValue> сек.</IntervalTitle>)}
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
