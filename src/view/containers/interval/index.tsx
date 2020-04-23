import React from 'react';
import { connect } from 'react-redux';
import { changeInterval } from '../../../store/actions/change-interval';
import { IState } from '../../../store/reducers';
import { getCurrentInterval } from '../../../store/reducers/timer/selectors';

interface IIntervalProps {
  currentInterval: number;
  increaseInterval: () => void;
  decreaseInterval: () => void;
}

class Interval extends React.PureComponent<IIntervalProps, {}> {
  render(): React.ReactElement {
    const { currentInterval, increaseInterval, decreaseInterval } = this.props;
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
  }
}

const mapStateToProps = (state: IState) => ({ currentInterval: getCurrentInterval(state) });
const mapDispatchToProps = (dispatch: any) => ({
  decreaseInterval: () => dispatch(changeInterval(-1)),
  increaseInterval: () => dispatch(changeInterval(1))
});

export default connect(mapStateToProps, mapDispatchToProps)(Interval);
