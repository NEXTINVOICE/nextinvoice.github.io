import React from "react";
import "./typeA.scss";
import html2pdf from "html-to-pdf-js";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import toWord from "num-words";
import {
  getDataFromQR,
  getQrCode,
  transformInvoice,
} from "../../../../../operations/qrUtils";
import { accentSets } from "../../../../../operations/stylesets";

const para1 = `STTART Ipsum
  "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
  What is Lorem Ipsum?
  Lorem Ipsum
  "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
  What is Lorem Ipsum?
  Lorem Ipsum
  "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
  What is Lorem Ipsum?
  Lorem Ipsum
  "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
  What is Lorem Ipsum?
  Lorem Ipsum
  "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
  What is Lorem Ipsum?
  Lorem Ipsum
  "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
  What is Lorem Ipsum?
  
  Lorem Ipsum
  "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
  What is Lorem Ipsum?

  Lorem Ipsum
  "Neque porro quisquam est qui dolorem ipsum quia 

  ENDDDD
  `;

const para = "joicajor,whjoi3uh523h53j23j23t2c93tjh0,2htt2940t,h";

export default function TypeA({ hide, invoiceNumber, isDone, isErr }) {
  const invoiceSeller = useSelector((state) => state.invoiceSeller);
  const sellers = useSelector((state) => state.sellers);
  const customer = useSelector((state) => state.customer);
  const products = useSelector((state) => state.products);
  const invoice = useSelector((state) => state.invoice);
  const amount = useSelector((state) => state.amount);
  const profile = useSelector((state) => state.profile);

  const accText = {
    color: `var(--${
      accentSets[sellers[invoiceSeller].accentType].palettes[0].background
    })`,
  };

  const tableHeaderBg = {
    background: `var(--${
      accentSets[sellers[invoiceSeller].accentType].palettes[0].background
    })`,
  };

  const tableHeadertext = {
    color: `var(--${
      accentSets[sellers[invoiceSeller].accentType].palettes[0].foreground
    })`,
  };

  return (
    <>
      <div
        style={{ display: `${hide ? "none" : "block"}`, margin: "4rem 3rem" }}
      >
        <section id="invoiceTypeA" className="invoiceTypeA">
          <div style={accText} className="mainHeader">
            Invoice
          </div>
          <div className="invoiceInfoCont">
            <div className="infoCont">
              <div className="row">
                <p className="title">Invoice#</p>
                <p className="value">{invoiceNumber}</p>
              </div>
              <div className="row">
                <p className="title">Invoice Date</p>
                <p className="value">{invoice.invoiceDate}</p>
              </div>
              {amount.fullyPaid === false && (
                <div className="row">
                  <p className="title">Due Date</p>
                  <p className="value">{invoice.invoiceDueDate}</p>
                </div>
              )}
            </div>
            <img
              className="companyLogo"
              alt="companyLogo"
              src={sellers[invoiceSeller].photoUrl}
            />
          </div>

          <div className="relationInfoCont">
            <div
              // style={{
              //   background: `var(--${
              //     accentSets[sellers[invoiceSeller].accentType].palettes[2].background
              //   })`,
              // }}
              className="relationItem"
            >
              <p style={accText} className="header">
                Billed by
              </p>
              <p className="relationName">{sellers[invoiceSeller].name}</p>
              <p className="relationAddress">
                {sellers[invoiceSeller].address}
              </p>
              <div className="relationInfoRow">
                <p className="title">GSTIN</p>
                <p className="value">{sellers[invoiceSeller].gstNumber}</p>
              </div>
              <div className="relationInfoRow">
                <p className="title">PAN</p>
                <p className="value">{sellers[invoiceSeller].pan}</p>
              </div>
            </div>
            <div className="relationItem">
              <p style={accText} className="header">
                Billed to
              </p>
              <p className="relationName">{customer.name}</p>
              <p className="relationAddress">{customer.address}</p>
              <div className="relationInfoRow">
                <p className="title">Phone</p>
                <p className="value">{customer.mob}</p>
              </div>
              <div className="relationInfoRow">
                <p className="title">Email</p>
                <p className="value">{customer.email}</p>
              </div>
            </div>
          </div>

          <div id="typeATable" className="invoiceTable">
            <div style={tableHeaderBg} className="header">
              <div style={tableHeadertext} className="item">
                Item#/Item description
              </div>
              <div style={tableHeadertext} className="item">
                HSN
              </div>
              <div style={tableHeadertext} className="item">
                GST
              </div>
              <div style={tableHeadertext} className="item">
                CSGST
              </div>
              <div style={tableHeadertext} className="item">
                Amount
              </div>
              <div style={tableHeadertext} className="item">
                Qty.
              </div>
              <div style={tableHeadertext} className="item">
                Total
              </div>
            </div>
            {products.map((item, index) => (
              <div key={index} className="row">
                <div className="item">
                  {index + 1}. {item.name}
                </div>
                <div className="item">{isNaN(item.hsn) ? "N/A" : item.hsn}</div>
                <div className="item">{item.gst}%</div>
                <div className="item">{item.gstAmount / 2}</div>
                <div className="item">{item.amount}</div>
                <div className="item">{item.qty}</div>
                <div className="item">{item.total}</div>
              </div>
            ))}
          </div>

          <div className="billingCont">
            <div className="financialInfo">
              {sellers[invoiceSeller].includeBankDetails &&
                amount.paymentType === "Card" && (
                  <>
                    <div style={accText} className="header">
                      Bank & Payment Details
                    </div>
                    <div className="infoCont">
                      <div className="row">
                        <div className="title">Account Holder Name</div>
                        <div className="value">
                          {sellers[invoiceSeller].accountHolderName}
                        </div>
                      </div>
                      <div className="row">
                        <div className="title">Account Number</div>
                        <div className="value">
                          {sellers[invoiceSeller].accountNumber}
                        </div>
                      </div>
                      <div className="row">
                        <div className="title">Bank</div>
                        <div className="value">
                          {sellers[invoiceSeller].bankName}
                        </div>
                      </div>
                      <div className="row">
                        <div className="title">Branch</div>
                        <div className="value">
                          {sellers[invoiceSeller].bankBranch}
                        </div>
                      </div>
                      <div className="row">
                        <div className="title">IFSC</div>
                        <div className="value">
                          {sellers[invoiceSeller].bankIFSC}
                        </div>
                      </div>
                    </div>
                  </>
                )}

              {sellers[invoiceSeller].includeTermsAndConditions && (
                <div className="termsAndConditionsNew">
                  <div style={accText} className="header">
                    Terms and Conditions
                  </div>
                  <div className="value">
                    {sellers[invoiceSeller].termsAndConditions}
                    {/* 1. Please pay within 15 days from the date of invoice, overdue
                  interest @ 14% will be charged on delayed payments. <br></br>
                  2. Please quote invoice number when remitting funds. */}
                  </div>
                </div>
              )}
            </div>

            <div className="billingInfo">
              <div className="billingSummary">
                <div className="column">
                  <div className="title">Sub Total</div>
                  <div className="title">CGST Total</div>
                  <div className="title">SGST Total</div>
                  {!amount.fullyPaid && (
                    <>
                      <div className="title">Grand Total</div>
                      <div className="title">Paid</div>
                    </>
                  )}
                </div>
                <div className="column">
                  <div className="value">{amount.itemAmount}</div>
                  <div className="value">{amount.taxAmount / 2}</div>
                  <div className="value">{amount.taxAmount / 2}</div>
                  {!amount.fullyPaid && (
                    <>
                      <div className="value">{amount.totalAmount}</div>
                      <div className="value">-{amount.totalAmountPaid}</div>
                    </>
                  )}
                </div>
              </div>
              <div className="billingTotal">
                <div className="divider"></div>
                <div className="fCont">
                  <div className="title">
                    {amount.fullyPaid ? "Total" : "Need to pay"}
                  </div>
                  <div className="billingTotalString">
                    <div className="header">Invoice Total (in words)</div>
                    <div className="value">{toWord(amount.totalAmount)}</div>
                  </div>
                </div>
                <div className="lCont">
                  {amount.fullyPaid ? (
                    <div className="value">{amount.totalAmount}</div>
                  ) : (
                    <div className="value">
                      {amount.totalAmount - amount.totalAmountPaid}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {sellers[invoiceSeller].generateQr && (
            <div className="nextInvQRCont">
              <div className="wrapper">
                <div className="mainCont">
                  <div className="vBorder"></div>
                  <div style={{ display: "none" }} className="vBorder"></div>
                  <div style={{ display: "none" }} className="vBorder"></div>
                  <div className="vBorder"></div>
                  <div className="vBorder"></div>
                  <div style={{ display: "none" }} className="vBorder"></div>
                  <div style={{ display: "none" }} className="vBorder"></div>
                  <div className="vBorder"></div>
                  <QRCode
                    size={512}
                    bgColor="#F4F8F9"
                    fgColor="#262C35"
                    value={getQrCode(
                      JSON.stringify(
                        transformInvoice({
                          invoice,
                          amount,
                          seller: sellers[invoiceSeller],
                          customer,
                          products,
                        })
                      ),
                      profile.password
                    )}
                  />
                </div>
                <div className="infoCont">
                  <div style={accText} className="header">
                    Scan QR Code
                  </div>
                  <div className="value">To verfiy its integrity</div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
