import React from "react";

function BottomMainRight({ name }) {
  return (
    <div>
      <h3>Bottom Main Right</h3>
      <p>Hello, {name || "Guest"}!</p>
    </div>
  );
}

export default BottomMainRight;