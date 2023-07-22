import React from 'react'
import "./CustomGridSelect.scss"

export default function CustomGridSelect({values, selected, onChange}) {
  return (
    <div type="customSelectInput">
        {values.map((item, key) => (
            <div key={key} className={`item ${selected === item ? "selected" : ""}`} onClick={() => onChange(item)}>{item}</div>
        ))}
    </div>
  )
}
