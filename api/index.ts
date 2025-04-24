import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Forward the request to your Express app
  return new Promise((resolve, reject) => {
    app(req, res);
    // Add listeners to handle when the response is complete
    res.on('finish', resolve);
    res.on('error', reject);
  });
} 