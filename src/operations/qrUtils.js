import CryptoJS from "crypto-js";
import lz from "lz-string";

export const getQrCode = (data, passphrase) => {
  const compressedData = lz.compressToBase64(data);
  const qrHash = CryptoJS.SHA512(compressedData + passphrase);

  return compressedData + "/nivc" + qrHash;
};

export const getDataFromQR = (data = "", passphrase) => {
  let ret = {
    data: null,
    valid: false,
  };
  const div = "/nivc";

  if (!data.includes(div)) return ret;

  const data_set = data.split(div);
  const compressedData = data_set[0];
  const hash = data_set[1];
  const newHash = CryptoJS.SHA512(compressedData + passphrase).toString();

  if (hash !== newHash)
    return {
      data: JSON.parse(lz.decompressFromBase64(compressedData)),
      valid: false,
    };

  return {
    data: JSON.parse(lz.decompressFromBase64(compressedData)),
    valid: true,
  };
};

export const transformInvoice = ({
  invoice,
  amount,
  products,
  seller,
  customer,
}) => {
  return {
    i: {
      id: invoice.invoiceDate,
      idd: invoice.invoiceDueDate,
    },
    a: {
      iA: amount.itemAmount,
      txA: amount.taxAmount,
      fP: amount.fullyPaid,
      tA: amount.totalAmount,
      tAP: amount.totalAmountPaid,
      pT: amount.paymentType,
    },
    p: products.map((item) => ({
      n: item.name,
      g: item.gst,
      q: item.qty,
      gA: item.gstAmount,
      a: item.amount,
      t: item.total,
    })),
    s: {
      n: seller.name,
    },
    c: {
      n: customer.name,
      m: customer.mob,
    },
  };
};
