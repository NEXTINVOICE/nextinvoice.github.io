import React from "react";
import "./DesignSetModal.scss";
import DesignType from "./DesignType";

export default function DesignSetModal({ show, sets, apply }) {
  return (
    <div className="modal">
      <div className="modal-cont">
        <div className="design-sets">
          {sets.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                apply(index);
                show(false);
              }}
            >
              <DesignType value={index} sets={sets} />
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            show(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
