import React, {Component} from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import allSourates from './sourates';
import freeSourates from './free-sourates';
import AppHeader from './screens/AppHeader';
import Content from './screens/ContentComponent';
import {appService} from './service/app-service';
import prompt from "react-native-prompt-android";
import AsyncStorage from "@react-native-community/async-storage";
import registrationApi from "./api/registration";
import {Bars} from 'react-native-loader';
import {TIMEOUT_ERROR} from "apisauce";
import DeviceInfo from "react-native-device-info/src/index";
import {DeviceInfoModel} from "./model/DeviceInfoModel";
import {RegistrationInfo} from "./model/RegistrationInfo";
import PushNotification from "react-native-push-notification";
import CronJob from "react-native-cron-job";
import vente from "./api/vente";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowCircleLeft, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import SoundPlayer from "react-native-sound-player";

const {width, height} = Dimensions.get('screen');

class QuranPulaarApp extends Component {
    isRefresh: boolean = false;

    constructor() {
        super();
        this.state = {
            sourates: freeSourates,
            spinner: true,
            isModalVisible: false
        }
        /*
        PushNotification.localNotificationSchedule({
            message: "My Notification Message", // (required)
            date: new Date(Date.now() + 2 * 1000), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        });*/
        //this.createChannels();
        this.checkUID().then(value => this.register());
        //this.register();
        //this.storeData('quranCode', null);
        //this.registerAfterUninstall();
        //this.handleNotification();
        CronJob.startCronJob(19, 15); // starts cronjob everyday at 10:12 PM
        //this.playIntro();
    }

