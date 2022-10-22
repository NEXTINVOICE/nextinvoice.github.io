export const sellerNormalizer = (data) => {
  data.name = data.name.trim();
  data.address = data.address.trim();
  data.mob = data.mob.trim();
  data.email = data.email.trim();
  data.photoUrl = data.photoUrl.trim();
  data.pan = data.pan.trim();
  data.bankName = data.bankName.trim();
  data.bankBranch = data.bankBranch.trim();
  data.bankIFSC = data.bankIFSC.trim();
  data.gstNumber = data.gstNumber.trim();
  data.termsAndConditions = data.termsAndConditions.trim();
  data.digitalSignName = data.digitalSignName.trim();

  return data;
};

export const customerNormalizer = (data) => {
  data.name = data.name.trim();
  data.address = data.address.trim();
  data.mob = data.mob.trim();
  data.email = data.email.trim();
  return data;
};

export const productNormalizer = (data) => {
  data.name = data.name.trim();
  data.hsn = parseInt(data.hsn.trim());
  data.gst = parseInt(data.gst.trim());
  data.qty = parseInt(data.qty.trim());
  data.amount = parseInt(data.amount.trim());
  return data;
};
