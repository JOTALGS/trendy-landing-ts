import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Diagram.css';

const Lines: React.FC<{ lineRefs: React.RefObject<HTMLImageElement>[], arrowRefs: React.RefObject<HTMLImageElement>[] }> = ({ lineRefs, arrowRefs }) => {
  return (
    <div className="mask-container">
      <div ref={lineRefs[0]} style={{ top: '20%', left: '10%' }} className="diagram-linea" ></div>
      <div ref={lineRefs[1]} style={{ top: '35%', left: '10%' }} className="diagram-linea" ></div>
      <div ref={lineRefs[2]} style={{ top: '50%', left: '10%' }} className="diagram-linea" ></div>
      <div ref={lineRefs[3]} style={{ top: '65%', left: '10%' }} className="diagram-linea" ></div>

      <div ref={lineRefs[4]} style={{ top: '20%', left: '24%' }} className="diagram-linea" ></div>
      <div ref={lineRefs[5]} style={{ top: '35%', left: '24%' }} className="diagram-linea" ></div>
      <div ref={lineRefs[6]} style={{ top: '50%', left: '24%' }} className="diagram-linea" ></div>
      <div ref={lineRefs[7]} style={{ top: '65%', left: '24%' }} className="diagram-linea" ></div>

      <img ref={lineRefs[8]} style={{ top: '28%', left: '40.5%'}} src='./images/arrow.png' alt="lines" className="diagram-arrow" />

      <img ref={arrowRefs[0]} style={{ top: '0%', left: '64%', rotate: '55deg' }} src='./images/10.png' alt="lines" className="diagram-10"/>
      <img ref={arrowRefs[1]} style={{ top: '8%', left: '64%', rotate: '65deg' }} src='./images/10.png' alt="lines" className="diagram-10"/>
      <img ref={arrowRefs[2]} style={{ top: '15%', left: '64%', rotate: '82deg' }} src='./images/8.png' alt="lines" className="diagram-10"/>
      <img ref={arrowRefs[3]} style={{ top: '24%', left: '64%', rotate: '98deg' }} src='./images/8.png' alt="lines" className="diagram-10"/>
      <img ref={arrowRefs[4]} style={{ top: '35%', left: '64%', rotate: '112deg' }} src='./images/10.png' alt="lines" className="diagram-10"/>
      <img ref={arrowRefs[5]} style={{ top: '44%', left: '64%', rotate: '122deg' }} src='./images/11.png' alt="lines" className="diagram-10"/>
      <img ref={arrowRefs[6]} style={{ top: '50%', left: '64%', rotate: '130deg' }} src='./images/12.png' alt="lines" className="diagram-10"/>
    </div>
  );
};

