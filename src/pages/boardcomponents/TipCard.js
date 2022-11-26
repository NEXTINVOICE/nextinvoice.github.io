import React, { useState } from "react";
const typeMapping = {
  alert: "ri-alarm-warning-fill",
  info: "ri-information-fill",
};

export default function TipCard({
  children,
  type = "alert",
  msg = "No message",
}) {
  const [state, setState] = useState(true);

  return (
    state && (
      <div className={`tipCard ${type}`}>
        <div className="closeBtn" onClick={() => setState(false)}>
          <i className="ri-close-fill"></i>
        </div>
        <div className="tCont">
          <i className={typeMapping[type]}></i>
          <div className="tipTitle">{type}</div>
        </div>
        <div className="tipInfo">{msg}</div>
        <div className="tipActions">{children}</div>
      </div>
    )
  );
}
