import React, { useRef } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div style={{ padding: "20px" }}>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={handleFocus} style={{ marginLeft: "10px" }}>
        Focus Input
      </button>
    </div>
  );
}

export default FocusInput;