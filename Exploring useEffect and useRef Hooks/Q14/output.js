import React, { useRef } from "react";

function OtpInput() {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== "") {
      if (index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "") {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", padding: "20px" }}>
      {[0, 1, 2, 3].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "18px",
          }}
        />
      ))}
    </div>
  );
}

export default OtpInput;