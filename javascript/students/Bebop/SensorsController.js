import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.activeScanData = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error)) {
            this.target = scanResult[0];
            const activeScanData = activeScan(this.target.heading - 1, 2, 250);
            if (!(activeScanData instanceof Error)) {
                this.activeScanData = activeScanData;
            }
        }
    }
}
