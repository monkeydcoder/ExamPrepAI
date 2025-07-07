#!/usr/bin/env node

/**
 * Simple script to test the image upload and retrieval APIs
 * 
 * Usage: 
 * 1. Ensure backend server is running
 * 2. Run this script with Node.js: node test-image-api.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001';
const TEST_IMAGE_PATH = path.join(__dirname, 'test-image.png');

// Create a simple test image if it doesn't exist
const createTestImage = () => {
  console.log('Creating test image...');
  // Simple 1x1 transparent PNG
  const transparentPixelPNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
  fs.writeFileSync(TEST_IMAGE_PATH, transparentPixelPNG);
  console.log(`Test image created at ${TEST_IMAGE_PATH}`);
};

// Test the image upload API
const testImageUpload = async () => {
  try {
    // Ensure we have a test image
    if (!fs.existsSync(TEST_IMAGE_PATH)) {
      createTestImage();
    }
    
    // Read the test image
    const imageBuffer = fs.readFileSync(TEST_IMAGE_PATH);
    const base64Image = imageBuffer.toString('base64');
    const imageData = `data:image/png;base64,${base64Image}`;
    
    console.log('Uploading test image...');
    const response = await axios.post(`${API_BASE_URL}/api/test-image-upload`, {
      imageData
    });
    
    console.log('Upload response:', response.data);
    
    if (response.data.imageUrl) {
      console.log(`Image URL: ${API_BASE_URL}${response.data.imageUrl}`);
      
      // Test accessing the image
      console.log('Testing image retrieval...');
      try {
        const imageResponse = await axios.get(`${API_BASE_URL}${response.data.imageUrl}`, {
          responseType: 'arraybuffer'
        });
        
        const contentType = imageResponse.headers['content-type'];
        console.log(`Image retrieved successfully! Content type: ${contentType}`);
        console.log(`Image size: ${imageResponse.data.length} bytes`);
        
        return true;
      } catch (error) {
        console.error('Error retrieving image:', error.message);
        return false;
      }
    }
  } catch (error) {
    console.error('Error in test:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return false;
  }
};

// Run the test
(async () => {
  console.log('=== Testing Image API ===');
  const success = await testImageUpload();
  console.log('=== Test ' + (success ? 'PASSED' : 'FAILED') + ' ===');
})(); 