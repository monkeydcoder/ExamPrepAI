import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface StarBackgroundProps {
  starCount?: number;
  twinklePercentage?: number;
}

const StarBackground: React.FC<StarBackgroundProps> = ({
  starCount = 500,
  twinklePercentage = 30, // % of stars that will twinkle
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Clear any existing stars
    container.innerHTML = '';
    
    // Create the stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      
      // Set star position (random across the screen)
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      
      // Determine star size (mostly small with a few larger ones)
      const sizeRandom = Math.random();
      let size;
      
      if (sizeRandom < 0.85) {
        // 85% of stars are tiny (1-1.5px)
        size = 1 + Math.random() * 0.5;
      } else if (sizeRandom < 0.95) {
        // 10% are small (1.5-2px)
        size = 1.5 + Math.random() * 0.5;
      } else {
        // 5% are medium (2-2.5px)
        size = 2 + Math.random() * 0.5;
      }
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Set default style for star
      star.style.position = 'absolute';
      star.style.borderRadius = '50%';
      
      // Slightly different white colors for varied appearance
      const colorRandom = Math.random();
      if (colorRandom < 0.7) {
        // 70% pure white
        star.style.backgroundColor = '#ffffff';
      } else if (colorRandom < 0.85) {
        // 15% slightly blue-white
        star.style.backgroundColor = '#f0f8ff';
      } else {
        // 15% slightly warm white
        star.style.backgroundColor = '#fffaf0';
      }
      
      // Set opacity to add depth effect
      star.style.opacity = (0.4 + Math.random() * 0.6).toString();
      
      // Add twinkling animation to some stars
      if (Math.random() * 100 < twinklePercentage) {
        // Random animation duration (varies the twinkle speed)
        const duration = 3 + Math.random() * 7;
        
        // Random delay so they don't all twinkle in sync
        const delay = Math.random() * 10;
        
        star.style.animation = `twinkleStar ${duration}s ease-in-out ${delay}s infinite`;
      }
      
      container.appendChild(star);
    }
  }, [starCount, twinklePercentage]);

  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(to bottom, #0a0a0a, #000000)'
            : 'linear-gradient(to bottom, #0a0a0a, #000000)',
          zIndex: 0,
          pointerEvents: 'none', // Pass through mouse events to elements below
          overflow: 'hidden',
          
          // Define the twinkle animation with @keyframes
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
          },
          
          '@keyframes twinkleStar': {
            '0%, 100%': {
              opacity: '1',
            },
            '50%': {
              opacity: '0.2',
            }
          }
        }}
      />
    </>
  );
};

export default StarBackground; 