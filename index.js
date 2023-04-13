/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
/*import CronJob from "react-native-cron-job";*/
import freeSourates from "./free-sourates";

PushNotification.configure({
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },
    requestPermissions: Platform.OS === 'ios'
});

/*const CronJobTask = async () => {
    // Do your task here.
    console.log("Cron Job executed");
    let randomSourat = freeSourates[Math.floor(Math.random() * freeSourates.length)];

    PushNotification.localNotificationSchedule({
        channelId: "Quran-Pulaar",
        title: randomSourat.pr_title + " - " + randomSourat.ar_title,
        message: randomSourat.ayats_list.ayats[1].ar_ayat + "\n" + randomSourat.ayats_list.ayats[1].pr_ayat,
        date: new Date(Date.now() + 10 * 1000),
    });
    // Be sure to call completeTask at the end.
    CronJob.completeTask();
};*/
AppRegistry.registerHeadlessTask('CRONJOB', () => CronJobTask);

AppRegistry.registerComponent(appName, () => App);
