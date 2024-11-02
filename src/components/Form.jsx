import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import the Firestore instance
import logo from "./logo.png";
import backgroundImage from "../assets/bg.jpg";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // For showing success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    try {
      // Save user data in Firestore with email as document ID
      await setDoc(doc(db, "users", email), userData);

      // Generate QR code data based on email and display success message
      setQrCodeData(email);
      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      {/* Form container */}
      <div className="relative w-full max-w-md p-8 bg-white bg-opacity-45 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            MARKETING CONFERENCE
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <img className="w-32" src={logo} alt="Logo" />
          <TextField
            type="text"
            label="First Name"
            variant="filled"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            type="text"
            label="Last Name"
            variant="filled"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            type="email"
            label="Email"
            variant="filled"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="tel"
            label="Phone Number"
            variant="filled"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
        </form>

        {isRegistered && (
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold text-green-500">
              Successfully Registered!
            </h2>
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Your QR Code:
            </h3>
            <QRCodeCanvas id="qrCode" value={qrCodeData} size={128} />
            <br />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                const qrCodeURL = document.getElementById("qrCode").toDataURL();
                const link = document.createElement("a");
                link.href = qrCodeURL;
                link.download = "QRCode.png";
                link.click();
              }}
              className="mt-2"
            >
              Download QR Code
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
