import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Signin from './components/Signin';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Signin />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
