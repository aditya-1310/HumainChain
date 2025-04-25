import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/database.ts';
import incidentRoutes from './routes/incidents.ts';
import { specs } from './config/swagger.ts';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/incidents', incidentRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Safety Incident Log API is running',
    documentation: '/api-docs',
    version: '1.0.0'
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`API Documentation available at http://localhost:${port}/api-docs`);
  });
}

// Export for Vercel
export default app; 