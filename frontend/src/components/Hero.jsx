import { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    [titleRef, subtitleRef, buttonsRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>
          <span className="gradient-text">Hello, I'm</span>
          <br />
          <span className="hero-name">Daniel Melendez</span>
        </h1>
        <p className="hero-subtitle" ref={subtitleRef}>
          Computer Science &amp; Economics @ University of Florida
        </p>
        <p className="hero-tagline">
          Full Stack Developer &bull; Cloud Engineer &bull; AI Enthusiast
        </p>
        <div className="hero-buttons" ref={buttonsRef}>
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#experience" className="btn btn-secondary">Experience</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
