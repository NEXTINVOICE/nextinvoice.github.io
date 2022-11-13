import React from "react";
import "./AccentType.scss";

export default function AccentType({ value, sets }) {
  return (
    <div className="accent-type">
      <div className="palettes">
        <div
          style={{
            background: `var(--${sets[value].palettes[3].background})`,
            color: `var(--${sets[value].palettes[3].foreground})`,
          }}
        >
          A
        </div>
        <div
          style={{
            background: `var(--${sets[value].palettes[0].background})`,
            color: `var(--${sets[value].palettes[0].foreground})`,
          }}
        >
          A
        </div>
        <div
          style={{
            background: `var(--${sets[value].palettes[1].background})`,
            color: `var(--${sets[value].palettes[1].foreground})`,
          }}
        >
          A
        </div>
        <div
          style={{
            background: `var(--${sets[value].palettes[2].background})`,
            color: `var(--${sets[value].palettes[2].foreground})`,
          }}
        >
          A
        </div>
      </div>
      <p>{sets[value].name}</p>
    </div>
  );
}
