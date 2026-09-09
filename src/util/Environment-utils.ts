import * as fs from 'fs';
import * as dotenv from 'dotenv';
import path from 'path';

interface User {
  UserKey: string;
  Name: string;
  Password: string;
}

interface testdataConfig {
  Url: string;
  Users: User[];
}

// ✅ Load environment variables early in the script
// Only load .env file in local development, not in CI environments
if (!process.env.CI) {
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}

// ✅ Set default environment if `TEST_ENV` is not set
const environment = process.env.TEST_ENV || 'staging';



// ✅ Function to resolve the payload file path dynamically
function resolvePayloadPath(filename: string): string {
   
  const configPath = path.resolve(__dirname, '../../resources', environment, filename);
  
  if (!fs.existsSync(configPath)) {
    throw new Error(`🚨 Payload file not found: ${configPath}`);
  }
  
  return configPath;
}

// ✅ Function to load and parse payload files safely
export function testdataConfig(filename: string): testdataConfig {
  try {
    const configPath = resolvePayloadPath(filename);
    const fileContent = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(fileContent) as testdataConfig;
  } catch (error) {
    console.error(`❌ Error loading payload:`, error);
    throw error;
  }
}

// ✅ Function to retrieve test data with improved error handling
export function getTestData(): testdataConfig {
  try {
    return testdataConfig('TestData.json');
  } catch (error) {
    console.error(`❌ Error retrieving test data:`, error);
    throw error;
  }






  
}

