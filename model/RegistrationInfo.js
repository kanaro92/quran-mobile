import {DeviceInfoModel} from "./DeviceInfoModel";

export class RegistrationInfo {
    code: number;
    deviceInfoModel: DeviceInfoModel;

    constructor(code: number, deviceInfoModel: DeviceInfoModel) {
        this.code = code;
        this.deviceInfoModel = deviceInfoModel;
    }
}
