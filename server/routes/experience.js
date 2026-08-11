import express from 'express';
import mongoose from 'mongoose';
import { mockExperience } from '../config/mockData.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const Experience = (await import('../models/Experience.js')).default;
            const experiences = await Experience.find().sort({ order: 1 });
            return res.json({ success: true, data: experiences });
        }
        res.json({ success: true, data: mockExperience });
    } catch (err) { next(err); }
});

export default router;
