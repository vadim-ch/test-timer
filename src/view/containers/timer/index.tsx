import React, { useCallback, useEffect, useState } from 'react';
import { changeInterval } from '../../../store/actions/change-interval';
import { IState } from '../../../store/reducers';
import { connect } from 'react-redux';
import { getCurrentInterval } from '../../../store/reducers/timer/selectors';
import { getSecondsDifferenceOfDate, loadableWithCatchError } from '../../../utils';
import { Button } from '../../components/common/button';
import { ButtonGroup, IntervalTitle, IntervalValue } from '../../components/common/elements';
import { SpinnerContainer, StopwatchBox, StopwatchValue, TimerBox, TimerContainer } from './elements';
import Loader from 'react-loader-spinner'

const Interval = loadableWithCatchError('components/interval');

let timerId: number;

interface ITimerProps {
  currentInterval: number;
  increaseInterval: () => void;
  decreaseInterval: () => void;
}

export const Timer: React.FC<ITimerProps> = React.memo(({currentInterval, increaseInterval, decreaseInterval}) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [isIntervalVisible, setVisible] = useState(false);
  const isControlAvailable = currentInterval > 0;
  const isStarted = startTime > 0;

  const showInterval = useCallback(() => {
    setVisible(true);
  }, []);

  const handleTick = useCallback(() => {
    setCurrentTime(getSecondsDifferenceOfDate(startTime));
  }, [startTime]);

  const handleStart = useCallback(() => {
    if (isControlAvailable) {
      setStartTime(Date.now());
    }
  }, [isControlAvailable]);

  const startTimer = useCallback(() => {
    timerId = +setTimeout(() => {
      clearTimeout(timerId);
      handleTick();
      startTimer();
    }, currentInterval * 1000);
  }, [currentInterval, handleTick]);

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
  }, [startTime, currentInterval, startTimer]);

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

const mapStateToProps = (state: IState) => ({
  currentInterval: getCurrentInterval(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  decreaseInterval: () => dispatch(changeInterval(-1)),
  increaseInterval: () => dispatch(changeInterval(1))
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
