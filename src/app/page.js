"use client"
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import "../Page.css";
import { FaQrcode, FaSave } from "react-icons/fa";
import Image from 'next/image';
import { ChromePicker } from 'react-color'; // Import ChromePicker from react-color

const Page = () => {
  const [link, setLink] = useState('');
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDefaultImage, setShowDefaultImage] = useState(true); // State to control displaying default image
  const [qrCodeColor, setQRCodeColor] = useState('#000'); // State for QR code color

  const generateRandomDelay = () => {
    return Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000; // Random delay between 2 and 5 seconds (in milliseconds)
  };

  const generateQRCode = () => {
    setLoading(true); // Set loading to true when generating QR code
    setQRCodeValue(link);
    setShowDefaultImage(false); // Hide default image
    // Random delay for loader
    const delay = generateRandomDelay();
    setTimeout(() => {
      setLoading(false);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      generateQRCode();
    }
  };

  const handleSave = () => {
    const canvas = document.querySelector('.generated-code canvas');
    const imageUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleColorChange = (color) => {
    setQRCodeColor(color.hex); // Update QR code color
  };

  return (
    <>
      <h1>Generate your unique<span> QR code</span></h1>
      <div className='container'>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your link"
        />
        <button onClick={generateQRCode}>
          <p>
            Generate
          </p>
          <FaQrcode />
        </button>
        <button onClick={handleSave}>
          <p>
            Save
          </p>
          <FaSave />
        </button>
      </div>

      <div className='qr-code'>
        {loading ? (
          <div>
            <Image width={300} height={300} src="/loader.gif" />
          </div> // Display loader while loading is true
        ) : (
          showDefaultImage ? (
            <div className='default-image'>
              <Image width={300} height={300} src="/dummy.png" />
            </div>
          ) : (
            qrCodeValue && <div className='generated-code'><QRCode size={300} value={qrCodeValue} fgColor={qrCodeColor} /></div>
          )
        )}

        <div className="color-picker-container">
          <h2>Change color :</h2>
          <ChromePicker color={qrCodeColor} onChange={handleColorChange} />
        </div>
      </div>
    </>
  );
}

export default Page;