    createChannels = () => {
        PushNotification.createChannel({
            channelId: "Quran-Pulaar",
            channelName: "Quran Pulaar",
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[StyleSheet.absoluteFillObject]}>
                    <Image
                        source={require('./images/background.png')}
                        style={styles.image}
                        blurRadius={50}
                    />
                </View>
                {this.state.spinner ?
                    <ImageBackground source={require('./images/background.png')} style={styles.backGroundImage}>
                        <View style={styles.title_view}>
                            <Text style={styles.title_text}> Quran Pulaar - Abuu SIH</Text>
                        </View>
                        <View style={styles.spinner_view}>
                            <Bars size={40} color="#60b17d"/>
                        </View>
                    </ImageBackground>
                    :
                    <View>
                        <AppHeader/>
                        <FlatList
                            data={this.state.sourates}
                            ref={(ref) => {
                                this.flatListRef = ref;
                            }}
                            initialNumToRender={3}
                            keyExtractor={item => item.surat_number.toString()}
                            horizontal
                            pagingEnabled
                            refreshing={this.isRefresh}
                            inverted={-1}
                            renderItem={({item, index}) => {
                                return <View>
                                    <Content item={item} index={index}/>
                                </View>
                            }}
                        />
                    </View>
                }
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isModalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <ScrollView>
                                    <Text style={styles.modalTitleText}>So a yiɗi soodde jaaɓngal ngal jokkondir
                                        e</Text>
                                    <Text/>
                                    <Text style={styles.name_text}>Abuu Sih - Senegal</Text>
                                    <Text style={styles.text}>
                                        <View style={styles.icons}>
                                            <Image source={require('./images/orange-money.png')} style={styles.image}/>
                                            <Image source={require('./images/wave.png')} style={styles.image}/>
                                        </View>
                                        <View style={styles.icons}>
                                            <FontAwesomeIcon icon={faPhoneAlt} size={26} color={"#24561F"}/>
                                            <Text style={styles.phone_text}>00 221 77 504 34 68</Text>
                                        </View>
                                        <View style={styles.icons}>
                                            <FontAwesomeIcon icon={faPhoneAlt} size={26} color={"#24561F"}/>
                                            <Text style={styles.phone_text}>00 221 77 309 17 82</Text>
                                            <Image source={require('./images/whatsapp.jpg')}/>
                                        </View>
                                    </Text>

                                    <Text/>
                                    <Text/>
                                    <Text style={styles.name_text}>Hamath Kan - Muritani</Text>
                                    <Text style={styles.text}>
                                        <View style={styles.icons}>
                                            <Image source={require('./images/bankily.png')}/>
                                            <Image source={require('./images/ghaza-telecom.jpg')}/>
                                        </View>
                                        <View style={styles.icons}>
                                            <FontAwesomeIcon icon={faPhoneAlt} size={26} color={"#24561F"}/>
                                            <Text style={styles.phone_text}>00 222 31 59 12 76</Text>
                                            <Image source={require('./images/whatsapp.jpg')}/>
                                        </View>
                                    </Text>

                                    <Text/>
                                    <Text/>
                                    <Text style={styles.name_text}>Hamath Joop - Muritani</Text>
                                    <Text style={styles.text}>
                                        <View style={styles.icons}>
                                            <Image source={require('./images/bankily.png')} />
                                            <Image source={require('./images/ghaza-telecom.jpg')} />
                                        </View>
                                        <View style={styles.icons}>
                                            <FontAwesomeIcon icon={faPhoneAlt} size={26} color={"#24561F"}/>
                                            <Text style={styles.phone_text}>00 222 46 74 91 08</Text>
                                            <Image source={require('./images/whatsapp.jpg')} />
                                        </View>
                                    </Text>
                                </ScrollView>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.closeModal()}
                                >
                                    <FontAwesomeIcon icon={faArrowCircleLeft} size={28} color={"#24561F"}/>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        );
    }

    scrollToIndex = (index: number) => {
        this.flatListRef.scrollToIndex({animated: true, index: index});
    }

    handleNotification() {
        console.log("Notification")
        let randomSourat = freeSourates[Math.floor(Math.random() * freeSourates.length)];

        /*
        PushNotification.localNotification({
            channelId: "Quran-Pulaar",
            title: randomSourat.pr_title+" - "+randomSourat.ar_title,
            message: randomSourat.pr_title,
            playSound: true,
            soundName: "ikhlas"
        });*/

        PushNotification.localNotificationSchedule({
            channelId: "Quran-Pulaar",
            title: randomSourat.pr_title + " - " + randomSourat.ar_title,
            message: randomSourat.ayats_list.ayats[1].ar_ayat + "\n" + randomSourat.ayats_list.ayats[1].pr_ayat,
            date: new Date(Date.now() + 10 * 1000),
            allowWhileIdle: false,
            playSound: true,
            soundName: "ikhlas",
            vibrate: true,
            repeatType: 'time',
            repeatTime: 3600 * 1000 // each hour
        });
    }

    componentDidMount() {
        // subscribe to home component messages
        this.subscription = appService.getIndexSubject().subscribe(index => {
            console.log("index: " + index)
            if (index) {
                this.scrollToIndex(index);
            }
        });
    }

    componentWillUnmount() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
        SoundPlayer.unmount();
    }

    register() {
        appService.getData('quranCode').then(value => {
            console.log("quranCode: " + value);
            try {
                if (value > 0) {
                    this.setState({
                        sourates: allSourates
                    });
                    this.setState({
                        spinner: false
                    });
                } else {
                    this.askForCode();
                }
            } catch (e) {
                this.askForCode();
            }
        });
    }

    askForCode() {
        prompt(
            'Tongoode coggu jaaɓngal',
            'So tawi ko a cooɗɗo, naatnu tongoode nde',
            [
                {text: 'OK', onPress: value => this.chekCodeValidity(value)},
            ],
            {
                cancelable: false,
                placeholder: 'code',
                type: "numeric"
            }
        )
    }

    async chekCodeValidity(code) {
        let deviceInfoModel = this.getDeviceInfoModel();
        let registrationInfo: RegistrationInfo = new RegistrationInfo(Number(code), deviceInfoModel);
        console.log("inf: " + registrationInfo.code + "dev: " + registrationInfo.deviceInfoModel.uniqueId)

        const response = await registrationApi.registerPhone(registrationInfo);
        if (response.ok) {
            if (response.data && Number(code) === response.data.code.code) {
                this.registrationSuccess(response);
            } else {
                this.registrationFailed()
            }
        } else {
            this.internetIssue(response);
        }
    }

    setFreeSourates() {
        this.setState({
            sourates: freeSourates
        });
    }

    getDeviceInfoModel() {
        let deviceInfoModel: DeviceInfoModel = {}
        DeviceInfo.getDeviceName().then((value) => {
            deviceInfoModel.deviceName = value;
        });
        DeviceInfo.getBaseOs().then((value) => {
            deviceInfoModel.baseOs = value;
        });
        DeviceInfo.getFirstInstallTime().then((value) => {
            deviceInfoModel.firstInstallTime = value;
        });
        DeviceInfo.getManufacturer().then((value) => {
            deviceInfoModel.manufacturer = value;
        });
        deviceInfoModel.deviceModel = DeviceInfo.getModel();
        deviceInfoModel.uniqueId = DeviceInfo.getUniqueId();
        console.log("device: " + deviceInfoModel.uniqueId)
        return deviceInfoModel;
    }

    /*
    getDeviceInfoModel() {
        let deviceInfoModel: DeviceInfoModel = {}
        deviceInfoModel.deviceModel=DeviceInfo.getModel();
        deviceInfoModel.uniqueId=DeviceInfo.getUniqueId();
        DeviceInfo.getDeviceName().then((value) => {
            deviceInfoModel.deviceName = value;
            DeviceInfo.getBaseOs().then((value) => {
                deviceInfoModel.baseOs = value;
                DeviceInfo.getFirstInstallTime().then((value) => {
                    deviceInfoModel.firstInstallTime = value;
                    DeviceInfo.getManufacturer().then((value) => {
                        deviceInfoModel.manufacturer = value;
                        console.log("lasttttt");
                        return deviceInfoModel;
                    })
                })
            })
        });
    }
     */
    async checkUID() {
        const response = await vente.getVentebyPhoneUID(DeviceInfo.getUniqueId());
        if (response.ok) {
            if (response.data) {
                console.log("uid is valid");
                await appService.storeData('quranCode', response.data.code.code);
            } else {
                console.log("uid is not valid, revoke code");
                await appService.storeData('quranCode', null);
            }
        }
    }

    async registerAfterUninstall() {
        console.log("Register After Uninstall");
        const response = await registrationApi.registerPhoneAfterUninstall(DeviceInfo.getUniqueId());
        if (response.ok) {
            if (response.data) {
                this.registrationSuccess(response);
            } else {
                this.register();
            }
        } else {
            this.internetIssue(response);
        }
    }

    registrationSuccess(response) {
        console.log('code: ' + response.data.code.code);
        console.log('data: ' + response.data);
        console.log('duration: ' + response.duration);
        console.log('status: ' + response.status);
        this.setState({
            sourates: allSourates
        });
        appService.storeData('quranCode', response.data.code.code);
        this.setState({
            spinner: false
        });
    }

    registrationFailed() {
        /*
        Alert.alert("Caɗeele", "Ngam keɓa tongoode, jokkondir e:\n"
            + "Abuu Sih: +221 77 3091782 - Senegaal\n"
            + "Hamath Kan: +222 48682865 - Muritani\n"
            + "Amadu Bah: +1 7753138425 Amerik");

         */
        this.setFreeSourates();
        this.setState({
            spinner: false
        });
        this.setState({
            isModalVisible: true
        });
    }

    internetIssue(response) {
        if (response.status === 400) {
            this.setFreeSourates();
        }
        if (response.problem === TIMEOUT_ERROR) {
            Alert.alert("Caɗeele internet", "Aɗa jogi caɗeele internet, seŋo!");
            this.setFreeSourates();
        }
        this.setState({
            spinner: false
        });
        console.log('Network error');
        console.log('problem: ' + response.problem);
        console.log('originalErr: ' + response.originalError);
        console.log('duration: ' + response.duration);
        console.log('status: ' + response.status);
    }

    getFirstAyat(randomSourat) {
        //let ayats =
        randomSourat.ayats_list.map(ayat => {
            return ayat.number === 1
        });
    }

    closeModal() {
        this.setState({
            isModalVisible: false
        })
    }

    _onFinishedPlayingSubscription = null;

    playIntro() {
        this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', () => {
            this._onFinishedPlayingSubscription.remove();
        });
        try {
            // play the file tone.mp3
            SoundPlayer.playSoundFile('quran-intro.p', 'mp3')
            // or play from url
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title_view: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignContent: 'stretch',
        paddingTop: height / 3,
    },
    title_text: {
        fontFamily: 'sans-serif-condensed',
        fontWeight: 'bold',
        fontSize: 25,
    },
    spinner_view: {
        flexDirection: "row",
        justifyContent: "center",
    },
    backGroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        marginBottom: 22,
        marginLeft: 10,
        marginRight: 10,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        paddingTop: 22,
        shadowRadius: 4,
        elevation: 2,
        marginTop: 35,
        marginBottom: 30,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#5c80e9",
    },
    buttonClose: {
        backgroundColor: "#e3263d",
        marginBottom: 22,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center"
    },
    icons: {
        paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    modalTitleText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    name_text: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingLeft: 20
    },
    phone_text: {
        fontSize: 22,
        paddingLeft: 20
    },
    text: {
        fontSize: 16,
        paddingLeft: 20
    },
    bold_text: {
        fontWeight: 'bold',
    }
});

export default QuranPulaarApp;
