import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutlet, useMatch } from "react-router-dom";
import { getProfiles, saveProfiles } from "../operations/localProfile";
import { logout } from "../redux/slicers/profile";
import heroLogo from "../res/logo2.png";
import Board from "./Board";
import "./dashboard.scss";
import "../components/Modal.scss";

export default function Dashboard() {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile);
  const sellers = useSelector((store) => store.sellers);
  const navigate = useNavigate();
  const outlet = useOutlet();

  const isSellersRoute = useMatch("/dashboard/sellers");
  const isSellerCreateRoute = useMatch("/dashboard/seller/create");

  useEffect(() => {
    if (!profile.user) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const doSaveLogout = () => {
    const profiles = getProfiles();
    const currProfile = profiles.find((item) => item.user === profile.user);
    currProfile.data = sellers;
    saveProfiles(profiles);
    dispatch(logout());
    navigate("/");
  };

  return (
    <div key="main" className="dashboard">
      <div key="sidebar" className="sidebar">
        <div onClick={() => navigate("/dashboard")} className="sidebarTopLogo">
          <img src={heroLogo} alt="Next invoice" />
          <p>
            Next <span>Invoice</span>
          </p>
        </div>
        <div className="myAccountBar">
          <div className="fCont">
            <i className="ri-user-2-line"></i>
            <p className="ellipsis">{profile.user}</p>
          </div>
          <button onClick={() => doLogout()}>
            <i className="ri-logout-box-line"></i>
          </button>
        </div>

        {sellers.map(
          (item) =>
            item.isPrimary && (
              <>
                <div key="seller" className="sectionHeaderWrapper">
                  <div className="sectionHeader">Primary Seller</div>
                </div>

                <div key="sellerInfo" className="primarySellerCard">
                  <div className="header ellipsis">{item.name}</div>
                  <div>
                    <i className="ri-barcode-box-fill"></i>
                    <div className="gstin">{item.gstNumber}</div>
                  </div>
                  <button
                    className="uiTextOnlyButton"
                    onClick={() => navigate("/dashboard/sellers")}
                  >
                    Change
                  </button>
                  <img
                    className="logo"
                    src={item.photoUrl || heroLogo}
                    alt="Next invoice"
                  />
                </div>
              </>
            )
        )}

        <div className="sectionHeaderWrapper">
          <div className="sectionHeader">Actions</div>
        </div>
        <div className="sidebarActionList customScroll">
          <div
            onClick={() => navigate("/dashboard/sellers")}
            className={`item ${isSellersRoute && "selected"}`}
          >
            <div className="iconCont">
              <i className="ri-arrow-right-s-line"></i>
            </div>
            <div className="itemName">Sellers</div>
          </div>
          <div
            onClick={() => navigate("/dashboard/seller/create")}
            className={`item ${isSellerCreateRoute && "selected"}`}
          >
            <div className="iconCont">
              {/* <i className="ri-arrow-right-s-line"></i> */}
            </div>
            <div className="itemName">Create Seller</div>
          </div>
          <div
            onClick={() => navigate("/dashboard/invoice/generate")}
            className={`item`}
          >
            <div className="iconCont">
              {/* <i className="ri-arrow-right-s-line"></i> */}
            </div>
            <div className="itemName">Navigate Generate Invoice</div>
          </div>
        </div>
        {sellers.length !== 0 ? (
          <div
            onClick={() => navigate("/dashboard/invoice/create")}
            className="createInvoiceButton"
          >
            <i className="ri-magic-line"></i>
            <div className="btnText">
              <div>Create</div>
              <div>Invoice</div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => navigate("/dashboard/seller/create")}
            className="createInvoiceButton seller"
          >
            <i className="ri-store-3-fill"></i>
            <div className="btnText">
              <div>Create</div>
              <div>Seller</div>
            </div>
          </div>
        )}
      </div>

      {/* <div>
        <h1>User: {profile.user}</h1>
        <button onClick={() => doLogout()}>Logout</button>
        <button onClick={() => doSaveLogout()}>Save and Logout</button>
      </div> */}
      <div className="mainDashboardRoot">{outlet || <Board />}</div>
    </div>
  );
}
