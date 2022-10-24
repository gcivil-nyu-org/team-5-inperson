import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import App from './components/App';
import { server } from './tests/server'
import { benchMock, wifiMock, parkingMock, waterMock, toiletMock } from './tests/mock';

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

// test('all toilet markers are shown and then hidden when we toggle the toilet filter', async () => {
//   render(<App />);
//   const toiletFilterBtn = screen.getByTestId('toilet-filter-btn');
//   userEvent.click(toiletFilterBtn);
//   let toiletMarkers = await screen.findAllByTestId('toilet-marker');
//   expect(toiletMarkers.length).toEqual(toiletMock.length);
//   userEvent.click(toiletFilterBtn);
//   toiletMarkers = screen.queryAllByTestId('toilet-marker');
//   expect(toiletMarkers.length).toEqual(0);
// });

// test('all wifi markers are shown and then hidden when we toggle the wifi filter', async () => {
//   render(<App />);
//   const wifiFilterBtn = screen.getByTestId('wifi-filter-btn');
//   userEvent.click(wifiFilterBtn);
//   screen.debug()
//   let wifiMarkers = await screen.findAllByTestId('wifi-marker');
//   expect(wifiMarkers.length).toEqual(wifiMock.length);
//   userEvent.click(wifiFilterBtn);
//   wifiMarkers = screen.queryAllByTestId('wifi-marker');
//   expect(wifiMarkers.length).toEqual(0);
// });