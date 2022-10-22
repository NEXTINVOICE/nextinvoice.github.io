export const processProduct = (data) => {
  data.gstAmount = (data.amount * data.gst) / 100;
  data.total = (data.amount + data.gstAmount) * data.qty;

  return data;
};
