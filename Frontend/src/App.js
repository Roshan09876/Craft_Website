import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Aboutus from "./pages/Aboutus";
import Clients from "./pages/Clients";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/about" element={<Aboutus/>} />
      <Route path="/clients" element={<Clients/>} />
      <Route path="/products" element={<Products/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
