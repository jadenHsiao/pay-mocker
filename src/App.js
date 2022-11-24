import './App.css';

import { BrowserRouter } from 'react-router-dom';
import LayOut from "./pages/LayOut";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <LayOut />
        </BrowserRouter>
    </div>
  );
}

export default App;
