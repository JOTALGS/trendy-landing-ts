import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Diagram.css';

const Lines: React.FC<{ lineRef: React.RefObject<HTMLImageElement> }> = ({ lineRefs }) => {
  return (
    <div className="mask-container">
      <img ref={lineRefs[0]} style={{ top: '37%', left: '15.8%' }} src='./images/swave.png' alt="lines" className="diagram-line" />
      <img ref={lineRefs[1]} style={{ top: '46.5%', left: '15.8%' }} src='./images/swave.png' alt="lines" className="diagram-line"/>
      <img ref={lineRefs[2]} style={{ top: '55.5%', left: '15.8%' }} src='./images/swave.png' alt="lines" className="diagram-line"/>
      <img ref={lineRefs[3]} style={{ top: '64.5%', left: '15.8%' }} src='./images/swave.png' alt="lines" className="diagram-line"/>

      <img ref={lineRefs[4]} style={{ top: '37%', left: '28.7%' }} src='./images/swave.png' alt="lines" className="diagram-line" />
      <img ref={lineRefs[5]} style={{ top: '46.5%', left: '28.7%' }} src='./images/swave.png' alt="lines" className="diagram-line"/>
      <img ref={lineRefs[6]} style={{ top: '55.5%', left: '28.7%' }} src='./images/swave.png' alt="lines" className="diagram-line"/>
      <img ref={lineRefs[7]} style={{ top: '64.5%', left: '28.7%' }} src='./images/swave.png' alt="lines" className="diagram-line"/>

    </div>
  );
};

const Diagram: React.FC = () => {
  const gridInputRef = useRef<(HTMLDivElement | null)[]>([]); // Ref for all grid items
  const gridOutputRef = useRef<(HTMLDivElement | null)[]>([]); // Ref for all grid items
  const lineRefs = Array.from({ length: 8 }, () => useRef<HTMLImageElement | null>(null)); // Create an array of 8 refs for the Lines component images

  // Define input and output names
  const inputNames = [
    './images/bingLogo.png', './images/aliexpressLogo.png', './images/redditLogo.png',
    './images/tiktokLogo.png', './images/facebookLogo.png', './images/xLogo.png',
    './images/instagramLogo.png', './images/amazonLogo.png', './images/youtubeLogo.png',
    './images/yahooLogo.png', './images/ebayLogo.png', './images/googleLogo.png',
  ];

  const outputNames = [
    'Consumer Sentiment', 'Geographic Insights', 'Market Trends',
    'Social Trends', 'Market Insights', 'Consumer Preferences',
    'Market Cyclicaly and Forecasting'
  ];

  useEffect(() => {
    // Animate opacity from 0 to 1 across the width of the image
    lineRefs.forEach((lineRef) => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { opacity: 0, width: '0%' }, // Start with opacity 0 and width 0%
          { opacity: 1, width: '100px', duration: 1 } // Animate to opacity 1 and full width
        );
      }
    });
  }, []); // Run this effect once on mount

  return (
    <div className="diagram-container">
      <h1 className="diagram-title">How it works</h1>
      <svg width="600" height="100" viewBox="0 50 600 150">
        <line
          x1="0"
          y1="50"
          x2="600"
          y2="50"
          stroke="lightgray" // Base line color
          strokeWidth="4"
        />
      </svg>

      <div className="diagram">
        <Lines lineRefs={lineRefs} /> {/* Pass the lineRef to Lines component */}

        <div className="grid-container">
          {/* First three columns with names from inputNames */}
          {inputNames.map((src, index) => (
            <div
              key={index}
              ref={(el) => (gridInputRef.current[index] = el)} // Assign each grid item to the ref array
              className="grid-item"
              style={{ gridRow: Math.floor(index / 3) + 2, gridColumn: (index % 3) + 1 }}
            >
              <img src={src} alt="logo" className="grid-item-image" />
            </div>
          ))}

          {/* Fourth column with one row */}
          <div className="col4row1" style={{ gridRow: 3, gridColumn: 4 }}>
            <img className='trendy-logo' src="./images/trendyLogo.png" alt="placeholder" />
          </div>

          {/* Fifth column with names from outputNames */}
          {outputNames.map((name, index) => (
            <div
              key={index + 15} // Ensure unique keys
              ref={(el) => (gridOutputRef.current[index] = el)} // Add to ref array
              className="grid-item"
              style={{ gridRow: index + 1, gridColumn: 5, paddingBottom: '20px', paddingTop: '20px', textWrap: 'wrap' }} // Adjust the column and row
            >
              {name} {/* Use name from outputNames array */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diagram;
