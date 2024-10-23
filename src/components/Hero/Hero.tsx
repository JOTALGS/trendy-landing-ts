import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const figuresRef = useRef<HTMLDivElement | null>(null);
  const figureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Title scaling and rainbow effect
    timeline.fromTo(textRef.current, 
      { scale: 0.8 }, 
      {
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        color: 'transparent',
      }
    );

    timeline.to(textRef.current, {
      duration: 4,
      backgroundPosition: "-199%",
      ease: 'none',
      backgroundSize: '200%',
      backgroundImage: "linear-gradient(90deg, #ee82ee, #ffffff, #ffffff,#ffffff, #ffffff, #ffffff, #ffffff, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
    });

    timeline.fromTo(figuresRef.current, 
      { 
        y: 100,      // Start below the view
        opacity: 0,  // Fully invisible
      }, 
      { 
        y: 0,        // End at original position (visible)
        opacity: 1,  // Fully visible as it reaches final position
        duration: 2, 
        ease: 'power2.out',  // Smooth easing for a more natural effect
      }
    );

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="hero">
      <div className="hero-text">
        <h1 ref={textRef}>
          Increase your annual revenue by up to 40% with the most accurate consumer market insights
        </h1>
      </div>

      <div className="figures" ref={figuresRef}>
        <h2>Trendy analyses every day</h2>
        
        <div className="counters">
          <div className="counter" ref={(el) => (figureRefs.current[0] = el)}>
            <span>
              <CountUp end={1047} duration={4} delay={6} prefix="+" />
            </span>
            <span>billion social media posts</span>
          </div>

          <div className="counter" ref={(el) => (figureRefs.current[1] = el)}>
            <span>
              <CountUp end={10} duration={4} delay={7} prefix="+" suffix=".5" />
            </span>
            <span>billion search queries</span>
          </div>

          <div className="counter" ref={(el) => (figureRefs.current[2] = el)}>
            <span>
              <CountUp end={770} duration={2} delay={6} prefix="+" />
            </span>
            <span>million online sales transactions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
