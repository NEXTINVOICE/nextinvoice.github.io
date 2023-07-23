import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccentSetModal from "../../components/AccentSetModal";
import DesignSetModal from "../../components/DesignSetModal";
import SignSetModal from "../../components/SignSetModal";
import { sellerNormalizer } from "../../operations/normalizer";
import {
  invoiceDesignSets,
  signatureDesignSets,
  accentSets,
} from "../../operations/stylesets";
import { sellerValidator } from "../../operations/validators";
import { createSeller } from "../../redux/slicers/sellers";
import ValidationBox from "./ValidationBox";

export default function CreateSeller() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [pan, setPan] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [bankIFSC, setBankIFSC] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [digitalSignName, setDigitalSignName] = useState("");
  const [digitalSignType, setDigitalSignType] = useState(0);
  const [accentType, setAccentType] = useState(0);
  const [invoiceDesignType, setInvoiceDesignType] = useState(0);
  const [includeBankDetails, setIncludeBankDetails] = useState(false);
  const [includeTermsAndConditions, setIncludeTermsAndConditions] =
    useState(false);
  const [generateQr, setGenerateQr] = useState(true);
  const [generateInv, setGenerateInv] = useState(true);

  const [validation, setValidation] = useState([]);

  const [showDigitalSignType, setShowDigitalSignType] = useState(false);
  const [showAccentType, setShowAccentType] = useState(false);
  const [showInvoiceTypeModal, setShowInvoiceTypeModal] = useState(false);

  const [showValidationBox, setShowValidationBox] = useState(false);

  const sellers = useSelector((store) => store.sellers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPrimary, setIsPrimary] = useState(() => {
    return sellers.length === 0 ? true : false;
  });

  const doCreateSeller = () => {
    const data = {
      name,
      address,
      mob,
      email,
      photoUrl,
      pan,
      accountHolderName,
      accountNumber,
      bankName,
      bankBranch,
      bankIFSC,
      gstNumber,
      termsAndConditions,
      digitalSignName,
      digitalSignType,
      accentType,
      invoiceDesignType,
      includeBankDetails,
      includeTermsAndConditions,
      generateQr,
      generateInv,
      isPrimary,
    };

    // Name validation existence
    const currName = name.toLowerCase().trim();
    const sellerExists = sellers.find(
      (item) => item.name.toLowerCase() === currName
    );

    const retValidation = sellerValidator(data);
    setValidation(retValidation);

    if (retValidation.length > 0) return;

    if (sellerExists) {
      setValidation(["Seller exists. Try different name."]);
      return;
    }

    const normalizedData = sellerNormalizer(data);

    dispatch(createSeller(normalizedData));
    navigate("/dashboard", { replace: true });
  };
  return (
    <div className="boardWrapper sellersPage sellerPage customScroll2">
      <div className="boardTitle">
        <i onClick={() => navigate(-1)} className="ri-arrow-left-s-line"></i>
        Create Seller
      </div>
      <div className="scrollWrapper">
        <div className="sectionHeaderWrapper">
          <div className="sectionHeader">Creating {name ? name : "Seller"}</div>
        </div>

        <div className="sellerListCard sellerCard">
          {photoUrl ? (
            <div
              style={{ backgroundImage: `url('${photoUrl}')` }}
              className="logoCont"
            ></div>
          ) : (
            <div className="logoCont optional">
              <i class="ri-store-3-fill"></i>
            </div>
          )}

          <div className="infoCont">
            <div className="sellerName">{name ? name : "Seller Name"}</div>
            <div className="sellerAddress">
              {address ? address : "Seller Address"}
            </div>
          </div>
          <div className="actionCont">
            <div
              onClick={() => {
                setIsPrimary(!isPrimary);
              }}
              className={`uiToggleSwitcher ${isPrimary && "selected"} ${
                sellers.length === 0 && "disabled"
              }`}
            ></div>
          </div>
        </div>

        <div className="sectionHeaderWrapper extraMargin">
          <div className="sectionHeader box">Personal</div>
        </div>
        <div className="inputSets">
          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="name">Seller Name</label>
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="address">Seller Address</label>
            </div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="address"
              id="address"
            ></textarea>
          </div>
        </div>

        <div className="inputSets">
          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="mobile">Mobile Number</label>
            </div>
            <input
              value={mob}
              onChange={(e) => setMob(e.target.value)}
              type="number"
              name="mobile"
              id="mobile"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="email">Email</label>
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="photo">Logo URL</label>
            </div>
            <input
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              type="text"
              name="photo"
              id="photo"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="pan">PAN</label>
            </div>
            <input
              value={pan}
              onChange={(e) => setPan(e.target.value)}
              type="text"
              name="pan"
              id="pan"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="gstNumber">GST Number</label>
            </div>
            <input
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              type="text"
              name="gstNumber"
              id="gstNumber"
            ></input>
          </div>
        </div>

        <div className="sectionHeaderWrapper extraMargin">
          <div className="sectionHeader box">Bank Details</div>
        </div>

        <div className="toggleElem">
          <div>Include Bank Details</div>
          <div
            onClick={() => {
              setIncludeBankDetails(!includeBankDetails);
            }}
            className={`uiToggleSwitcher ${includeBankDetails && "selected"} ${
              sellers.length === 1 && "disabled"
            }`}
          ></div>
        </div>

        <div className={`inputSets ${!includeBankDetails && "disabled"}`}>
          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="accountHolderName">Account Holder</label>
            </div>
            <input
              value={accountHolderName}
              onChange={
                !includeBankDetails
                  ? () => {}
                  : (e) => setAccountHolderName(e.target.value)
              }
              type="text"
              name="accountHolderName"
              id="accountHolderName"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="accountNumber">Account Number</label>
            </div>
            <input
              value={accountNumber}
              onChange={
                !includeBankDetails
                  ? () => {}
                  : (e) => setAccountNumber(e.target.value)
              }
              type="text"
              name="accountNumber"
              id="accountNumber"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="bankName">Bank Name</label>
            </div>
            <input
              value={bankName}
              onChange={
                !includeBankDetails
                  ? () => {}
                  : (e) => setBankName(e.target.value)
              }
              type="text"
              name="bankName"
              id="bankName"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="bankBranch">Bank Branch</label>
            </div>
            <input
              value={bankBranch}
              onChange={
                !includeBankDetails
                  ? () => {}
                  : (e) => setBankBranch(e.target.value)
              }
              type="text"
              name="bankBranch"
              id="bankBranch"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="bankIFSC">Bank IFSC</label>
            </div>
            <input
              value={bankIFSC}
              onChange={
                !includeBankDetails
                  ? () => {}
                  : (e) => setBankIFSC(e.target.value)
              }
              type="text"
              name="bankIFSC"
              id="bankIFSC"
            ></input>
          </div>
        </div>

        <div className="toggleElem">
          <div>Include Terms and conditions</div>
          <div
            onClick={() => {
              setIncludeTermsAndConditions(!includeTermsAndConditions);
            }}
            className={`uiToggleSwitcher ${
              includeTermsAndConditions && "selected"
            } ${sellers.length === 1 && "disabled"}`}
          ></div>
        </div>

        <div
          className={`inputSets ${!includeTermsAndConditions && "disabled"}`}
        >
          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="termsAndConditions">Terms and Conditions</label>
            </div>
            <textarea
              placeholder="Write Something"
              className="customScroll"
              value={termsAndConditions}
              onChange={
                !includeTermsAndConditions
                  ? () => {}
                  : (e) => setTermsAndConditions(e.target.value)
              }
              type="text"
              name="termsAndConditions"
              id="termsAndConditions"
            ></textarea>
          </div>
        </div>

        <div className="sectionHeaderWrapper extraMargin">
          <div className="sectionHeader box">Digital signature</div>
        </div>

        <div className="inputSets">
          <div className="uiInputCont">
            <div className="inputTopBar">
              <label htmlFor="digitalSignName">Digital Signature</label>
            </div>
            <input
              value={digitalSignName}
              onChange={(e) => setDigitalSignName(e.target.value)}
              type="text"
              name="digitalSignName"
              id="digitalSignName"
            ></input>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label>Digital Signature Type</label>
            </div>
            <div className="elementType alt">
              <div className="wrapper">
                <img
                  src={signatureDesignSets[digitalSignType].photo}
                  alt="signature type"
                ></img>
              </div>

              <i
                onClick={() => setShowDigitalSignType(!showDigitalSignType)}
                className="ri-edit-box-line"
              ></i>
            </div>
          </div>
        </div>

        <div className="sectionHeaderWrapper extraMargin">
          <div className="sectionHeader box">Invoice Preferences</div>
        </div>

        <div className="inputSets">
          <div className="uiInputCont">
            <div className="inputTopBar">
              <label>Invoice Style</label>
            </div>
            <div className="elementType">
              <div className="wrapper">
                <img
                  src={invoiceDesignSets[invoiceDesignType].photo}
                  alt="Invoice type"
                ></img>
                <div>{invoiceDesignSets[invoiceDesignType].name}</div>
              </div>

              <i
                onClick={() => setShowInvoiceTypeModal(!showInvoiceTypeModal)}
                className="ri-edit-box-line"
              ></i>
            </div>
          </div>

          <div className="uiInputCont">
            <div className="inputTopBar">
              <label>Invoice Theme</label>
            </div>
            <div className="elementType">
              <div className="wrapper">
                <div className="accentBlock">
                  <div
                    style={{
                      background: `var(--${accentSets[accentType].palettes[3].background})`,
                    }}
                    className="accent"
                  >
                    <div
                      style={{
                        background: `var(--${accentSets[accentType].palettes[0].background})`,
                      }}
                      className="accent"
                    >
                      <div
                        style={{
                          background: `var(--${accentSets[accentType].palettes[2].background})`,
                        }}
                        className="accent"
                      ></div>
                    </div>
                  </div>
                </div>
                <div>{accentSets[accentType].name}</div>
              </div>

              <i
                onClick={() => setShowAccentType(!showAccentType)}
                className="ri-edit-box-line"
              ></i>
            </div>
          </div>
        </div>

        <div className="inputSets" style={{ marginBottom: "3rem" }}>
          <div className="toggleElem">
            <div>Generate QR</div>
            <div
              onClick={() => {
                setGenerateQr(!generateQr);
              }}
              className={`uiToggleSwitcher ${generateQr && "selected"} ${
                sellers.length === 1 && "disabled"
              }`}
            ></div>
          </div>

          <div className="toggleElem">
            <div>Generate Invoice File</div>
            <div
              onClick={() => {
                setGenerateInv(!generateInv);
              }}
              className={`uiToggleSwitcher ${generateInv && "selected"} ${
                sellers.length === 1 && "disabled"
              }`}
            ></div>
          </div>
        </div>
      </div>
      <div className="bottomActionBar">
        <button className="uiColoredIcoBtn" onClick={() => doCreateSeller()}>
          <i className="ri-save-2-line"></i>Save
        </button>
        <button
          className="uiColoredIcoBtn red"
          onClick={() => navigate(-1, { replace: true })}
        >
          <i className="ri-close-circle-line"></i>Cancel
        </button>

        <button
          className="uiColoredIcoBtn green disabled"
          onClick={() => navigate(-1, { replace: true })}
        >
          <i className="ri-restart-fill"></i>Reset
        </button>
        {validation.length > 0 && (
          <button
            className="uiColoredSpecBtn validationBtn"
            onClick={
              !showValidationBox ? () => setShowValidationBox(true) : null
            }
          >
            <ValidationBox
              showValidationBox={showValidationBox}
              setShowValidationBox={setShowValidationBox}
              validation={validation}
            />
            <i className="ri-error-warning-line"></i>
            <div>Validation Error</div>
          </button>
        )}
      </div>

      {showAccentType && (
        <AccentSetModal
          show={setShowAccentType}
          sets={accentSets}
          apply={setAccentType}
          enabled={accentType}
        />
      )}

      {showDigitalSignType && (
        <SignSetModal
          show={setShowDigitalSignType}
          sets={signatureDesignSets}
          apply={setDigitalSignType}
          enabled={digitalSignType}
        />
      )}
      {showInvoiceTypeModal && (
        <DesignSetModal
          show={setShowInvoiceTypeModal}
          sets={invoiceDesignSets}
          apply={setInvoiceDesignType}
          enabled={invoiceDesignType}
        />
      )}
    </div>
  );
}
