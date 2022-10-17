import React from "react";
import "./DesignType.scss";

export default function DesignType({ value, sets }) {
  return (
    <div className="design-type">
      <div
        className="design-photo"
        style={{ backgroundImage: `url(${sets[value].photo})` }}
      ></div>
      <p>{sets[value].name}</p>
    </div>
  );
}
