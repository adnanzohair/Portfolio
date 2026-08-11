import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { mockProjects, mockExperience, mockSkills, mockServices } from './config/mockData.js';

const app = express();

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10kb' }));

// Import routes
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';
import experienceRoutes from './routes/experience.js';
import skillRoutes from './routes/skills.js';
import serviceRoutes from './routes/services.js';

// API routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/services', serviceRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    });
});

export default app;
