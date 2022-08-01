import fetch from 'node-fetch';
import datefns from 'date-fns';

export class Satellite {

    constructor() {
        this.currentAltitude = null,
            this.altitudeHistory = {},
            this.orbitalEmergency = false,
            this.orbitalEmergencyStatus = "No Recorded Status",
            this.maxAlt = null,
            this.minAlt = null,
            this.avgAlt = null,
            this.emergencyCountDown = 60;
    }

    async startTrackingSatellite() {
        const newData = await this.getSatelliteData();
        this.updateSatelliteData(newData);
        this.removeOutDatedData();
        this.calculateAltitudeStats();
        this.setSatilleteDangerStatus();
        setTimeout(async () => {
            await this.startTrackingSatellite();
        }, 3000);
    }

    async getSatelliteData() {
        try {
            const request = await fetch('http://nestio.space/api/satellite/data');
            const data = await request.json();
            return data
        } catch {
            return {};
        }
    }

    updateSatelliteData(newData) {
        if (!this.altitudeHistory[newData["last_updated"]]) {
            this.altitudeHistory[newData["last_updated"]] = newData["altitude"];
        }
    }

    removeOutDatedData() {
        const fiveMinsAgo = datefns.subMinutes(new Date(), 5);
        for (let key of Object.keys(this.altitudeHistory)) {
            if (datefns.isBefore(datefns.parseJSON(key), fiveMinsAgo)) {
                delete this.altitudeHistory[key];
            }
        }
    }

    calculateAltitudeStats() {
        const altitudes = Object.values(this.altitudeHistory);
        this.maxAlt = Math.max(...altitudes);
        this.minAlt = Math.min(...altitudes);
        this.avgAlt = (altitudes.reduce((a, b) => a + b)) / altitudes.length;
    }

    setSatilleteDangerStatus() {
        if (this.avgAlt < 160) {
            this.orbitalEmergencyStatus = "WARNING: RAPID ORBITAL DECAY IMMINENT"
            this.orbitalEmergency = true;
            this.emergencyCountDown = 60;
        }
        else {
            this.orbitalEmergency = false;
            if (this.orbitalEmergencyStatus === "WARNING: RAPID ORBITAL DECAY IMMINENT" || this.orbitalEmergencyStatus === "Sustained Low Earth Orbit Resumed") {
                if (this.emergencyCountDown > 0) {
                    this.orbitalEmergencyStatus = "Sustained Low Earth Orbit Resumed";
                    this.emergencyCountDown -= 3;
                } else{
                    this.orbitalEmergencyStatus = "Altitude is A-OK"
                    this.emergencyCountDown = 60;
                }
            } else {
                this.orbitalEmergencyStatus = "Altitude is A-OK"
                this.emergencyCountDown = 60;
            }
        }
    }
}