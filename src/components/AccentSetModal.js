import React from "react";
// import AccentType from "./AccentType";
// Some props are inherited from Modal.scss

export default function AccentSetModal({ show, sets, apply, enabled }) {
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
          <div className="title">Invoice Theme Color</div>
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
                    <div className="accentBlock">
                      <div
                        style={{
                          background: `var(--${item.palettes[3].background})`,
                        }}
                        className="accent"
                      >
                        <div
                          style={{
                            background: `var(--${item.palettes[0].background})`,
                          }}
                          className="accent"
                        >
                          <div
                            style={{
                              background: `var(--${item.palettes[2].background})`,
                            }}
                            className="accent"
                          ></div>
                        </div>
                      </div>
                    </div>
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
