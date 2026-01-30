import React from "react";
import "./CSS/thankYouModal.css";
// import thankImage from "../../public/topsellerkit.svg"; // Replace with your uploaded image
import { XCircle } from "lucide-react";


const ErrorModal = ({ isOpen, onClose, title, message,heading=null,errorCode=null }) => {
      if (!isOpen) return null;
  return (

     <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
         <XCircle className="status-icon" color="#dc2626" />
        <h2>{heading !== null ? heading + " " + errorCode : `Error ${errorCode}`}</h2>
        <p>{title}</p>
        <p className="subtext">{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
