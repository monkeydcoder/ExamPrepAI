import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface SpaceshipBackgroundProps {
  shipCount?: number;
  collisionFrequency?: number; // Higher value = less frequent collisions (1-100)
}

interface Spaceship {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  opacity: number;
  color: string;
}

const SpaceshipBackground: React.FC<SpaceshipBackgroundProps> = ({
  shipCount = 5,
  collisionFrequency = 40, // Higher means less frequent collisions
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shipsRef = useRef<Spaceship[]>([]);
  const animationRef = useRef<number>(0);
  const theme = useTheme();
  
  // Initialize spaceships
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Create spaceships
    shipsRef.current = [];
    for (let i = 0; i < shipCount; i++) {
      const greyShade = Math.floor(Math.random() * 25) + 180; // 180-205 for light grey
      shipsRef.current.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 10, // 10-15px (small spaceships)
        speed: Math.random() * 0.5 + 0.2, // 0.2-0.7 speed
        angle: Math.random() * 2 * Math.PI, // Random direction
        opacity: Math.random() * 0.3 + 0.7, // 0.7-1.0 opacity
        color: `rgb(${greyShade}, ${greyShade}, ${greyShade})`
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw spaceships
      for (let i = 0; i < shipsRef.current.length; i++) {
        const ship = shipsRef.current[i];
        
        // Update position
        ship.x += Math.cos(ship.angle) * ship.speed;
        ship.y += Math.sin(ship.angle) * ship.speed;
        
        // Check for boundary collisions (wrap around)
        if (ship.x < 0) ship.x = canvas.width;
        if (ship.x > canvas.width) ship.x = 0;
        if (ship.y < 0) ship.y = canvas.height;
        if (ship.y > canvas.height) ship.y = 0;
        
        // Check for ship collisions (occasional)
        for (let j = i + 1; j < shipsRef.current.length; j++) {
          const otherShip = shipsRef.current[j];
          const dx = ship.x - otherShip.x;
          const dy = ship.y - otherShip.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < (ship.size + otherShip.size)) {
            // Only create collision if random value is higher than collision frequency
            if (Math.random() * 100 > collisionFrequency) {
              // Collision physics - change direction and add small explosion effect
              const tempAngle = ship.angle;
              ship.angle = otherShip.angle;
              otherShip.angle = tempAngle;
              
              // Add temporary collision effect
              ctx.beginPath();
              ctx.arc(
                (ship.x + otherShip.x) / 2,
                (ship.y + otherShip.y) / 2,
                (ship.size + otherShip.size) / 2,
                0,
                2 * Math.PI
              );
              ctx.fillStyle = `rgba(255, 255, 255, 0.7)`;
              ctx.fill();
            }
          }
        }
        
        // Draw spaceship
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.angle);
        
        // Draw engine trail
        const trailLength = ship.size * 2;
        const trailWidth = ship.size / 2;
        
        const gradient = ctx.createLinearGradient(
          -trailLength, 0, 0, 0
        );
        gradient.addColorStop(0, `rgba(${ship.color.split('(')[1].split(')')[0]}, 0)`);
        gradient.addColorStop(1, ship.color);
        
        ctx.beginPath();
        ctx.moveTo(-trailLength, -trailWidth/2);
        ctx.lineTo(-trailLength, trailWidth/2);
        ctx.lineTo(0, 0);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw spaceship body
        const bodyLength = ship.size;
        const bodyWidth = ship.size * 0.6;
        
        // Main body (triangular shape)
        ctx.beginPath();
        ctx.moveTo(bodyLength, 0); // Nose of the ship
        ctx.lineTo(-bodyLength/2, -bodyWidth/2); // Bottom left
        ctx.lineTo(-bodyLength/2, bodyWidth/2); // Bottom right
        ctx.closePath();
        ctx.fillStyle = ship.color;
        ctx.fill();
        
        // Cockpit (small circle)
        ctx.beginPath();
        ctx.arc(bodyLength/4, 0, bodyLength/4, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${ship.color.split('(')[1].split(')')[0]}, ${ship.opacity + 0.2})`;
        ctx.fill();
        
        ctx.restore();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [shipCount, collisionFrequency]);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1, // Slightly above the star background
        pointerEvents: 'none', // Pass through mouse events to elements below
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default SpaceshipBackground; 