// src/components/auth/RegisterModal.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Modal from "../Modal";
import { auth } from "../../firebase";

function RegisterModal({ isOpen, onClose, openLoginModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
      onClose(); // Close the modal on successful registration
    } catch (err) {
      setError(err.message);
    }
  };

  const redirectToLogin = () => {
    onClose();
    openLoginModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          🔑 Register
        </h2>
        <p className="text-center mb-4 text-black">Create a new account</p>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 mb-4 border rounded text-gray-700"
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
            className="w-full p-2 mb-4 border rounded text-gray-700"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full p-2 mb-4 border rounded text-gray-700"
            placeholder="*******"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <div className="mt-2">
          <span className="text-black">Already have an account? </span>
          <span
            className="loginText text-blue-500 hover:text-blue-700 cursor-pointer underline"
            onClick={redirectToLogin}
          >
            Login here
          </span>
        </div>
      </div>
    </Modal>
  );
}

export default RegisterModal;
