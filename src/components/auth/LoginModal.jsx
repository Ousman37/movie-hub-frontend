// src/components/auth/LoginModal.jsx
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

function LoginModal({ isOpen, onClose, openRegisterModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      console.log("Attempting to sign in with email:", email);
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      onClose(); // Close the modal on successful login
      navigate("/profile"); // Redirect to profile
    } catch (err) {
      console.error("Error during sign in:", err.message);
      setError(err.message);
    }
  };

  const redirectToRegister = () => {
    onClose();
    openRegisterModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          <span role="img" aria-label="key">
            🔑
          </span>
          Login
        </h2>
        <p className="text-center mb-4 text-black">Welcome back!</p>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <div className="registerMessage mt-4 text-center">
          <span className="text-black">Don't have an account? </span>
          <span
            className="loginText text-blue-500 hover:text-blue-700 cursor-pointer underline"
            onClick={redirectToRegister}
          >
            Register
          </span>
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;
