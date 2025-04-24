import express from 'express';
import {
  getAllIncidents,
  createIncident,
  getIncidentById,
  deleteIncident
} from '../controllers/incidentController';

const router = express.Router();

router.get('/', getAllIncidents);
router.post('/', createIncident);
router.get('/:id', getIncidentById);
router.delete('/:id', deleteIncident);

export default router; 

///change to controller...........