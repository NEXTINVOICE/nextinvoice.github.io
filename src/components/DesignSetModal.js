import React from "react";
import "./DesignSetModal.scss";
import DesignType from "./DesignType";

export default function DesignSetModal({ show, sets, apply, enabled }) {
  return (
    <div className="modal">
      <div className="modal-cont">
        <div
          className="closeBtn"
          onClick={() => {
            show(false);
          }}
        >
          <i className="ri-close-line"></i>
        </div>
        <div className="modalHeader">
          <div className="title">Invoice Styles</div>
        </div>

        <div className="customScroll">
          <div className="modalItemList">
            {sets.map((item, index) => (
              <div
                className={`uiInputCont ${
                  enabled === index ? "activated" : "normal"
                }`}
                onClick={() => {
                  apply(index);
                  show(false);
                }}
              >
                {enabled === index && (
                  <div className="activatedCheck">
                    <i className="ri-check-double-line"></i>
                  </div>
                )}
                <div className="elementType">
                  <div className="wrapper">
                    <img src={item.photo} alt="Invoice type"></img>
                    <div>{item.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
