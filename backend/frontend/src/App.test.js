import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './components/App';

test('renders NYC Basics text', () => {
  render(<App />);
  const linkElement = screen.getByText(/NYC Basics/i);
  expect(linkElement).toBeInTheDocument();
});
