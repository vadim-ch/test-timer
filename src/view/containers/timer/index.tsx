import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../store/reducers';
import { getCurrentInterval } from '../../../store/reducers/timer/selectors';
import { getSecondsDifferenceOfDate } from '../../../utils';
import Interval from '../interval';

interface ITimerProps {
  currentInterval: number;
}

interface ITimerState {
  currentTime:  number;
  startTime:  number;
}

class Timer extends React.PureComponent<ITimerProps, ITimerState> {
  private timerId: any;
  constructor(props: ITimerProps) {
    super(props);

    this.state = {
      currentTime: 0,
      startTime: 0,
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.handleTick = this.handleTick.bind(this);
  }

  public render(): React.ReactElement {
    const { currentInterval } = this.props;
    const { currentTime } = this.state;
    const isControlAvailable = currentInterval > 0;

    return (
      <div>
        <Interval />
        <div>
          Секундомер: {currentTime} сек.
        </div>
        <div>
          <button disabled={!isControlAvailable} onClick={this.handleStart}>Старт</button>
          <button disabled={!isControlAvailable} onClick={this.handleStop}>Стоп</button>
        </div>
      </div>
    );
  }

  private handleStart(): void {
    const { currentInterval } = this.props;
    if (currentInterval > 0) {
      this.setState({
        startTime: Date.now(),
      });
      this.startTimer(this.handleTick);
    }
  }

  private handleTick(): void {
    const { startTime } = this.state;
    this.setState({
      currentTime: getSecondsDifferenceOfDate(startTime),
    });
  }

  private startTimer(handleTick: () => void): void {
    const { currentInterval } = this.props;
    this.timerId = setTimeout(() => {
      clearTimeout(this.timerId);
      handleTick();
      this.startTimer(handleTick);
    }, currentInterval * 1000);
  }

  private handleStop(): void {
    clearTimeout(this.timerId);
    this.setState({
      currentTime: 0,
    });
  }
}

const mapStateToProps = (state: IState) => ({
  currentInterval: getCurrentInterval(state)
});

export default connect(mapStateToProps)(Timer);
