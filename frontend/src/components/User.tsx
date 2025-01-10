// pages/AuthPage.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
  const { role } = useParams();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // For registration only
  const [name, setName] = useState(""); // For registration only
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        // Login
        const response = await axios.post("http://localhost:5000/auth/login", { email, password });
        localStorage.setItem("token", response.data.token);
        if(role=='manager'){
          navigate('/manager')
        }else{
          navigate(`/pantry`);
        }
      } else {
        // Registration
        await axios.post("http://localhost:5000/auth/register", { name, username, email, password, role });
        alert("Registration successful. Please log in.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error(isLogin ? "Login failed" : "Registration failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? `Login as ${role}` : `Register as ${role}`}
      </h1>

      {!isLogin && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded mb-4"
          />
        </>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {isLogin ? "Login" : "Register"}
      </button>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-500 underline"
      >
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default AuthPage;
