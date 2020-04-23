import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../store/reducers';
import { getCurrentInterval } from '../../../store/reducers/timer/selectors';
import Interval from '../interval';

interface ITimerProps {
  currentInterval: number;
}

interface ITimerState {
  currentTime:  number;
}

class Timer extends React.Component<ITimerProps, ITimerState> {
  constructor(props: ITimerProps) {
    super(props);

    this.state = {
      currentTime: 0
    }
  }

  render(): React.ReactElement {
    return (
      <div>
        <Interval />
        <div>
          Секундомер: {this.state.currentTime} сек.
        </div>
        <div>
          <button onClick={this.handleStart}>Старт</button>
          <button onClick={this.handleStop}>Стоп</button>
        </div>
      </div>
    );
  }

  handleStart() {
    setTimeout(() => this.setState({
      currentTime: this.state.currentTime + this.props.currentInterval,
    }), this.props.currentInterval)
  }

  handleStop() {
    this.setState({ currentTime: 0 })
  }
}

const mapStateToProps = (state: IState) => ({ currentInterval: getCurrentInterval(state) });

export default connect(mapStateToProps)(Timer);
