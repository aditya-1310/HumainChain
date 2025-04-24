import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Safety Incident API',
      version: '1.0.0',
      description: 'API for managing AI safety incidents and reports',
      contact: {
        name: 'API Support',
        // Add your email or support URL here
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      // Add production server URL when deployed
    ],
    components: {
      schemas: {
        Incident: {
          type: 'object',
          required: ['title', 'description', 'severity'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated MongoDB ID',
            },
            title: {
              type: 'string',
              description: 'Title of the incident',
            },
            description: {
              type: 'string',
              description: 'Detailed description of the incident',
            },
            severity: {
              type: 'string',
              enum: ['Low', 'Medium', 'High'],
              description: 'Severity level of the incident',
            },
            reported_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the incident was reported',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            error: {
              type: 'object',
            },
          },
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options);

// Save Swagger JSON to file
const outputPath = path.resolve(__dirname, '../../swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2), 'utf8');
console.log(`Swagger documentation saved to ${outputPath}`); 