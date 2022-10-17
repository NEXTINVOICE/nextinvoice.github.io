import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DesignSetModal from "../../components/DesignSetModal";
import DesignType from "../../components/DesignType";
import { sellerNormalizer } from "../../operations/normalizer";
import {
  invoiceDesignSets,
  signatureDesignSets,
} from "../../operations/stylesets";
import { sellerValidator } from "../../operations/validators";
import { createSeller } from "../../redux/slicers/sellers";

export default function CreateSeller() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [pan, setPan] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [bankIFSC, setBankIFSC] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [digitalSignName, setDigitalSignName] = useState("");
  const [digitalSignType, setDigitalSignType] = useState(0);
  const [invoiceDesignType, setInvoiceDesignType] = useState(0);
  const [includeBankDetails, setIncludeBankDetails] = useState(false);
  const [includeTermsAndConditions, setIncludeTermsAndConditions] =
    useState(false);

  const [validation, setValidation] = useState([]);

  const [showDigitalSignType, setShowDigitalSignType] = useState(false);
  const [showInvoiceTypeModal, setShowInvoiceTypeModal] = useState(false);

  const sellers = useSelector((store) => store.sellers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doCreateSeller = () => {
    const data = {
      name,
      address,
      mob,
      email,
      photoUrl,
      pan,
      bankName,
      bankBranch,
      bankIFSC,
      gstNumber,
      termsAndConditions,
      digitalSignName,
      digitalSignType,
      invoiceDesignType,
      includeBankDetails,
      includeTermsAndConditions,
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
    <div>
      <h2>Create Seller</h2>
      <div>
        <h4>Personal</h4>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="name"
        ></input>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          name="address"
          placeholder="address"
        ></input>
        <input
          value={mob}
          onChange={(e) => setMob(e.target.value)}
          type="text"
          name="mobile"
          placeholder="mobile"
        ></input>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="email"
        ></input>
        <input
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          type="text"
          name="photo"
          placeholder="photo"
        ></input>
        <input
          value={pan}
          onChange={(e) => setPan(e.target.value)}
          type="text"
          name="pan"
          placeholder="pan"
        ></input>
        <input
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
          type="text"
          name="gst number"
          placeholder="gst number"
        ></input>
      </div>

      <div>
        <h4>Bank</h4>
        <div>
          <input
            type="checkbox"
            id="includeBankDetails"
            name="includeBankDetails"
            value="includeBankDetails"
            checked={includeBankDetails}
            onChange={() => setIncludeBankDetails(!includeBankDetails)}
          />
          <label htmlFor="includeBankDetails">Include Bank details</label>
        </div>
        <div className={`${!includeBankDetails && "disabled"}`}>
          <input
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            type="text"
            name="bank name"
            placeholder="bank name"
          ></input>
          <input
            value={bankBranch}
            onChange={(e) => setBankBranch(e.target.value)}
            type="text"
            name="bank branch"
            placeholder="bank branch"
          ></input>
          <input
            value={bankIFSC}
            onChange={(e) => setBankIFSC(e.target.value)}
            type="text"
            name="bank ifsc"
            placeholder="bank ifsc"
          ></input>
        </div>

        <div>
          <input
            type="checkbox"
            id="includeTermsAndConditions"
            name="includeTermsAndConditions"
            value="includeTermsAndConditions"
            checked={includeTermsAndConditions}
            onChange={() =>
              setIncludeTermsAndConditions(!includeTermsAndConditions)
            }
          />
          <label htmlFor="includeTermsAndConditions">
            Include Terms and conditions
          </label>
        </div>
        <div className={`${!includeTermsAndConditions && "disabled"}`}>
          <textarea
            value={termsAndConditions}
            onChange={(e) => setTermsAndConditions(e.target.value)}
            type="textarea"
            name="terms and conditions"
            placeholder="terms and conditions"
          ></textarea>
        </div>
      </div>

      <div>
        <h4>Digital signature</h4>
        <input
          value={digitalSignName}
          onChange={(e) => setDigitalSignName(e.target.value)}
          type="text"
          name="digital sign name"
          placeholder="digital sign name"
        ></input>
        <br></br>
        <br></br>
        <h5>Signature Style</h5>
        <div onClick={() => setShowDigitalSignType(!showDigitalSignType)}>
          <DesignType value={digitalSignType} sets={signatureDesignSets} />
        </div>
      </div>

      <div>
        <h4>Invoice Preferences</h4>
        <div onClick={() => setShowInvoiceTypeModal(!showInvoiceTypeModal)}>
          <DesignType value={invoiceDesignType} sets={invoiceDesignSets} />
        </div>
      </div>

      <div>
        {validation.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <button onClick={() => doCreateSeller()}>Create</button>

      {showDigitalSignType && (
        <DesignSetModal
          show={setShowDigitalSignType}
          sets={signatureDesignSets}
          apply={setDigitalSignType}
        />
      )}
      {showInvoiceTypeModal && (
        <DesignSetModal
          show={setShowInvoiceTypeModal}
          sets={invoiceDesignSets}
          apply={setInvoiceDesignType}
        />
      )}
    </div>
  );
}
