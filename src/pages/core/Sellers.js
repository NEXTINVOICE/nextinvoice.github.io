import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteSellerModal from "../../components/DeleteSellerModal";
import { selectSeller } from "../../redux/slicers/seller";
import { replaceSeller } from "../../redux/slicers/sellers";
import "./sellers.scss";

export default function Sellers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sellers = useSelector((store) => store.sellers);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [currIndex, setIndex] = useState(0);

  return (
    <div className="boardWrapper sellersPage">
      <div className="boardTitle">
        <i onClick={() => navigate(-1)} className="ri-arrow-left-s-line"></i>
        Sellers
      </div>
      <div className="sectionHeaderWrapper">
        <div className="sectionHeader">Seller list</div>
      </div>

      <div className="sellerList customScroll">
        {sellers.map((item, index) => (
          <div className="sellerListCard" key={index}>
            {item.photoUrl ? (
              <div
                style={{ backgroundImage: `url('${item.photoUrl}')` }}
                className="logoCont"
              ></div>
            ) : (
              <div className="logoCont optional">
                <i class="ri-store-3-fill"></i>
              </div>
            )}

            <div className="infoCont">
              <div className="sellerName">{item.name}</div>
              <div className="sellerAddress">{item.address}</div>
            </div>
            <div className="actionCont">
              <i
                onClick={() => {
                  dispatch(selectSeller(item));
                  navigate("/dashboard/seller/edit");
                }}
                className="ri-edit-box-line"
              ></i>
              <i
                onClick={() => {
                  setIndex(index);
                  setShowSellerModal(true);
                }}
                className="ri-delete-bin-fill"
              ></i>
              <div
                onClick={() => {
                  dispatch(
                    replaceSeller({
                      name: item.name,
                      data: { ...item, isPrimary: !item.isPrimary },
                    })
                  );
                }}
                className={`uiToggleSwitcher ${item.isPrimary && "selected"} ${
                  sellers.length === 1 && "disabled"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {showSellerModal && (
        <DeleteSellerModal index={currIndex} show={setShowSellerModal} />
      )}
    </div>
  );
}
