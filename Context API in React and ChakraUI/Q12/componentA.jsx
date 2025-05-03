import React from "react";
import ComponentB from "/ComponentB";

function ComponentA() {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>Component A</h2>
      <ComponentB />
    </div>
  );
}

export default ComponentA;