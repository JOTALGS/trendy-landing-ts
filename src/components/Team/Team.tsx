import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Typewriter from 'typewriter-effect';
import './Team.css';

interface Member {
  name: string;
  position: string;
  linkedin: string;
}

const Team: React.FC = () => {
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const actionTextRef = useRef<HTMLHeadingElement | null>(null);
  const rollingTextRef = useRef<HTMLSpanElement | null>(null);
  const [startAnimationY, setStartAnimationY] = useState<number>(0);
  const [endAnimationY, setEndAnimationY] = useState<number>(0);
  const memberOffset = 200;

  useEffect(() => {
    const animateText = () => {
      const timeline = gsap.timeline();

      timeline.to(actionTextRef.current, {
        duration: 4,
        backgroundPosition: '-200%', // Adjusted to ensure it moves off completely
        ease: 'none',
        backgroundSize: '200%',
        backgroundImage:
          'linear-gradient(90deg, #ee82ee, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: '#0040ff60',
      });
    };

    // Start the animation initially
    animateText();

    // Set an interval to rerun the animation every 4 seconds
    const intervalId = setInterval(() => {
      animateText();
    }, 12000); // 12000 ms = 12 seconds

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Clear the interval on unmount
    };
  }, []);

  useEffect(() => {
    // Calculate the scrollable width dynamically for horizontal scrolling
    const updateScrollRange = () => {
      const totalScrollableWidth = window.innerWidth * 4.5;
      // console.log('Total Scrollable Width:', totalScrollableWidth);

      const calculatedStartAnimationY = totalScrollableWidth * 0.6;
      const calculatedEndAnimationY = totalScrollableWidth * 0.8;

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

  // Log the updated state values after they change
  useEffect(() => {
    // console.log('startAnimationY:', startAnimationY, 'endAnimationY:', endAnimationY);
  }, [startAnimationY, endAnimationY]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      memberRefs.current.forEach((ref, index) => {
        const offsetStart = startAnimationY + index * memberOffset;
        const offsetEnd = endAnimationY + index * memberOffset;

        if (scrollY >= offsetStart && scrollY <= offsetEnd) {
          const progress = (scrollY - offsetStart) / (offsetEnd - offsetStart);
          if (ref) {
            gsap.to(ref, {
              y: (1 - progress) * -2000,
              opacity: Math.max(0, progress),
              duration: 0.2,
              ease: 'power1.out',
              overwrite: 'auto',
            });
          }
        } else if (scrollY > offsetEnd && ref) {
          gsap.to(ref, {
            y: 0,
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

  const teamMembers: Member[] = [
    { name: 'Manuel Guillen', position: 'CEO & Product Designer', linkedin: 'https://linkedin.com' },
    { name: 'Andrea Martinez Leal', position: 'CGO', linkedin: 'https://linkedin.com' },
    { name: 'Hernan Martin', position: 'CTO', linkedin: 'https://linkedin.com' },
    { name: 'Aleksandar Stojanovic', position: 'Data Collection Engineer', linkedin: 'https://linkedin.com' },
    { name: 'Vojislav Staletovic', position: 'Data Scientist Lead', linkedin: 'https://linkedin.com' },
  ];

  return (
    <div className="team-container">
      <h1 className="team-title">Meet Our Team</h1>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} ref={(el) => (memberRefs.current[index] = el)} className="team-member-card">
            <img
              src={`./images/${member.name}.jpg`}
              alt={member.name}
              className="team-member-image"
            />
            <div className="team-member-info">
              <h3>{member.name}</h3>
              <div className="team-member-details">
                <span className="team-member-position">{member.position}</span>
                <a
                  href={member.linkedin}
                  className="linkedin-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className='linkedin-icon' src="./icons/linkedin.png" alt="LinkedIn"/>
                </a>
              </div>
            </div>
          </div>
        ))}

        <div className="call-to-action-text">
          <h1 ref={actionTextRef}>
            We will answer your most important questions:
            <span ref={rollingTextRef} style={{ opacity: 1, marginLeft: '10px' }}>
              <Typewriter
                options={{
                  strings: ['What to sell', 'Where to sell it', 'When to sell it'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 10,
                }}
              />
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Team;
