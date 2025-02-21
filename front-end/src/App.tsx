import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";
import Home from "./components/Home.tsx";
import GamesPage from "./components/GamesPage.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/gamespage" element={<GamesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
