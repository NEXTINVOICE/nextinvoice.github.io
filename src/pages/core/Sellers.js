import React, { useState } from "react";
import { useSelector } from "react-redux";
import DeleteSellerModal from "../../components/DeleteSellerModal";

export default function Sellers() {
  const sellers = useSelector((store) => store.sellers);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [currIndex, setIndex] = useState(0);

  return (
    <div>
      <h1>Sellers</h1>
      {sellers.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.address}</p>
          <div>
            <button
              onClick={() => {
                setIndex(index);
                setShowSellerModal(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {showSellerModal && (
        <DeleteSellerModal index={currIndex} show={setShowSellerModal} />
      )}
    </div>
  );
}
