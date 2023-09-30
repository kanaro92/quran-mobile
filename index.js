/**
 * @format
 */

import {AppRegistry, Alert, Linking, Platform } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
/*import CronJob from "react-native-cron-job";*/
import freeSourates from "./free-sourates";

import { version } from './package.json';
import apiClient from "./api/client";
const checkAppVersion = async () => {
    // Fetch the latest version
    apiClient.get('/mobile-app-version').then(value => {
        if(value && value.ok) {
            if (value.data && value.data.androidAppVersion !== version) {
                // Prompt the user to update
                Alert.alert(
                    'Wonko ɓeydi e jaaɓngal hee!',
                    'Yah to Play Store ngam keɓa ko ɓeydi heen ko.',
                    [
                        {
                            text: 'Mi jaɓi',
                            onPress: () => {
                                // Open the app's store page for manual update
                                const storeUrl = `market://details?id=${Platform.OS === 'android' ? 'mr.quran_pulaar' : 'your.package.name.ios'}`;
                                Linking.openURL(storeUrl);
                            },
                        },
                    ],
                    { cancelable: false }
                );
            }
        }
    });
    /*if (response.data) {
        console.log("version: "+response.data);
    } else {
        console.log("error ffffff");
    }*/
    const latestVersion = '';

    //Alert.alert('latestVersion: '+latestVersion)

    // Compare the current version with the latest version

};

checkAppVersion();

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
