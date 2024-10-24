import React, { useEffect, useState, useRef } from 'react';
import './UseCases.css';
import gsap from 'gsap';

interface UseCase {
  title: string;
  icon: JSX.Element;
  description: string;
  image: string; // Added image property
}

const useCases: UseCase[] = [
  { 
    title: 'Market Research', 
    icon: <i className="fas fa-chart-bar"></i>, 
    description: 'Analyze market trends and consumer behavior to help businesses make informed decisions, identify growth opportunities, and understand the competitive landscape. Leverage data to forecast future demand and optimize product positioning.',
    image: './images/research.png' // Example image URL
  },
  { 
    title: 'Advertising Intelligence', 
    icon: <i className="fas fa-bullhorn"></i>, 
    description: 'Track and optimize advertising performance by monitoring key metrics across different platforms. This enables companies to refine their ad strategies, improve audience targeting, and maximize return on investment (ROI) through data-driven insights.',
    image: './images/advertising.png'
  },
  { 
    title: 'Marketing Intelligence', 
    icon: <i className="fas fa-lightbulb"></i>, 
    description: 'Gain insights into marketing strategies, competitors, and consumer preferences. Use data analytics to improve branding, promotional activities, and market segmentation, enhancing your company’s position in the marketplace.',
    image: './images/marketing.png'
  },
  { 
    title: 'Sales Intelligence', 
    icon: <i className="fas fa-dollar-sign"></i>, 
    description: 'Boost sales efficiency with data-driven insights into customer behavior, purchasing patterns, and product demand. Enable sales teams to tailor their approach, improve conversion rates, and increase overall revenue by targeting the right prospects.',
    image: './images/sales.png'
  },
  { 
    title: 'Research and Decision-Making Intelligent Automation', 
    icon: <i className="fas fa-robot"></i>, 
    description: 'Automate research processes and data-driven decision-making by leveraging AI and machine learning. This allows businesses to streamline operations, reduce human error, and make faster, more informed decisions that drive growth and innovation.',
    image: './images/automation.png'
  },
];

const UseCases: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [startAnimationY, setStartAnimationY] = useState<number>(0);
  const [endAnimationY, setEndAnimationY] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 680); // New state to detect screen size
  const memberOffset = 200;
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]); // Ref array for use case cards
  const [randomTranslateYValues, setRandomTranslateYValues] = useState<number[]>([]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    // Generate random translateY values for each use-case card
    const randomValues = useCases.map(() =>
      Math.floor(Math.random() * (150 - (-150) + 1)) + (-150)
    );
    setRandomTranslateYValues(randomValues);
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    // Calculate the scrollable width dynamically for horizontal scrolling
    const updateScrollRange = () => {
      const totalScrollableWidth = window.innerWidth * 4.5;

      const calculatedStartAnimationY = totalScrollableWidth * 0.35;
      const calculatedEndAnimationY = totalScrollableWidth * 0.55;

      setStartAnimationY(calculatedStartAnimationY);
      setEndAnimationY(calculatedEndAnimationY);
    };

    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);

    return () => {
      window.removeEventListener('resize', updateScrollRange);
    };
  }, []);

  // Effect to handle window resizing and updating isMobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 680);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      memberRefs.current.forEach((ref, index) => {
        const offsetStart = startAnimationY + index * memberOffset;
        const offsetEnd = endAnimationY + index * memberOffset;

        if (scrollY >= offsetStart && scrollY <= offsetEnd) {
          const progress = (scrollY - offsetStart) / (offsetEnd - offsetStart);
          if (ref && !isMobile) {
            // Apply GSAP animation only if not on mobile
            gsap.to(ref, {
              x: (1 - progress) * + 2000,
              opacity: Math.max(0, progress),
              duration: 0.2,
              ease: 'power1.out',
              overwrite: 'auto',
            });
          }
        } else if (scrollY > offsetEnd && ref && !isMobile) {
          const progress = (scrollY - offsetStart) / (offsetEnd - offsetStart);
          gsap.to(ref, {
            x: (1 - progress) * + 1000,
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
  }, [startAnimationY, endAnimationY, isMobile]);

  return (
    <div className="use-cases-container">
      <div className="title-uc-container">
        <h1 className="use-cases-title">Use Cases:</h1>
        <svg width="600" height="100" viewBox="0 50 600 150">
          <line
            x1="0"
            y1="50"
            x2="400"
            y2="50"
            stroke="darkgreen" // Base line color
            strokeWidth="4"
          />
        </svg>
      </div>
      {useCases.map((useCase, index) => (
        <div
          key={index}
          className="use-case-card"
          ref={(el) => (memberRefs.current[index] = el)} // Attach ref to each use-case-card
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          // Conditionally apply translateY only if not on mobile
          style={{ transform: isMobile ? 'none' : `translateY(${randomTranslateYValues[index]}px)` }}
        >
          <div className="icon-title">
            <div className="icon-container">{useCase.icon}</div>
            <h3>{useCase.title}</h3>
          </div>
          {hoveredIndex !== index && (
            <img className="use-case-image" src={useCase.image} alt="useCaseimage" />
          )}
          {hoveredIndex === index && (
            <p className="description">{useCase.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default UseCases;
