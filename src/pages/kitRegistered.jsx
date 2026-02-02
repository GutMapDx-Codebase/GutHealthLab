import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./CSS/kitRegistered.css";

const KitRegistered = () => {
  const navigate = useNavigate();

  const handleSubmitAnother = () => {
    navigate("/registeryourkits");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h1 class="main-heading">GutHealth<span>Lab</span></h1>
        {/* <h2>Thank you</h2> */}
        <p>Thank you for registering your kit!</p>
        <p className="subtext">
          You can now send your sample back to our laboratory following the directions in the instructions for use.
        </p>
        <div className="modal-button-group">
          <button
            onClick={handleSubmitAnother}
            className="modal-btn modal-btn-primary"
          >
            Submit Another
          </button>
          {/* <a
            href="https://guthealthlab.co.uk/"
            className="modal-btn modal-btn-secondary"
          >
            Order Another Kit
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default KitRegistered
