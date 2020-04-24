import styled from 'styled-components';

const white = '#fff';
const green = '#6ccd94';
const blue = '#439aff';
const red = '#f64d4d';

export const ButtonBox = styled('button')`
  width: 100%;
  padding: 9px 20px;
  color: ${white};
  font-size: 16px;
  background-color: transparent;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  transition: all .3s;

  &:focus {
    outline: 0;
  }

  background: ${(props) =>
    props.color === 'green' ?
      green :
        props.color === 'blue' ?
          blue :
          props.color === 'red' ? red : ''
  };

  ${(props) =>
  props.disabled &&
  `
    cursor: default;
    opacity: .5;
  `}
`;
