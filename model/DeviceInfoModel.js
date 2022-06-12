export class DeviceInfoModel {
    uniqueId: string;
    baseOs: string;
    deviceName: string;
    deviceModel: string;
    manufacturer: string;
    firstInstallTime: string;

    constructor(uniqueId: string, baseOs: string, deviceName: string, deviceModel: string,  manufacturer: string, firstInstallTime: string) {
        this.uniqueId = uniqueId;
        this.baseOs = baseOs;
        this.deviceName = deviceName;
        this.deviceModel = deviceModel;
        this.manufacturer = manufacturer;
        this.firstInstallTime = firstInstallTime;
    }
}
