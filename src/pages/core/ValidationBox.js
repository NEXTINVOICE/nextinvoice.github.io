import React from "react";
import "./validationBox.scss";

export default function ValidationBox({
  validation,
  showValidationBox,
  setShowValidationBox,
}) {
  return (
    <div className={`validationBox ${!showValidationBox ? "hide" : ""}`}>
      <div className="top-bar">
        <div className="lCont">
          <i className="ri-error-warning-line errorIcon"></i>
          <div>Errors</div>
        </div>
        <i
          onClick={() => setShowValidationBox(false)}
          className="ri-arrow-drop-down-line hideIcon"
        ></i>
      </div>
      <div className="list customScroll">
        {validation.map((item) => (
          <div>{item}</div>
        ))}
      </div>
    </div>
  );
}
