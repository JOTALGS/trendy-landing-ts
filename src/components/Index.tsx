import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Index.css';
import Hero from './Hero/Hero';
import Diagram from './Diagram/Diagram';
import Team from './Team/Team';
import Industries from './Industries/Industries';
import UseCases from './UseCases/UseCases';

gsap.registerPlugin(ScrollTrigger);

const Index: React.FC = () => {
  const firstRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLHeadingElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const sections = self.selector ? self.selector('section') : [];

      // Horizontal animation for sections
      const horizontalTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          markers: true,
          end: () => '+=' + (wrapperRef.current?.offsetWidth || 0),
          invalidateOnRefresh: true, // Recalculate on refresh/resizing
        },
      });

      // First element rotation and scale animation
      gsap.to(firstRef.current, {
        rotate: 90,
        scale: 3,
        scrollTrigger: {
          trigger: firstRef.current,
          containerAnimation: horizontalTween,
          start: 'center center',
          invalidateOnRefresh: true,
        },
      });

      // Second element rotation and scale animation
      gsap.to(secondRef.current, {
        rotate: -90,
        scale: 3,
        scrollTrigger: {
          trigger: secondRef.current,
          containerAnimation: horizontalTween,
          start: 'center center',
          invalidateOnRefresh: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert(); // Clean up GSAP when the component unmounts
  }, []);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <section className="transparent-header"></section>
      <section className="header">
        <Hero />
      </section>
      <section className="first">
        <Diagram />
      </section>
      <section className="second">
        <Industries />
      </section>
      <section className="third">
        <UseCases />
      </section>
      <section className="foot">
        <Team />
        <div className="footer">
          <h1>TRENDY AI</h1>
          <img src="./images/trendyLogo.png" alt="logo" />
          <p>Your one-stop solution for market insights.</p> {/* Add your new paragraph here */}
        </div>
      </section>
    </div>
  );
};

export default Index;
