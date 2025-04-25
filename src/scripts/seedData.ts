import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Incident from '../models/Incident';

dotenv.config();

const sampleIncidents = [
  {
    title: "AI Model Bias Detection",
    description: "Detected significant bias in AI model outputs affecting minority groups in hiring decisions.",
    severity: "High",
    reported_at: new Date('2024-02-01')
  },
  {
    title: "Data Privacy Breach",
    description: "AI system accidentally exposed sensitive user data during training process.",
    severity: "Medium",
    reported_at: new Date('2024-02-15')
  },
  {
    title: "Model Performance Degradation",
    description: "Gradual decline in AI model accuracy after deployment in production environment.",
    severity: "Low",
    reported_at: new Date('2024-03-01')
  },
  {
    title: "Unauthorized Model Access",
    description: "An AI model was accessed without proper authorization.",
    severity: "High",
    reported_at: new Date('2024-03-15')
  }
];

const seedData = async () => {
  try {
    const mongoURI = process.env.mongodb || 'mongodb://localhost:27017/ai_safety_incidents';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Incident.deleteMany({});
    console.log('Cleared existing incidents');

    // Insert sample data
    await Incident.insertMany(sampleIncidents);
    console.log('Sample incidents inserted successfully');

    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 