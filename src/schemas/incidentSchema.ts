import { z } from 'zod';

// Enum for severity levels
export const SeverityEnum = z.enum(['Low', 'Medium', 'High']);

// Schema for creating a new incident
export const createIncidentSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string',
  })
  .min(3, 'Title must be at least 3 characters long')
  .max(100, 'Title must not exceed 100 characters'),
  
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  })
  .min(10, 'Description must be at least 10 characters long')
  .max(1000, 'Description must not exceed 1000 characters'),
  
  severity: SeverityEnum,
});

// Schema for updating an incident
export const updateIncidentSchema = createIncidentSchema.partial();

// Schema for incident ID parameter
export const incidentIdSchema = z.object({
  id: z.string({
    required_error: 'Incident ID is required',
    invalid_type_error: 'Incident ID must be a string',
  }).regex(/^[0-9a-fA-F]{24}$/, 'Invalid incident ID format'),
});

// Type inference
export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;
export type UpdateIncidentInput = z.infer<typeof updateIncidentSchema>;
export type IncidentId = z.infer<typeof incidentIdSchema>;

// Query parameters schema for filtering incidents
export const incidentQuerySchema = z.object({
  severity: SeverityEnum.optional(),
  search: z.string().optional(),
  limit: z.string().regex(/^\d+$/, 'Limit must be a number').transform(Number).optional(),
  page: z.string().regex(/^\d+$/, 'Page must be a number').transform(Number).optional(),
  sortBy: z.enum(['title', 'severity', 'reported_at']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
}).strict(); 