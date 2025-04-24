import mongoose, { Document, Schema } from 'mongoose';

export interface IIncident extends Document {
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  reported_at: Date;
}

const IncidentSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: [true, 'Severity is required'],
  },
  reported_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IIncident>('Incident', IncidentSchema); 