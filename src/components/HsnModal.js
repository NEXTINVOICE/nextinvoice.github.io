import React, { useState } from "react";
import "./hsnModal.scss";
import hsnList from "../operations/hsnMapping.json";

export default function HsnModal({ show, setMainHsn, setMainGst }) {
  const [name, setName] = useState("");
  const [hsn, setHsn] = useState("");
  const [gst, setGst] = useState("");

  // For manual input
  const [coreHsn, setCoreHsn] = useState("");
  const [coreGst, setCoreGst] = useState("0");

  const [showManualInputs, setShowManualInputs] = useState(false);
  return (
    <div className="modal">
      <div className="modal-cont">
        <>
          <div>Select HSN</div>
          <div>
            <h4>Current Selection</h4>
            <div>HSN: {coreHsn ? coreHsn : "N/A"} </div>
            <div>GST: {coreGst}</div>
          </div>

          {showManualInputs && (
            <>
              <input
                value={coreHsn}
                onChange={(e) => setCoreHsn(e.target.value)}
                type="number"
                placeholder="Enter HSN"
              ></input>
              <input
                value={coreGst}
                onChange={(e) => setCoreGst(e.target.value)}
                type="number"
                placeholder="Enter Gst Rate"
              ></input>
              <div>
                Want to pick from HSN list?{" "}
                <button onClick={() => setShowManualInputs(false)}>
                  Pick from List
                </button>
              </div>
            </>
          )}

          {!showManualInputs && (
            <>
              <div>
                Items not in the list?{" "}
                <button onClick={() => setShowManualInputs(true)}>
                  Put Manually
                </button>
              </div>

              <div className="hsnList">
                <div>
                  <div>
                    <div>Items</div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Search Item"
                    />
                  </div>
                  <div>
                    <div>HSN CODE</div>
                    <input
                      value={hsn}
                      onChange={(e) => setHsn(e.target.value)}
                      type="text"
                      placeholder="Search HSN"
                    />
                  </div>
                  <div>
                    <div>GST RATE</div>
                    <input
                      value={gst}
                      onChange={(e) => setGst(e.target.value)}
                      type="text"
                      placeholder="Filter GST rate"
                    />
                  </div>
                </div>
                <div></div>
                {hsnList.map((item, key) =>
                  name !== "" &&
                  !item.items
                    .toString()
                    .toLowerCase()
                    .includes(name.toLowerCase()) ? null : hsn !== "" &&
                    !item.hsnCode.includes(hsn) ? null : gst !== "" &&
                    item.gstRate !== gst ? null : (
                    <div
                      key={key}
                      onClick={() => {
                        setCoreHsn(item.hsnCode);
                        setCoreGst(item.gstRate);
                      }}
                    >
                      <div>{item.items.map((myItem) => myItem + ", ")}</div>
                      <div>{item.hsnCode}</div>
                      <div>{item.gstRate}</div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </>
        <button
          onClick={() => {
            setMainHsn(coreHsn);
            setMainGst(coreGst);
            show(false);
          }}
        >
          Apply
        </button>
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
