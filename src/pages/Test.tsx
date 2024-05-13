import React, { useEffect, useRef, useState } from "react";
import qrcode from "qrcode";

const Test = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [qr, setQr] = useState<string>();
  useEffect(() => {
    qrcode.toDataURL("https://yahoo.com", function (error, url) {
      if (error) console.log(error);
      if (url) setQr(url);
    });
  });
  return (
    <div>
      <canvas ref={canvas}></canvas>
      {qr}

      <img src={qr}></img>
    </div>
  );
};

export default Test;
