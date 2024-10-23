import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Team.css';

const Team = () => {
  const teamMembersRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const startAnimationY = 3500;
      const endAnimationY = 5500;

      if (scrollY >= startAnimationY && scrollY <= endAnimationY) {
        const progress = (scrollY - startAnimationY) / (endAnimationY - startAnimationY);

        teamMembersRef.current.forEach((item, index) => {
          if (item) {
            const delay = index * 0.1; // Delay for each card
            const adjustedScrollY = scrollY - startAnimationY + (-delay * 500); // Adjust scroll position

            // Using GSAP for the animation
            gsap.to(item, {
              y: (1 - adjustedScrollY / (endAnimationY - startAnimationY)) * -2000,
              opacity: Math.max(0, adjustedScrollY / (endAnimationY - startAnimationY)),
              duration: 0.2, // Control duration
              ease: 'power1.out', // Easing function
              overwrite: 'auto' // Ensure smooth transitions
            });
          }
        });
        
      } else if (scrollY < startAnimationY) {
        teamMembersRef.current.forEach((item) => {
          if (item) {
            gsap.to(item, {
              y: -100,
              opacity: 0,
              duration: 0.2
            });
          }
        });
      } else if (scrollY > endAnimationY) {
        teamMembersRef.current.forEach((item) => {
          if (item) {
            gsap.to(item, {
              y: 0,
              opacity: 1,
              duration: 0.2
            });
          }
        });
      }
    };

    // Set initial styles for items with GSAP
    teamMembersRef.current.forEach((item) => {
      if (item) {
        gsap.set(item, { y: -100, opacity: 0 });
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="team-container">
      <h1 className="team-title">Meet Our Team</h1>
      <div className="team-members">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            ref={(el) => (teamMembersRef.current[index] = el)}
            className="team-member-card"
          >
            Team Member {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
