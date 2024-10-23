import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Industries.css';

interface Industry {
  name: string;
  icon: JSX.Element;
}

const industries: Industry[] = [
  { name: 'Retail and E-commerce', icon: <img src="./icons/retail.png" alt="Retail and E-commerce" /> },
  { name: 'Consumer Goods', icon: <img src="./icons/consumer.png" alt="Consumer Goods" /> },
  { name: 'Media and Entertainment', icon: <img src="./icons/film.png" alt="Media and Entertainment" /> },
  { name: 'Travel and Hospitality', icon: <img src="./icons/travel.png" alt="Travel and Hospitality" /> },
  { name: 'Healthcare and Pharmaceuticals', icon: <img src="./icons/stethoscope.png" alt="Healthcare and Pharmaceuticals" /> },
  { name: 'Fashion and Appeal', icon: <img src="./icons/fashion.png" alt="Fashion and Apparel" /> },
  { name: 'Food and Beverage', icon: <img src="./icons/utensils.png" alt="Food and Beverage" /> },
  { name: 'Consumer Electronics', icon: <img src="./icons/electronics.png" alt="Consumer Electronics" /> },
  { name: 'Sports', icon: <img src="./icons/football.png" alt="Sports" /> },
  { name: 'Education', icon: <img src="./icons/books.png" alt="Education" /> },
  { name: 'Public Sector', icon: <img src="./icons/public.png" alt="Public Sector" /> },
  { name: 'Finance and Banking', icon: <img src="./icons/dollar.png" alt="Finance and Banking" /> }
];

const Industries: React.FC = () => {
  const [startAnimationY, setStartAnimationY] = useState<number>(0);
  const [endAnimationY, setEndAnimationY] = useState<number>(0);
  const memberOffset = 200;
  const columns = 3; // Number of columns in the grid
  const industriesRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll event to trigger the fade-in animation
  useEffect(() => {
    // Calculate the scrollable width dynamically for horizontal scrolling
    const updateScrollRange = () => {
      const totalScrollableWidth = window.innerWidth * 4.5;
      const calculatedStartAnimationY = totalScrollableWidth * 0.23;
      const calculatedEndAnimationY = totalScrollableWidth * 0.42;

      setStartAnimationY(calculatedStartAnimationY);
      setEndAnimationY(calculatedEndAnimationY);
    };

    // Update the scroll range on load and resize
    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);

    return () => {
      window.removeEventListener('resize', updateScrollRange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      industriesRefs.current.forEach((ref, index) => {
        const columnIndex = index % columns; // Calculate the column index (0, 1, or 2)
        const offsetStart = startAnimationY + columnIndex * memberOffset; // Apply the offset based on the column index
        const offsetEnd = endAnimationY + columnIndex * memberOffset;

        if (scrollY >= offsetStart && scrollY <= offsetEnd) {
          const progress = (scrollY - offsetStart) / (offsetEnd - offsetStart);
          if (ref) {
            gsap.to(ref, {
              x: (1 - progress) * +2000,
              opacity: Math.max(0, progress),
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
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startAnimationY, endAnimationY]); // Make sure to include these as dependencies


  return (
    <div className='industries-container'>
      <div className="title-container">
        <h1 className="industries-title">Related Industries:</h1>
        <svg width="600" height="100" viewBox="0 50 600 150">
          <line
            x1="-100"
            y1="50"
            x2="350"
            y2="50"
            stroke="darkblue" // Base line color
            strokeWidth="4"
          />
        </svg>
      </div>
      <div className='industries-grid'>
        {industries.map((industry, index) => (
          <div key={index} className="industry-box" ref={(el) => (industriesRefs.current[index] = el)}>
            <div className="icon-container">{industry.icon}</div>
            <p>{industry.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Industries;
