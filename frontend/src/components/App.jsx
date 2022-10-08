import '../styles/App.css';
import { GoogleMapContainer } from './GoogleMapContainer';
import { Filters } from './Filters';

function App() {
  return (
    <div className="app">
      <Filters />
      <GoogleMapContainer />
    </div>
  );
}

export default App;
