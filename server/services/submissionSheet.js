import { appendFile, mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.resolve(currentDirectory, '../data');
const sheetPath = path.join(dataDirectory, 'contact-submissions.csv');
const columns = ['Submitted At', 'Name', 'Email', 'Project Type', 'Message'];

let writeQueue = Promise.resolve();

const csvCell = (value = '') => {
    // Prefix spreadsheet formula characters so user input cannot execute in Excel.
    const normalized = String(value).replaceAll('\r\n', '\n').replaceAll('\r', '\n');
    const safeValue = /^[=+\-@]/.test(normalized) ? `'${normalized}` : normalized;
    return `"${safeValue.replaceAll('"', '""')}"`;
};

export const initializeContactSheet = async () => {
    await mkdir(dataDirectory, { recursive: true });

    try {
        const file = await stat(sheetPath);
        if (file.size > 0) return sheetPath;
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
    }

    await writeFile(sheetPath, `\uFEFF${columns.map(csvCell).join(',')}\n`, {
        encoding: 'utf8',
        mode: 0o600,
        flag: 'wx',
    }).catch((error) => {
        if (error.code !== 'EEXIST') throw error;
    });

    return sheetPath;
};

const writeSubmission = async ({ name, email, projectType, message }) => {
    await initializeContactSheet();
    const row = [new Date().toISOString(), name, email, projectType || 'Not specified', message]
        .map(csvCell)
        .join(',');

    await appendFile(sheetPath, `${row}\n`, { encoding: 'utf8', mode: 0o600 });
};

export const saveContactSubmission = (submission) => {
    const pendingWrite = writeQueue.then(() => writeSubmission(submission));
    writeQueue = pendingWrite.catch(() => {});
    return pendingWrite;
};

export const contactSheetPath = sheetPath;
