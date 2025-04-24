import { specs } from '../src/config/swagger';
import fs from 'fs';
import path from 'path';

// Save Swagger JSON to file
const outputPath = path.resolve(__dirname, '../swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2), 'utf8');
console.log(`Swagger documentation saved to ${outputPath}`); 