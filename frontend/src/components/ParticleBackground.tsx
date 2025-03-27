import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  baseX: number;
  baseY: number;
}

interface ParticleBackgroundProps {
  colors?: string[];
  particleCount?: number;
  particleSpeed?: number;
  lineLength?: number;
  lineWidth?: number;
  backgroundColor?: string;
  particleMinRadius?: number;
  particleMaxRadius?: number;
  blendMode?: string;
  particleOpacity?: number;
  lineOpacity?: number;
  enableHover?: boolean;
  enableParallax?: boolean;
  parallaxIntensity?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  colors = ['#00d1ff', '#9b59b6', '#ff2d55'], // Default gradient colors
  particleCount = 100,
  particleSpeed = 0.4, // Moderate speed
  lineLength = 150,
  lineWidth = 0.8,
  backgroundColor = 'transparent',
  particleMinRadius = 1,
  particleMaxRadius = 3,
  blendMode = 'lighter',
  particleOpacity = 0.7,
  lineOpacity = 0.3, // Connection line opacity
  enableHover = true,
  enableParallax = true,
  parallaxIntensity = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const theme = useTheme();
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set blend mode
    if (blendMode) {
      ctx.globalCompositeOperation = blendMode as GlobalCompositeOperation;
    }

    // Handle mouse movement for hover interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (enableHover) {
        const rect = canvas.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    // Handle scroll for parallax effect
    const handleScroll = () => {
      if (enableParallax) {
        setScrollY(window.scrollY);
      }
    };

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Initialize particles with color gradient
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        // Assign color from gradient
        const colorIndex = Math.floor(Math.random() * colors.length);
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        particlesRef.current.push({
          x,
          y,
          baseX: x, // Store original position for parallax
          baseY: y,
          vx: (Math.random() - 0.5) * particleSpeed,
          vy: (Math.random() - 0.5) * particleSpeed,
          radius: Math.random() * (particleMaxRadius - particleMinRadius) + particleMinRadius,
          opacity: Math.random() * 0.3 + particleOpacity,
          color: colors[colorIndex],
        });
      }
    };

    // Animation loop with hover and parallax effects
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background if specified
      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        let { x, y, baseX, baseY } = particle;
        
        // Apply parallax effect
        if (enableParallax) {
          const parallaxX = (scrollY / parallaxIntensity) * (i % 3 - 1);
          const parallaxY = (scrollY / parallaxIntensity) * (i % 2 - 0.5);
          x = baseX + parallaxX;
          y = baseY + parallaxY;
        } else {
          // Normal position update
          particle.x += particle.vx;
          particle.y += particle.vy;
          x = particle.x;
          y = particle.y;
        }
        
        // Hover effect - particles move away from cursor
        if (enableHover && mousePosition) {
          const dx = mousePosition.x - x;
          const dy = mousePosition.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            // Move particles away from cursor
            const angle = Math.atan2(dy, dx);
            const repelForce = (80 - distance) / 80;
            x -= Math.cos(angle) * repelForce * 3;
            y -= Math.sin(angle) * repelForce * 3;
          }
        }
        
        // Bounce off edges
        if (x < 0 || x > canvas.width) {
          particle.vx = -particle.vx;
          x = x < 0 ? 0 : canvas.width;
        }
        if (y < 0 || y > canvas.height) {
          particle.vy = -particle.vy;
          y = y < 0 ? 0 : canvas.height;
        }
        
        // Update particle position
        particle.x = x;
        particle.y = y;

        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particle2 = particlesRef.current[j];
          const dx = x - particle2.x;
          const dy = y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < lineLength) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(particle2.x, particle2.y);
            
            // Calculate opacity based on distance
            const opacity = (1 - distance / lineLength) * lineOpacity;
            ctx.strokeStyle = `#ffffff${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Init and add event listeners
    handleResize();
    window.addEventListener('resize', handleResize);
    
    if (enableHover) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }
    
    if (enableParallax) {
      window.addEventListener('scroll', handleScroll);
    }
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (enableHover) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      if (enableParallax) {
        window.removeEventListener('scroll', handleScroll);
      }
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [
    particleCount, 
    particleSpeed, 
    lineLength, 
    lineWidth, 
    colors,
    backgroundColor,
    particleMinRadius,
    particleMaxRadius,
    blendMode,
    particleOpacity,
    lineOpacity,
    enableHover,
    enableParallax,
    parallaxIntensity,
    mousePosition,
    scrollY
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleBackground; 