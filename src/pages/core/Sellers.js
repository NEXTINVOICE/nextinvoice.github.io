import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteSellerModal from "../../components/DeleteSellerModal";
import { selectSeller } from "../../redux/slicers/seller";

export default function Sellers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
                dispatch(selectSeller(item));
                navigate("/dashboard/seller/edit");
              }}
            >
              Edit
            </button>
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
