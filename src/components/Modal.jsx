import React from "react";
import ReactModal from "react-modal";

// Set the app element for accessibility
ReactModal.setAppElement("#root");

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 z-40"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
        <div className="p-4 flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </ReactModal>
  );
}

export default Modal;
