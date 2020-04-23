import React from 'react';
import { render } from '@testing-library/react';
import App from '../view/app';

test('renders app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Секундомер/i);
  expect(linkElement).toBeInTheDocument();
});
