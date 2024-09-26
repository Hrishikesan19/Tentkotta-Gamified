import React from 'react';
import './Works.css';

function Works() {
  return (
    <div className="works-container">
      <div className="bento-grid">
        <div className="grid-item large">
          <img src="./asets/DSC_0126(1).jpg" alt="Large Item" className="grid-image" />
        </div>
        <div className="grid-item medium">
          <img src="./asets/Visarts1fin.png" alt="Medium Item" className="grid-image" />
        </div>
        <div className="grid-item small">
          <img src="path/to/your/image3.jpg" alt="Small Item" className="grid-image" />
        </div>
        <div className="grid-item small">
          <img src="path/to/your/image4.jpg" alt="Small Item" className="grid-image" />
        </div>
        <div className="grid-item medium">
          <img src="path/to/your/image5.jpg" alt="Medium Item" className="grid-image" />
        </div>
        <div className="grid-item large">
          <img src="path/to/your/image6.jpg" alt="Large Item" className="grid-image" />
        </div>
      </div>
    </div>
  );
}

export default Works;
