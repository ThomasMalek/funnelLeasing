import { Satellite } from '../funnelLeasing/models/Satellite.js';
import {jest} from '@jest/globals'

const testSatellite = new Satellite();

test("160 Altitude Returns A-OK Status",()=>{
    testSatellite.emergencyCountDown = 60;
    testSatellite.avgAlt = 160;
    testSatellite.setSatilleteDangerStatus();
    expect(testSatellite.orbitalEmergencyStatus).toBe("Altitude is A-OK")
})

test("<160 Altitude Returns Warning Rapid Decay Status",()=>{
    testSatellite.emergencyCountDown = 60;
    testSatellite.avgAlt = 159;
    testSatellite.setSatilleteDangerStatus();
    expect(testSatellite.orbitalEmergencyStatus).toBe("WARNING: RAPID ORBITAL DECAY IMMINENT")
})

test("Properly returns status as sustained low orbit after altitude>=160 ",()=>{
    testSatellite.emergencyCountDown = 60;
    testSatellite.avgAlt = 159;
    testSatellite.setSatilleteDangerStatus();
    testSatellite.avgAlt = 160;
    testSatellite.setSatilleteDangerStatus();
    const sustainedStatus = testSatellite.orbitalEmergencyStatus;
    expect(sustainedStatus).toBe("Sustained Low Earth Orbit Resumed");
})

test("Properly returns status as A-OK after altitude>=160 for 20 runs (1 minute) ",()=>{
    testSatellite.emergencyCountDown = 60;
    testSatellite.avgAlt = 159;
    testSatellite.setSatilleteDangerStatus();
    testSatellite.avgAlt = 160;
    testSatellite.setSatilleteDangerStatus();
    testSatellite.emergencyCountDown = 0;
    testSatellite.setSatilleteDangerStatus();
    expect(sustainedStatus).toBe("Altitude is A-OK");
})