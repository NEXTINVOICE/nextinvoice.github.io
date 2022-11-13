import React from "react";
import AccentType from "./AccentType";

export default function AccentSetModal({ show, sets, apply }) {
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
              <AccentType value={index} sets={sets} />
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
