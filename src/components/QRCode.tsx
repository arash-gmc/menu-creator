import React, { useEffect, useState } from "react";
import qrcode from "qrcode";

const QRCode = ({ url }: { url: string }) => {
  const [qr, setQr] = useState<string>();
  useEffect(() => {
    qrcode.toDataURL(url, function (error, source) {
      if (error) console.log(error);
      if (source) setQr(source);
    });
  });
  return <img src={qr}></img>;
};

export default QRCode;
