import React from "react";
import Modal from "react-modal";

const CustomAlert = ({ isOpen, message, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          width: "300px",
          height: "150px",
          margin: "auto",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          animation: isOpen ? "fadeIn 0.5s ease-in-out" : "",
          backgroundImage:
            "url('https://i.pinimg.com/originals/d7/6c/b0/d76cb0858553975e0e21e27803908af6.gif')", // Replace with the path to your image
          backgroundSize: "cover", // Adjust as needed
          boxShadow: "5px 5px 20px rgba(203, 205, 211, 0.1)",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <p
        style={{
          color: "#03e9f4", // Set the text color to #03e9f4
          fontSize: "1.2em",
          fontWeight: 100,
          letterSpacing: "1px",
          marginTop: "-5px",
        }}
      >
        {message}
      </p>
      <button
        style={{
          cursor: "pointer",
          marginTop: "10px",
          border: "none",
          outline: 0,
          borderRadius: "5px",
          padding: "8px 16px",
          backgroundColor: "#FCFCFC",
          color: "#777777",
          boxShadow: "2px 2px 10px rgba(119, 119, 119, 0.5)",
          transition: "all 0.5s ease-in-out",
          ":hover": {
            backgroundColor: "#3498db", // Change the background color on hover
           color: "#03e9f4", // Change the text color on hover
          },
        }}
        onClick={onRequestClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default CustomAlert;
