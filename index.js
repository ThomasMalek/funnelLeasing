import express from 'express';
import { Satellite } from '../funnelLeasing/models/Satellite.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const satellite = new Satellite();
await satellite.startTrackingSatellite();

app.get('/', (req, res) => {
    const homepageHTMLPath = __dirname + '/views/index.html';
    res.sendFile(homepageHTMLPath);
});


app.get('/stats', (req, res) => {
    res.send({ minAltitude: satellite.minAlt, maxAltitude: satellite.maxAlt, avgAltitude: satellite.avgAlt });
});

app.get('/health', (req, res) => {
    res.send({orbitalEmergencyStatus:satellite.orbitalEmergencyStatus})
})


app.listen(PORT, () => {
    console.log("Server Started: Visit Landing Page at: http://localhost:3000/")
})


