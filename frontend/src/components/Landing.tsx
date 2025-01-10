import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Select Your Role</h1>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="" disabled>
          Choose Role
        </option>
        <option value="manager">Manager</option>
        <option value="pantry">Pantry</option>
        <option value="delivery">Delivery</option>
      </select>
      <button
        disabled={!role}
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Login
      </button>
    </div>
  );
};

export default LandingPage;
