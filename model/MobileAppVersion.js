export class DeviceInfoModel {
    id: Number;
    androidAppVersion: string;
    iosAppVersion: string;

    constructor(id: Number, androidAppVersion: string, iosAppVersion: string) {
        this.id = id;
        this.androidAppVersion = androidAppVersion;
        this.iosAppVersion = iosAppVersion;
    }
}
