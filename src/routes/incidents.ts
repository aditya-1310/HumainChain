import express from 'express';
import {
  getAllIncidents,
  createIncident,
  getIncidentById,
  deleteIncident,
} from '../controllers/incidentController';
import { validateRequest } from '../middleware/validateRequest';
import { 
  createIncidentSchema, 
  incidentIdSchema,
  incidentQuerySchema 
} from '../schemas/incidentSchema';
import { z } from 'zod';

const router = express.Router();

// Combine schemas for routes that need multiple validations
const getIncidentSchema = z.object({
  params: incidentIdSchema,
});

const createIncidentValidation = z.object({
  body: createIncidentSchema,
});

const queryValidation = z.object({
  query: incidentQuerySchema,
});

// Routes with validation
router.get('/', validateRequest(queryValidation), getAllIncidents);
router.post('/', validateRequest(createIncidentValidation), createIncident);
router.get('/:id', validateRequest(getIncidentSchema), getIncidentById);
router.delete('/:id', validateRequest(getIncidentSchema), deleteIncident);

export default router; 

///change to controller...........