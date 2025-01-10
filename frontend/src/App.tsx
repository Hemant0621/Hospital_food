// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing";
import Manager from "./components/Manager/Manager";
import Pantry from "./components/Pantry";
import AuthPage from "./components/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login/:role" element={< AuthPage/>} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/pantry" element={<Pantry />} />
      </Routes>
    </Router>
  );
}

export default App;
