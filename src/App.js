
import Header from './Components/Home/Header'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
    </Routes> 
    </BrowserRouter>
  );
}

export default App;
