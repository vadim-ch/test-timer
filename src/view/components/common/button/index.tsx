import React from 'react';
import { ButtonBox } from './elements';

interface IButtonProps {
  color?: 'green' | 'red' | 'blue' | 'ghost';
  onClick?: any;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export const Button: React.FC<IButtonProps> = React.memo(({
  color = 'green',
  children,
  onClick,
  disabled,
  type = 'button',
}) => {
  return (
    <ButtonBox
      type={type}
      onClick={onClick}
      color={color}
      disabled={disabled}
    >
      {children}
    </ButtonBox>
  );
});
