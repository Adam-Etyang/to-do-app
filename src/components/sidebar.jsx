import "./sidebar.css";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";

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
          <div className="sidebar-title">
            <HiOutlineClipboardList className="sidebar-icon" />
            <h2>My Tasks</h2>
          </div>
          <button className="close-button" onClick={handleClose}>
            <MdClose />
          </button>
        </div>
        <div className="sidebar-content">{children}</div>
      </div>
    </>
  );
}
