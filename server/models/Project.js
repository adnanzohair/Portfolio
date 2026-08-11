import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    platform: { type: String, required: true, enum: ['Magento 2', 'WordPress', 'Webflow'] },
    url: { type: String },
    description: { type: String },
    heroImage: { type: String },
    gallery: [String],
    video: { type: String },
    technologies: [String],
    services: [String],
    role: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
