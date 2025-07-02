import React from 'react';
import './cvstyleselector.css'
import image1 from '../images/1131w-T9RPR4DPdiw.webp'
import image2 from '../images/tabular-cv.jpg'


const CVStyleSelector = ({ selected, onSelect }) => {
  return (
    <div className='parent container' style={{ display: "flex", gap: "1rem" }}>
      <div className='child'>
      <img className='mx-3'
        src={image1}
        alt="Style 1"
        onClick={() => onSelect("style1")}
        style={{
          border: selected === "style1" ? "3px solid green" : "1px solid gray",
          cursor: "pointer",
          width: "450px"
        }}
      />
      </div>

          <div className='child'>
    
      <img className='mx-3'
        src={image2}
        alt="Style 2"
        onClick={() => onSelect("style2")}
        style={{
          border: selected === "style2" ? "3px solid green" : "1px solid gray",
          cursor: "pointer",
          width: "450px"
        }}
        />
        </div>
    </div>
  );
};
export default CVStyleSelector;
