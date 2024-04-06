import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Shop />} /> */}
        <Route index element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
