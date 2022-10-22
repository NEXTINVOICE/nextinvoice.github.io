const REGEX_IFSC = /^[A-Za-z]{4}\d{7}$/;
const REGEX_MOB = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_PAN = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const REGEX_ONLY_CHAR = /^[A-Za-z]+$/;
const REGEX_GST = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;

export const sellerValidator = (data) => {
  let ret = [];

  //Validating Personal infos
  if (data.name.trim() === "") {
    ret.push("Name required");
  }

  if (data.address.trim() === "") {
    ret.push("Address required");
  }

  if (!REGEX_MOB.test(data.mob)) {
    ret.push("Invalid Mobile Number");
  }

  if (!REGEX_EMAIL.test(data.email)) {
    ret.push("Invalid Email");
  }

  if (!REGEX_PAN.test(data.pan)) {
    ret.push("Invalid Pan");
  }

  if (data.includeBankDetails && !REGEX_ONLY_CHAR.test(data.bankName)) {
    ret.push("Bank name only contains alphabets. (Invalid Bank name)");
  }

  if (data.includeBankDetails && data.bankBranch.trim() === "") {
    ret.push("Bank Branch required");
  }

  if (data.includeBankDetails && !REGEX_IFSC.test(data.bankIFSC)) {
    ret.push("Invalid Bank IFSC");
  }

  if (!REGEX_GST.test(data.gstNumber)) {
    ret.push("Invalid GST Number");
  }

  if (data.includeTermsAndConditions && data.termsAndConditions.trim() === "") {
    ret.push("Terms and Conditions required");
  }

  if (data.digitalSignName.trim() === "") {
    ret.push("Digital Signature name required");
  }

  return ret;
};

export const customerValidator = (data) => {
  let ret = [];

  //Validating Personal infos
  if (data.name.trim() === "") {
    ret.push("Name required");
  }

  if (data.address.trim() === "") {
    ret.push("Address required");
  }

  if (!REGEX_MOB.test(data.mob)) {
    ret.push("Invalid Mobile Number");
  }

  if (!REGEX_EMAIL.test(data.email) && data.email !== "") {
    ret.push("Invalid Email");
  }

  return ret;
};

export const productValidator = (data) => {
  let ret = [];

  //Validating Personal infos
  if (data.name.trim() === "") {
    ret.push("Item Name required");
  }

  if (isNaN(parseInt(data.gst.trim()))) {
    ret.push("Invalid GST rate");
  }

  if (isNaN(parseInt(data.qty.trim())) || parseInt(data.qty.trim()) < 1) {
    ret.push("Invalid quantity");
  }

  if (isNaN(parseInt(data.amount.trim()))) {
    ret.push("Invalid amount");
  }

  return ret;
};
