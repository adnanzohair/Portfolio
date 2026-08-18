import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import { initializeContactSheet } from './services/submissionSheet.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
    const sheetPath = await initializeContactSheet();
    console.log(`Contact submissions sheet: ${sheetPath}`);

    // Try to connect to MongoDB (graceful fallback)
    const db = await connectDB();

    if (!db) {
        console.log('Running with mock data (MongoDB unavailable)');
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();
