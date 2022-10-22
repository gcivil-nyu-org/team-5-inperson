import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import App from './components/App';
import { server } from './tests/server'
import { benchMock } from './tests/mock';

jest.mock('@react-google-maps/api', () => ({
  GoogleMap: (props) => {
    return <mock-map data-testid="mock-map">{props.children}</mock-map>;
  },
  useJsApiLoader: () => {
    return {
      isLoaded: true,
    };
  },
  Marker: (props) => {
    return <mock-marker data-testid={props.dataTestId} />;
  }
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.setTimeout(10000);

test('renders NYC Basics text', () => {
  render(<App />);
  const linkElement = screen.getByText(/NYC Basics/i);
  expect(linkElement).toBeInTheDocument();
});

test('user location marker should show on page load', async () => {
  render(<App />);

  const googleMapElem = await screen.findByTestId('mock-map'); // To make sure that mocking is working fine
  expect(googleMapElem).toBeInTheDocument();
  const userMarker = await screen.findByTestId('user-location-marker');
  expect(userMarker).toBeInTheDocument();
});

test('all bench markers are shown and then hidden when we toggle the bench filter', async () => {
  render(<App />);

  const benchFilterBtn = screen.getByTestId('bench-filter-btn');
  userEvent.click(benchFilterBtn);

  let benchMarkers = await screen.findAllByTestId('bench-marker');
  expect(benchMarkers.length).toEqual(benchMock.length);

  userEvent.click(benchFilterBtn);

  benchMarkers = screen.queryAllByTestId('bench-marker');
  expect(benchMarkers.length).toEqual(0);

  
});
