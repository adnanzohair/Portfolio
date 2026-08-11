import express from 'express';
import mongoose from 'mongoose';
import { mockProjects } from '../config/mockData.js';

const router = express.Router();

// GET /api/projects
router.get('/', async (req, res, next) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const Project = (await import('../models/Project.js')).default;
            const projects = await Project.find().sort({ order: 1 });
            return res.json({ success: true, data: projects });
        }
        // Fallback to mock data
        const { platform } = req.query;
        let data = mockProjects;
        if (platform && platform !== 'All') {
            data = data.filter(p => p.platform === platform);
        }
        res.json({ success: true, data });
    } catch (err) { next(err); }
});

// GET /api/projects/:slug
router.get('/:slug', async (req, res, next) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const Project = (await import('../models/Project.js')).default;
            const project = await Project.findOne({ slug: req.params.slug });
            if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
            return res.json({ success: true, data: project });
        }
        const project = mockProjects.find(p => p.slug === req.params.slug);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        res.json({ success: true, data: project });
    } catch (err) { next(err); }
});

export default router;
