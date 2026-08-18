import express from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { saveContactSubmission } from '../services/submissionSheet.js';

const router = express.Router();

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many submissions, please try again later.' },
});

// POST /api/contact
router.post(
    '/',
    contactLimiter,
    [
        body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
        body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
        body('projectType').optional().trim().isLength({ max: 100 }),
        body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const { name, email, projectType, message } = req.body;

            if (mongoose.connection.readyState === 1) {
                const Contact = (await import('../models/Contact.js')).default;
                await Contact.create({ name, email, projectType, message });
            }

            await saveContactSubmission({ name, email, projectType, message });

            res.status(201).json({ success: true, message: 'Message saved successfully.' });
        } catch (err) { next(err); }
    }
);

export default router;
