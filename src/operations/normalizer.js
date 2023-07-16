export const sellerNormalizer = (data) => {
  data.name = data.name.trim();
  data.address = data.address.trim();
  data.mob = data.mob.trim();
  data.email = data.email.trim();
  data.photoUrl = data.photoUrl.trim();
  data.pan = data.pan.trim();
  data.accountHolderName = data.accountHolderName
    ? data.accountHolderName.trim()
    : "";
  data.accountNumber = data.accountNumber ? data.accountNumber.trim() : "";
  data.bankName = data.bankName ? data.bankName.trim() : "";
  data.bankBranch = data.bankBranch ? data.bankBranch.trim() : "";
  data.bankIFSC = data.bankIFSC ? data.bankIFSC.trim() : "";
  data.gstNumber = data.gstNumber ? data.gstNumber.trim() : "";
  data.termsAndConditions = data.termsAndConditions
    ? data.termsAndConditions.trim()
    : "";
  data.digitalSignName = data.digitalSignName
    ? data.digitalSignName.trim()
    : "";

  return data;
};

export const customerNormalizer = (data) => {
  return {
    name: String(data.name).trim(),
    address: String(data.address).trim(),
    mob: String(data.mob).trim(),
    email: String(data.email).trim(),
  };
};

export const productNormalizer = (data) => {
  data.name = data.name.trim();
  data.hsn = parseInt(data.hsn?.trim());
  data.gst = parseInt(data.gst.trim());
  data.qty = parseInt(data.qty.trim());
  data.amount = parseInt(data.amount.trim());
  return data;
};
