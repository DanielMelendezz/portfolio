import { useEffect, useRef } from 'react';
import './GeometricBackground.css';

const GeometricBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const nebulaBlobsRef = useRef([]);
  const floatingShapesRef = useRef([]);
  const pulseWavesRef = useRef([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    // Color palette
    const colors = [
      { r: 100, g: 108, b: 255 },  // blue-violet
      { r: 97, g: 218, b: 251 },   // cyan
      { r: 139, g: 92, b: 246 },   // purple
      { r: 59, g: 130, b: 246 },   // blue
      { r: 168, g: 85, b: 247 },   // magenta-purple
    ];

    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

    // ---- PARTICLES (3 layers for parallax depth) ----
    const initParticles = () => {
      particlesRef.current = [];
      const layers = [
        { count: 25, speed: 0.15, sizeRange: [1, 2], opacity: 0.25, depth: 0.3 },
        { count: 40, speed: 0.35, sizeRange: [1.5, 3], opacity: 0.5, depth: 0.6 },
        { count: 30, speed: 0.6, sizeRange: [2, 4.5], opacity: 0.8, depth: 1.0 },
      ];
      layers.forEach((layer) => {
        for (let i = 0; i < layer.count; i++) {
          const col = randomColor();
          particlesRef.current.push({
            x: Math.random() * W(),
            y: Math.random() * H(),
            vx: (Math.random() - 0.5) * layer.speed,
            vy: (Math.random() - 0.5) * layer.speed,
            size: Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]) + layer.sizeRange[0],
            baseOpacity: layer.opacity,
            depth: layer.depth,
            color: col,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      });
    };
    initParticles();

    // ---- NEBULA BLOBS ----
    const initNebulaBlobs = () => {
      nebulaBlobsRef.current = [];
      for (let i = 0; i < 5; i++) {
        const col = randomColor();
        nebulaBlobsRef.current.push({
          x: Math.random() * W(),
          y: Math.random() * H(),
          radius: Math.random() * 200 + 150,
          color: col,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    initNebulaBlobs();

    // ---- FLOATING GEOMETRIC SHAPES ----
    const initFloatingShapes = () => {
      floatingShapesRef.current = [];
      const shapeTypes = ['triangle', 'hexagon', 'diamond', 'pentagon'];
      for (let i = 0; i < 12; i++) {
        const col = randomColor();
        floatingShapesRef.current.push({
          x: Math.random() * W(),
          y: Math.random() * H(),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 25 + 15,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.015,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          color: col,
          opacity: Math.random() * 0.15 + 0.05,
        });
      }
    };
    initFloatingShapes();

    // ---- SHOOTING STARS ----
    const spawnShootingStar = () => {
      const col = randomColor();
      const angle = Math.random() * 0.5 + 0.3; // roughly diagonal
      const speed = Math.random() * 6 + 4;
      shootingStarsRef.current.push({
        x: Math.random() * W() * 0.8,
        y: -10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: Math.random() * 0.008 + 0.006,
        length: Math.random() * 80 + 40,
        color: col,
        width: Math.random() * 2 + 1,
      });
    };

    // ---- PULSE WAVES ----
    const spawnPulseWave = () => {
      const col = randomColor();
      pulseWavesRef.current.push({
        x: Math.random() * W(),
        y: Math.random() * H(),
        radius: 0,
        maxRadius: Math.random() * 200 + 100,
        speed: Math.random() * 1.5 + 0.5,
        opacity: 0.3,
        color: col,
      });
    };

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Click to spawn pulse
    const handleClick = (e) => {
      const col = randomColor();
      pulseWavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 250,
        speed: 3,
        opacity: 0.5,
        color: col,
      });
    };
    window.addEventListener('click', handleClick);

    // Spawn timers
    let shootingStarTimer = 0;
    let pulseTimer = 0;

    // ---- DRAW HELPERS ----
    const drawShape = (cx, cy, size, type, rotation, color, opacity) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      const sides = type === 'triangle' ? 3 : type === 'diamond' ? 4 : type === 'pentagon' ? 5 : 6;
      for (let i = 0; i <= sides; i++) {
        const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
        const x = Math.cos(angle) * size;
        const y = Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    };

    // ---- MAIN ANIMATION ----
    const animate = () => {
      try {
        timeRef.current += 0.016;
        const t = timeRef.current;
        const w = W();
        const h = H();

        ctx.clearRect(0, 0, w, h);

        // 1. Nebula blobs (very soft background glow)
        nebulaBlobsRef.current.forEach((blob) => {
          blob.x += blob.vx;
          blob.y += blob.vy;
          if (blob.x < -blob.radius) blob.x = w + blob.radius;
          if (blob.x > w + blob.radius) blob.x = -blob.radius;
          if (blob.y < -blob.radius) blob.y = h + blob.radius;
          if (blob.y > h + blob.radius) blob.y = -blob.radius;

          const pulse = Math.sin(t * 0.5 + blob.phase) * 0.3 + 1;
          const r = blob.radius * pulse;
          const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, r);
          gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.06)`);
          gradient.addColorStop(0.5, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.025)`);
          gradient.addColorStop(1, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.fillRect(blob.x - r, blob.y - r, r * 2, r * 2);
        });

        // 2. Floating geometric shapes
        floatingShapesRef.current.forEach((shape) => {
          shape.x += shape.vx;
          shape.y += shape.vy;
          shape.rotation += shape.rotationSpeed;
          if (shape.x < -50) shape.x = w + 50;
          if (shape.x > w + 50) shape.x = -50;
          if (shape.y < -50) shape.y = h + 50;
          if (shape.y > h + 50) shape.y = -50;

          // Mouse proximity glow
          const dx = shape.x - mouseRef.current.x;
          const dy = shape.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let extraOpacity = 0;
          if (dist < 250) {
            extraOpacity = (1 - dist / 250) * 0.25;
          }

          drawShape(shape.x, shape.y, shape.size, shape.type, shape.rotation, shape.color, shape.opacity + extraOpacity);
        });

        // 3. Particles + connections
        const particles = particlesRef.current;
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          p.x = Math.max(0, Math.min(w, p.x));
          p.y = Math.max(0, Math.min(h, p.y));
        });

        // Draw connections (only between same-depth or adjacent-depth particles)
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            if (Math.abs(a.depth - b.depth) > 0.35) continue;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 140 * a.depth;
            if (dist < maxDist && dist > 0) {
              const alpha = (1 - dist / maxDist) * 0.25 * a.depth;
              const col = a.color;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        // Draw particles with glow
        particles.forEach((p) => {
          const pulse = Math.sin(t * 2 + p.pulsePhase) * 0.3 + 0.7;
          const alpha = p.baseOpacity * pulse;
          const col = p.color;

          // Glow
          if (p.depth > 0.5) {
            const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
            glow.addColorStop(0, `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha * 0.3})`);
            glow.addColorStop(1, `rgba(${col.r}, ${col.g}, ${col.b}, 0)`);
            ctx.fillStyle = glow;
            ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`;
          ctx.fill();
        });

        // 4. Mouse interaction - attract nearby particles + glowing aura
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        if (mx > 0 && my > 0) {
          // Glowing aura around cursor
          const auraGradient = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
          auraGradient.addColorStop(0, 'rgba(100, 108, 255, 0.08)');
          auraGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
          auraGradient.addColorStop(1, 'rgba(100, 108, 255, 0)');
          ctx.fillStyle = auraGradient;
          ctx.fillRect(mx - 120, my - 120, 240, 240);

          // Rotating ring around cursor
          const ringRadius = 40 + Math.sin(t * 2) * 8;
          const ringPoints = 8;
          for (let i = 0; i < ringPoints; i++) {
            const angle = (Math.PI * 2 * i) / ringPoints + t * 0.8;
            const px = mx + Math.cos(angle) * ringRadius;
            const py = my + Math.sin(angle) * ringRadius;
            const nextAngle = (Math.PI * 2 * ((i + 1) % ringPoints)) / ringPoints + t * 0.8;
            const nx = mx + Math.cos(nextAngle) * ringRadius;
            const ny = my + Math.sin(nextAngle) * ringRadius;

            // Dot
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(97, 218, 251, ${0.5 + Math.sin(t * 3 + i) * 0.2})`;
            ctx.fill();

            // Line to next
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(nx, ny);
            ctx.strokeStyle = `rgba(100, 108, 255, 0.2)`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Attract particles to mouse
          particles.forEach((p) => {
            const dx = p.x - mx;
            const dy = p.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const range = 200 * p.depth;

            if (dist < range && dist > 0) {
              const force = ((range - dist) / range) * 0.02 * p.depth;
              p.vx -= (dx / dist) * force;
              p.vy -= (dy / dist) * force;

              // Clamp velocity
              const maxV = 1.5;
              p.vx = Math.max(-maxV, Math.min(maxV, p.vx));
              p.vy = Math.max(-maxV, Math.min(maxV, p.vy));

              // Draw line to mouse
              const col = p.color;
              const alpha = (1 - dist / range) * 0.2 * p.depth;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mx, my);
              ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        }

        // 5. Pulse waves
        pulseWavesRef.current = pulseWavesRef.current.filter((pw) => {
          pw.radius += pw.speed;
          pw.opacity = 0.3 * (1 - pw.radius / pw.maxRadius);
          if (pw.radius >= pw.maxRadius) return false;

          ctx.beginPath();
          ctx.arc(pw.x, pw.y, pw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${pw.color.r}, ${pw.color.g}, ${pw.color.b}, ${pw.opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          return true;
        });

        // 6. Shooting stars
        shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
          star.x += star.vx;
          star.y += star.vy;
          star.life -= star.decay;
          if (star.life <= 0) return false;

          const tailX = star.x - (star.vx / Math.sqrt(star.vx * star.vx + star.vy * star.vy)) * star.length * star.life;
          const tailY = star.y - (star.vy / Math.sqrt(star.vx * star.vx + star.vy * star.vy)) * star.length * star.life;

          const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
          gradient.addColorStop(0, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 0)`);
          gradient.addColorStop(1, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${star.life * 0.8})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(star.x, star.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = star.width;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Bright head
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.width, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.life * 0.9})`;
          ctx.fill();

          return true;
        });

        // Spawn shooting stars occasionally
        shootingStarTimer += 0.016;
        if (shootingStarTimer > 1.5 + Math.random() * 2) {
          spawnShootingStar();
          shootingStarTimer = 0;
        }

        // Spawn pulse waves occasionally
        pulseTimer += 0.016;
        if (pulseTimer > 4 + Math.random() * 3) {
          spawnPulseWave();
          pulseTimer = 0;
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
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="geometric-background" />;
};

export default GeometricBackground;
