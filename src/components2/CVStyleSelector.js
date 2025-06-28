import React from 'react';


const CVStyleSelector = ({ selected, onSelect }) => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <img
        src="/style1-thumbnail.png"
        alt="Style 1"
        onClick={() => onSelect("style1")}
        style={{
          border: selected === "style1" ? "3px solid green" : "1px solid gray",
          cursor: "pointer",
          width: "100px"
        }}
      />
      <img
        src="/style2-thumbnail.png"
        alt="Style 2"
        onClick={() => onSelect("style2")}
        style={{
          border: selected === "style2" ? "3px solid green" : "1px solid gray",
          cursor: "pointer",
          width: "100px"
        }}
      />
    </div>
  );
};
export default CVStyleSelector;
