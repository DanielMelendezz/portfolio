import { useEffect, useRef } from 'react';
import './GeometricBackground.css';

const GeometricBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = 50;
      const width = canvas.width || window.innerWidth;
      const height = canvas.height || window.innerHeight;
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
        });
      }
    };
    initParticles();

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      try {
        if (!canvas.width || !canvas.height) {
          animationFrameId = requestAnimationFrame(animate);
          return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particlesRef.current.forEach((particle, i) => {
          // Move particles
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Keep particles in bounds
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 108, 255, ${0.6})`;
          ctx.fill();

          // Draw lines to nearby particles
          particlesRef.current.slice(i + 1).forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150 && distance > 0) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(100, 108, 255, ${0.2 * (1 - distance / 150)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });

          // Draw lines to mouse with stronger effect
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200 && distance > 0) {
            // Create magnetic effect
            const force = (200 - distance) / 200;
            particle.vx += (dx / distance) * force * 0.01;
            particle.vy += (dy / distance) * force * 0.01;

            // Draw line to mouse
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(100, 108, 255, ${0.3 * force})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw geometric shape at mouse
            ctx.beginPath();
            ctx.arc(mouseRef.current.x, mouseRef.current.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 108, 255, ${0.8})`;
            ctx.fill();
          }
        });

        // Draw geometric shapes around mouse
        const shapes = 6;
        for (let i = 0; i < shapes; i++) {
          const angle = (Math.PI * 2 * i) / shapes;
          const radius = 30;
          const x = mouseRef.current.x + Math.cos(angle) * radius;
          const y = mouseRef.current.y + Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 108, 255, 0.5)`;
          ctx.fill();

          // Connect shapes
          if (i > 0) {
            const prevAngle = (Math.PI * 2 * (i - 1)) / shapes;
            const prevX = mouseRef.current.x + Math.cos(prevAngle) * radius;
            const prevY = mouseRef.current.y + Math.sin(prevAngle) * radius;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = `rgba(100, 108, 255, 0.3)`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect last to first
        if (shapes > 0) {
          const firstAngle = 0;
          const lastAngle = (Math.PI * 2 * (shapes - 1)) / shapes;
          const radius = 30;
          const firstX = mouseRef.current.x + Math.cos(firstAngle) * radius;
          const firstY = mouseRef.current.y + Math.sin(firstAngle) * radius;
          const lastX = mouseRef.current.x + Math.cos(lastAngle) * radius;
          const lastY = mouseRef.current.y + Math.sin(lastAngle) * radius;
          ctx.beginPath();
          ctx.moveTo(firstX, firstY);
          ctx.lineTo(lastX, lastY);
          ctx.strokeStyle = `rgba(100, 108, 255, 0.3)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        animationFrameId = requestAnimationFrame(animate);
      } catch (error) {
        console.error('Animation error:', error);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="geometric-background" />;
};

export default GeometricBackground;
