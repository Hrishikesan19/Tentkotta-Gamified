import React, { useState, useEffect } from 'react';
import './imageSlider.css';

/*const images = [
  '/asets/DSC_0126(1).JPG', // Replace with the path to your images
  './asets/DSC_0129.JPG',
  './asets/DSC_0138(1).JPG'
];*/
const images = [
    '../asets/DSC_0126(1).JPG', // Example image URL
    '../asets/DSC_0129.JPG',
    '../asets/Visarts1fin.png'
  ];
  

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 520); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
        >
          {console.log(image)}
          {index === currentIndex && (
            <img src={`/${index+1}.JPG`} alt={`slide ${index}`} className=""  height="400" width={"auto"}/>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
