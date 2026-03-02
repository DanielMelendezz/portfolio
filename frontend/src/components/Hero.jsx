import { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const nameRef    = useRef(null);
  const rolesRef   = useRef(null);
  const eduRef     = useRef(null);
  const btnsRef    = useRef(null);

  useEffect(() => {
    const targets = [nameRef, rolesRef, eduRef, btnsRef];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach((ref) => { if (ref.current) observer.observe(ref.current); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-prompt">
          <span className="prompt-user">daniel</span>
          <span className="prompt-sep">@</span>
          <span className="prompt-host">portfolio</span>
          <span className="prompt-path">:~$</span>
          <span className="prompt-cmd">whoami</span>
          <span className="prompt-cursor" />
        </div>

        <h1 className="hero-name" ref={nameRef}>Daniel Melendez</h1>

        <div className="hero-roles" ref={rolesRef}>
          <span>Full Stack Developer</span>
          <span className="role-sep">/</span>
          <span>Cloud Engineer</span>
          <span className="role-sep">/</span>
          <span>AI Enthusiast</span>
        </div>

        <p className="hero-edu" ref={eduRef}>
          B.S. Computer Science &amp; B.A. Economics · University of Florida
        </p>

        <div className="hero-buttons" ref={btnsRef}>
          <a href="#projects"   className="btn btn-primary">View Projects</a>
          <a href="#experience" className="btn btn-outline">Experience</a>
          <a href="#contact"    className="btn btn-outline">Contact</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
