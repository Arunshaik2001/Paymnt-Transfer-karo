import { useState } from "react";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type QrCodeType = {
  upiId: number;
};

const QRCodeWithCopy = ({ upiId }: QrCodeType) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">UPI ID QR Code</h1>
      <QRCode value={String(upiId)} size={200} />
      <div className="flex items-center mt-4">
        <span className="text-lg mr-2">{upiId}</span>
        <CopyToClipboard text={String(upiId)} onCopy={handleCopy}>
          <button className="bg-transparent border-none cursor-pointer text-lg">
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </CopyToClipboard>
      </div>
      {copied && <span className="mt-2 text-green-600">Copied!</span>}
    </div>
  );
};

export default QRCodeWithCopy;
