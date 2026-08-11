import express from 'express';
import mongoose from 'mongoose';
import { mockSkills } from '../config/mockData.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const Skill = (await import('../models/Skill.js')).default;
            const skills = await Skill.find().sort({ order: 1 });
            return res.json({ success: true, data: skills });
        }
        res.json({ success: true, data: mockSkills });
    } catch (err) { next(err); }
});

export default router;