const Diagram: React.FC = () => {
  const gridInputRef = useRef<(HTMLDivElement | null)[]>([]); // Ref for input logos
  const gridOutputRef = useRef<(HTMLDivElement | null)[]>([]); // Ref for output names
  const iconRef = useRef<(HTMLDivElement | null)>(null); // Ref for output names
  const lineRefs = Array.from({ length: 9 }, () => useRef<HTMLImageElement | null>(null)); // Create refs for lines
  const arrowRefs = Array.from({ length: 7 }, () => useRef<HTMLImageElement | null>(null)); // Create refs for lines
  const [startAnimationY, setStartAnimationY] = useState<number>(0);
  const [endAnimationY, setEndAnimationY] = useState<number>(0);
  const lineOffset = 150; // Adjusted offset for lines

  // Input and output names
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

  // Dynamically update the scroll range
  useEffect(() => {
    const updateScrollRange = () => {
      const totalScrollableWidth = window.innerWidth * 4.5;
      const calculatedStartAnimationY = totalScrollableWidth * 0.04;
      const calculatedEndAnimationY = totalScrollableWidth * 0.06;

      setStartAnimationY(calculatedStartAnimationY);
      setEndAnimationY(calculatedEndAnimationY);
    };

    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);

    return () => {
      window.removeEventListener('resize', updateScrollRange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      lineRefs.forEach((ref, index) => {
        const columnIndex = index % 3; // Calculate the column index (0, 1, or 2)
        const offsetStart = startAnimationY+800 + columnIndex * lineOffset; // Apply the offset based on the column index
        const offsetEnd = endAnimationY+800 + columnIndex * lineOffset;
  
        if (scrollY >= offsetStart && scrollY <= offsetEnd) {
          const progress = (scrollY - offsetStart) / (offsetEnd - offsetStart);
          if (ref.current) {
            gsap.to(ref.current, {
              opacity: Math.max(0, progress), // Gradually increase opacity
              duration: 0.4,
              ease: 'power1.out',
              overwrite: 'auto',
              delay: 1.5,
            });
          }
        } else if (scrollY > offsetEnd && ref.current) {
          gsap.to(ref.current, {
            x: 0,
            opacity: 0.8,
            duration: 0.4,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        }
      });
      arrowRefs.forEach((ref, index) => {
        const rowIndex = index; // Use row index for output
        const offsetStart = startAnimationY+1400 + rowIndex * lineOffset; // Apply the offset based on the row index
        const offsetEnd = endAnimationY+1400 + rowIndex * lineOffset;
  
        if (scrollY >= offsetStart && scrollY <= offsetEnd) {
          const progress = (scrollY - offsetStart) / (offsetEnd - offsetStart);
          if (ref.current) {
            gsap.to(ref.current, {
              opacity: Math.max(0, progress), // Gradually increase opacity
              duration: 0.4,
              ease: 'power1.out',
              overwrite: 'auto',
              delay: 1.5,
            });
          }
        } else if (scrollY > offsetEnd && ref.current) {
          gsap.to(ref.current, {
            x: 0,
            opacity: 0.8,
            duration: 0.4,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        }
      });

      gridInputRef.current.forEach((ref, index) => {
        const columnIndex = index % 3; // Calculate the column index (0, 1, or 2)
        const offsetStart = startAnimationY + columnIndex * lineOffset+800; // Apply the offset based on the column index
        const offsetEnd = endAnimationY + columnIndex * lineOffset+800;

        if (scrollY >= offsetStart && scrollY <= offsetEnd) {
          const progress = (scrollY - offsetStart) / (offsetEnd - offsetStart);
          if (ref) {
            gsap.to(ref, {
              x: (1 - progress) * -20,
              opacity: Math.max(0.2, progress),
              duration: 0.2,
              ease: 'power1.out',
              overwrite: 'auto',
            });
          }
        } else if (scrollY > offsetEnd && ref) {
          gsap.to(ref, {
            x: 0,
            opacity: 1,
            duration: 0.2,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        }
      });
      gridOutputRef.current.forEach((ref, index) => {
        const rowIndex = index; // Use row index for output
        const offsetStart = startAnimationY+1500 + rowIndex * lineOffset + 100; // Apply the offset based on the row index
        const offsetEnd = endAnimationY+1500 + rowIndex * lineOffset + 100;
  
        if (scrollY >= offsetStart && scrollY <= offsetEnd) {
          const progress = (scrollY - offsetStart) / (offsetEnd - offsetStart);
          if (ref) {
            gsap.to(ref, {
              x: (1 - progress) * -20, // Adjust for horizontal movement if desired
              opacity: Math.max(0.2, progress),
              duration: 0.2,
              ease: 'power1.out',
              overwrite: 'auto',
            });
          }
        } else if (scrollY > offsetEnd && ref) {
          gsap.to(ref, {
            x: 0,
            opacity: 1,
            duration: 0.2,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        }
      });

      // Calculate scroll offsets for iconRef animation
      const iconOffsetStart = startAnimationY + 1200; // Customize this as needed
      const iconOffsetEnd = endAnimationY + 1200; // Customize this as needed

      if (scrollY >= iconOffsetStart && scrollY <= iconOffsetEnd) {
        const progress = (scrollY - iconOffsetStart) / (iconOffsetEnd - iconOffsetStart);
        if (iconRef.current) {
          gsap.to(iconRef.current, {
            x: (1 - progress) * -20, // Adjust for horizontal movement if desired
            opacity: Math.max(0.2, progress),
            duration: 0.2,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        }
      } else if (scrollY > iconOffsetEnd && iconRef.current) {
        gsap.to(iconRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.2,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startAnimationY, endAnimationY]); // Dependencies for scrolling animation

  return (
    <div className="diagram-container">
      <h1 className="diagram-title">How it works</h1>
      <svg width="600" height="100" viewBox="0 50 600 150">
        <line
          x1="0"
          y1="50"
          x2="600"
          y2="50"
          stroke="brown" // Base line color
          strokeWidth="4"
        />
      </svg>

      <div className="diagram">

        <div className="grid-container">
          <Lines lineRefs={lineRefs} arrowRefs={arrowRefs} /> {/* Pass the refs to Lines component */}
          {/* First three columns with input logos */}
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
          <div ref={iconRef} className="col4row1" style={{ gridRow: 3, gridColumn: 4 }}>
            <img className='trendy-logo' src="./images/trendyLogo.png" alt="placeholder" />
          </div>

          {/* Fifth column with output names */}
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