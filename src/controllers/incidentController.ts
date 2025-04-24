import { Request, Response } from 'express';
import Incident from '../models/Incident';

interface CreateIncidentBody {
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

interface IdParam {
  id: string;
}

/**
 * @swagger
 * /api/incidents:
 *   get:
 *     summary: Get all incidents
 *     tags: [Incidents]
 *     responses:
 *       200:
 *         description: List of all incidents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Incident'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getAllIncidents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const incidents = await Incident.find().sort({ reported_at: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incidents', error });
  }
};

/**
 * @swagger
 * /api/incidents:
 *   post:
 *     summary: Create a new incident
 *     tags: [Incidents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - severity
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               severity:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *     responses:
 *       201:
 *         description: Created incident
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Incident'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const createIncident = async (
  req: Request<{}, {}, CreateIncidentBody>,
  res: Response
): Promise<void> => {
  try {
    const { title, description, severity } = req.body;

    // Validate required fields
    if (!title || !description || !severity) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Validate severity
    if (!['Low', 'Medium', 'High'].includes(severity)) {
      res.status(400).json({ message: 'Invalid severity level' });
      return;
    }

    const incident = new Incident({
      title,
      description,
      severity,
    });

    const savedIncident = await incident.save();
    res.status(201).json(savedIncident);
  } catch (error) {
    res.status(500).json({ message: 'Error creating incident', error });
  }
};

/**
 * @swagger
 * /api/incidents/{id}:
 *   get:
 *     summary: Get an incident by ID
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Incident ID
 *     responses:
 *       200:
 *         description: The incident
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Incident'
 *       404:
 *         description: Incident not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getIncidentById = async (
  req: Request<IdParam>,
  res: Response
): Promise<void> => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      res.status(404).json({ message: 'Incident not found' });
      return;
    }
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incident', error });
  }
};

/**
 * @swagger
 * /api/incidents/{id}:
 *   delete:
 *     summary: Delete an incident
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Incident ID
 *     responses:
 *       204:
 *         description: Incident deleted successfully
 *       404:
 *         description: Incident not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const deleteIncident = async (
  req: Request<IdParam>,
  res: Response
): Promise<void> => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      res.status(404).json({ message: 'Incident not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting incident', error });
  }
}; 