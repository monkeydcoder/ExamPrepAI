#!/usr/bin/env node

/**
 * Simple script to test the question answering API
 * 
 * Usage: 
 * 1. Ensure backend server is running
 * 2. Run this script with Node.js: node test-question.js
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001';
const TEST_QUESTION = 'What is the capital of France?';

const testTextQuestion = async () => {
  try {
    console.log('Testing text-based question answering...');
    console.log(`Question: "${TEST_QUESTION}"`);
    
    const response = await axios.post(`${API_BASE_URL}/api/evaluate-essay`, {
      essayText: TEST_QUESTION,
      model: 'llama3.2',
      isQuestion: true
    }, {
      timeout: 30000 // 30s timeout
    });
    
    console.log('Response:', response.data);
    
    if (response.data && response.data.text) {
      console.log('\nAnswer:');
      console.log(response.data.text);
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
  console.log('=== Testing Question Answering API ===');
  const success = await testTextQuestion();
  console.log('=== Test ' + (success ? 'PASSED' : 'FAILED') + ' ===');
})(); 