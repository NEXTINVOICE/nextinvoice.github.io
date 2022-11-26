import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./board.scss";
import TipCard from "./boardcomponents/TipCard";

export default function Board() {
  const navigate = useNavigate();
  const sellers = useSelector((state) => state.sellers);
  const profile = useSelector((state) => state.profile);

  const [requiresSave, setRequiresSave] = useState(false);

  useEffect(() => {
    if (profile.user) {
      const lData = JSON.parse(localStorage.getItem("nxtInvProfiles"));
      const user = lData.find(
        (item) => item.user.toLowerCase() === profile.user.toLowerCase()
      );

      if (JSON.stringify(sellers) !== JSON.stringify(user.data)) {
        setRequiresSave(true);
      } else {
        setRequiresSave(false);
      }
    }
  }, [sellers]);
  return (
    <div className="boardWrapper">
      <div className="boardTitle">Dashboard</div>
      <div className="sectionHeaderWrapper">
        <div className="sectionHeader">Recommanded</div>
      </div>
      <div className="tipList">
        {requiresSave && (
          <TipCard
            type="alert"
            msg="Some changes are made with sellers. Kindly save your profile. Otherwise changes will not be added in next login"
          >
            <div className="tipBtn">Save</div>
          </TipCard>
        )}

        {sellers.length === 0 && (
          <TipCard
            type="info"
            msg="Currently you don't have any seller. Create one seller then procced with your invoice creation."
          >
            <div
              className="tipBtn"
              onClick={() => navigate("/dashboard/seller/create")}
            >
              Create Seller
            </div>
          </TipCard>
        )}
      </div>
    </div>
  );
}
