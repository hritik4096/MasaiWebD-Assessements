import React from "react";
import MainLeft from "/MainLeft";
import MainRight from "/MainRight";

function Main({ name }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <MainLeft />
      <MainRight name={name} />
    </div>
  );
}

export default Main;