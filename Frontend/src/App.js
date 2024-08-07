import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Aboutus from "./pages/Aboutus";
import Clients from "./pages/Clients";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import { ProductProvider } from "./context/ProductContext";

function App() {


  return (
    <div className="App">
      <AuthProvider>
        <ProductProvider>
          <BrowserRouter>
            <Navbar />
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
