// src/components/LoginPage.jsx
import React, { useState } from "react";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";

function LoginPage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false); // Set to false by default
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-customDarkBlue via-customLightBlue to-customTeal text-white flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Access Restricted
        </h2>
        <p className="text-center mb-4 text-black">
          You need to log in or create an account to access this page.
        </p>
        <button
          onClick={openLoginModal}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2"
        >
          Login
        </button>
        <button
          onClick={openRegisterModal}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </button>
      </div>
      <LoginModal
        isOpen={loginModalOpen}
        onClose={closeLoginModal}
        openRegisterModal={openRegisterModal}
      />
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={closeRegisterModal}
        openLoginModal={openLoginModal}
      />
    </div>
  );
}

export default LoginPage;