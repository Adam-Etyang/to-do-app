import "./sidebar.css";
import { useState, useEffect } from "react";

export default function Sidebar({ isOpen, onClose, children }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isClosing ? "closing" : ""}`}
        onClick={handleClose}
      ></div>
      <div className={`main-container ${isClosing ? "closing" : ""}`}>
        <div className="sidebar-header">
          <h2>Tasks</h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="sidebar-content">{children}</div>
      </div>
    </>
  );
}
