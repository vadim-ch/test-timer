import React from 'react';
import { connect } from 'react-redux';
import { changeInterval } from '../../../store/actions/change-interval';
import { IState } from '../../../store/reducers';
import { getCurrentInterval } from '../../../store/reducers/timer/selectors';

interface IIntervalProps {
  currentInterval: number;
  changeInterval: (value: number) => void;
}

class Interval extends React.Component<IIntervalProps, {}> {
  render(): React.ReactElement {
    return (
      <div>
        <span>Интервал обновления секундомера: {this.props.currentInterval} сек.</span>
        <span>
         <button onClick={() => this.props.changeInterval(-1)}>-</button>
         <button onClick={() => this.props.changeInterval(1)}>+</button>
       </span>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({ currentInterval: getCurrentInterval(state) });
const mapDispatchToProps = (dispatch: any) => ({ changeInterval: (value: number) => dispatch(changeInterval(value)) });

export default connect(mapStateToProps, mapDispatchToProps)(Interval);
