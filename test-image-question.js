#!/usr/bin/env node

/**
 * Simple script to test the image-based question answering API
 * 
 * Usage: 
 * 1. Ensure backend server is running
 * 2. Run this script with Node.js: node test-image-question.js
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

// Test the image-based question answering
const testImageQuestion = async () => {
  try {
    // Ensure we have a test image
    if (!fs.existsSync(TEST_IMAGE_PATH)) {
      createTestImage();
    }
    
    // Read the test image
    const imageBuffer = fs.readFileSync(TEST_IMAGE_PATH);
    const base64Image = imageBuffer.toString('base64');
    const imageData = `data:image/png;base64,${base64Image}`;
    
    console.log('Sending image to the question answering API...');
    const response = await axios.post(`${API_BASE_URL}/api/evaluate-essay`, {
      imageData,
      isQuestion: true
    }, {
      timeout: 30000 // 30s timeout
    });
    
    console.log('Response received:', response.data);
    
    if (response.data && response.data.text) {
      console.log('\nAnswer:');
      console.log(response.data.text);
      
      if (response.data.imageUrl) {
        console.log('\nImage URL from server:');
        console.log(`${API_BASE_URL}${response.data.imageUrl}`);
      }
      
      return true;
    } else {
      console.error('Unexpected response format:', response.data);
      return false;
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
  console.log('=== Testing Image-Based Question Answering API ===');
  const success = await testImageQuestion();
  console.log('=== Test ' + (success ? 'PASSED' : 'FAILED') + ' ===');
})(); 