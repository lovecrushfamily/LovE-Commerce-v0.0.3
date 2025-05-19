import { BrowserRouter, Routes, Route } from "react-router-dom";
import "primeicons/primeicons.css";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";







export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} /> */}
        
      </Routes>
    </BrowserRouter>
  );
}