import express from 'express';
import mongoose from 'mongoose';
import Service from '../models/Service.js';
import { mockServices } from '../config/mockData.js';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const data = mongoose.connection.readyState === 1
      ? await Service.find().sort({ order: 1 }).lean()
      : mockServices;
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;
