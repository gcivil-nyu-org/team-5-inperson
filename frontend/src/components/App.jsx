import '../styles/App.css';
import { GoogleMapContainer } from './GoogleMapContainer';
import { Filters } from './Filters';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div className="app">
      {/* Might move ChakraProvider inside the Filters itself to declutter.*/}
      <ChakraProvider>
        <Filters />
      </ChakraProvider>
      <GoogleMapContainer />
    </div>
  );
}

export default App;
