import React from "react";
import "./AccentType.scss";

export default function AccentType({ value, sets }) {
  return (
    <div className="accent-type">
      <div className="palette">
        <div
          style={{
            background: `var(--${sets[value].background})`,
            color: `var(--${sets[value].foreground})`,
          }}
          className="background"
        >
          A
        </div>
      </div>
      <p>{sets[value].name}</p>
    </div>
  );
}
