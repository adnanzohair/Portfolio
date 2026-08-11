import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ['E-commerce', 'Development', 'Backend / Data'] },
    proficiency: { type: Number, min: 0, max: 100 },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
