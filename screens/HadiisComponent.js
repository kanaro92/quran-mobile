import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import hadiths from "../hadiths";
import freeHadiths from "../free-hadiths";
import {appService} from "../service/app-service";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faFastForward, faPauseCircle, faPlay} from "@fortawesome/free-solid-svg-icons";
import {faFastBackward} from "@fortawesome/free-solid-svg-icons/faFastBackward";
import SoundPlayer from "react-native-sound-player";
import RNFetchBlob from "rn-fetch-blob";
import * as Progress from 'react-native-progress';
import allSourates from "../sourates";

class HadiisComponent extends Component {
    constructor() {
        super();
        this.state = {
            isPlaying: false,
            isPaused: false,
            isDownloading: false,
            spinner: false,
            isRefresh: false,
            receivedByte: 0,
            progressNumber: 0,
            currentHadiisId: 0,
            hadiths: freeHadiths,
        }
        this.getHadiths();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView>
                        <View style={styles.sommaire_view}>
                            <Text style={styles.sommaire_title}>Firo 40 Hadiis An-Nawawi</Text>
                        </View>
                        <View style={styles.list_view}>
                            <FlatList
                                data={this.state.hadiths}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({item}) => {
                                    return <TouchableOpacity onPress={() => this.onItemSelect(item)}>
                                        <View style={styles.item_view}>

                                            <View style={styles.h_title_width}>
                                                <Text style={styles.title_text}>Hadiis {item.id}</Text>
                                            </View>
                                            <View style={styles.number_width}>
                                                {this.state.spinner && this.state.currentHadiisId === item.id ?
                                                    <View style={styles.spinner_view}>
                                                            <Text><Progress.Bar color={'green'}
                                                                                progress={this.state.progressNumber}
                                                                                width={100}/></Text>
                                                            <Text> {this.state.receivedByte}/{(item.size / 1024).toFixed(2)}Mb</Text>
                                                    </View>
                                                    :
                                                    <Text></Text>
                                                }
                                            </View>

                                            <View style={styles.play_icon}>
                                                {this.state.spinner && this.state.currentHadiisId === item.id ?
                                                    <View>
                                                        <ActivityIndicator size="large" color={'green'} />
                                                    </View> :
                                                    <View>
                                                        {this.state.isRefresh && this.state.currentHadiisId === item.id ?
                                                            <View>
                                                                <ActivityIndicator size="large" color={'green'} />
                                                            </View>
                                                            :
                                                            <View style={styles.playing_icon_view}>
                                                                <View style={styles.backward_icon}>
                                                                    <Text style={styles.backward_seek_second}>10</Text>
                                                                    <FontAwesomeIcon icon={faFastBackward} size={20}
                                                                                     color={"#24561F"}
                                                                                     onPress={() => this.forward(item.id, false)}/>
                                                                </View>
                                                                {this.state.isPlaying && this.state.currentHadiisId === item.id ?
                                                                    <FontAwesomeIcon icon={faPauseCircle} size={20}
                                                                                     color={"#24561F"}
                                                                                     onPress={() => this.pauseAudio()}/> :
                                                                    <FontAwesomeIcon icon={faPlay} size={20}
                                                                                     color={"#24561F"}
                                                                                     onPress={() => this.playAudio(item)}/>
                                                                }
                                                                <View style={styles.forward_icon}>
                                                                    <FontAwesomeIcon icon={faFastForward} size={20}
                                                                                     color={"#24561F"}
                                                                                     onPress={() => this.forward(item.id, true)}/>
                                                                    <Text style={styles.forward_seek_second}>10</Text>
                                                                </View>
                                                            </View>

                                                        }
                                                    </View>
                                                }
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                }}
                                ItemSeparatorComponent={() => (
                                    <View style={styles.separator}/>
                                )}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>

        );
    }

    onItemSelect(item) {
        //appService.setIndexSubject(page_number - 1);
    }

    _onFinishedPlayingSubscription = null

    playAudio(item) {
        this.setState({
            isPlaying: false
        });
        if (this.state.isPaused) {
            SoundPlayer.resume();
            this.setState({
                isPlaying: true
            });
            this.setState({
                isPaused: false
            });
            return;
        }
        this.setState({
            currentHadiisId: item.id
        });
        let fileName = item.audioLink.substring(45, item.audioLink.length - 4);
        alert(fileName)
        let filePath = RNFetchBlob.fs.dirs.DocumentDir + '/' + fileName;
        RNFetchBlob.fs.exists(filePath + '.mp3').then(res => {
            if (res) {
                //comparing files size
                RNFetchBlob.fs.stat(filePath + '.mp3')
                    .then((stats) => {
                        let existingSize = stats.size / 1024;
                        if (existingSize.toFixed(0) === item.size || existingSize.toFixed(0) >= item.size - 4) {
                            this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', () => {
                                this._onFinishedPlayingSubscription.remove();
                                this.setState({
                                    isPlaying: false
                                });
                            });
                            SoundPlayer.playSoundFile(fileName, 'mp3');
                            this.setState({
                                isPlaying: true
                            });
                            this.setState({
                                spinner: false
                            });
                        } else {
                            this.downloadAudio(item.audioLink, item.size);
                        }
                    })
                    .catch((err) => {
                        Alert.alert("Caɗeele", "Waɗi caɗeele !");
                    })
            } else {
                this.downloadAudio(item);
            }
        }).catch(reason => {
            Alert.alert("Caɗeele internet", "Roŋki aawtaade hadiis o, seŋo e internet !");
        })
    }

    pauseAudio = () => {
        SoundPlayer.pause();
        SoundPlayer.getInfo().then(value => {
            console.log(value);
        });
        this.setState({
            isPlaying: false
        });
        this.setState({
            isPaused: true
        });
        this._onFinishedPlayingSubscription.remove();
    }

    stopAudio = () => {
        SoundPlayer.stop();
        this.setState({
            isPlaying: false
        });
        this._onFinishedPlayingSubscription.remove();
    }

    forward = (itemId, isFast: boolean) => {
        if (this.state.isPaused || this.state.currentHadiisId !== itemId) {
            return;
        }
        SoundPlayer.getInfo().then(value => {
            if (isFast) {
                SoundPlayer.seek(value.currentTime + 10);
            } else {
                SoundPlayer.seek(value.currentTime - 10);
            }
        });
    }

    downloadAudio(item) {
        this.setState({
            isDownloading: true,
            spinner: true,
            currentHadiisId: item.id
        });
        let fileName = item.audioLink.substring(45, item.audioLink.length - 4);
        alert(fileName)
        const {fs: {dirs}} = RNFetchBlob
        const PATH_TO_LIST = dirs.DocumentDir
        const dest = `${PATH_TO_LIST}/${fileName}.mp3`
        this.downtask = RNFetchBlob.config({
            IOSBackgroundTask: true, // required for both upload
            IOSDownloadTask: true, // Use instead of IOSDownloadTask if uploading
            path: dest,
            fileCache: true
        })
            .fetch('GET', item.audioLink, {})
            .progress((receivedStr, totalStr) => {
                // Do any things
                this.setState({
                    receivedByte: (receivedStr / (1024 * 1024)).toFixed(2)
                });
                this.setState({
                    progressNumber: this.state.receivedByte / (item.size / 1024).toFixed(2)
                });
            }).then(value => {
                this.setState({
                    isDownloading: false
                });
                this.setState({
                    spinner: false
                });
                this.setState({
                    isRefresh: true
                });
                this.sleep(1000).then(() => {
                    this.setState({
                        isRefresh: false
                    });
                    this.playAudio(item);
                });
            })
        this.downtask.catch(async err => {
            // Check error
            this.setState({
                spinner: false
            });
            this.setState({
                isDownloading: false
            });
            Alert.alert("Caɗeele internet", "Roŋki aawtaade hadiis o, seŋo e internet !");
        })
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    componentWillUnmount() {
        SoundPlayer.unmount();
    }

    getHadiths() {
        appService.getData('quranCode').then(value => {
            console.log("quranCode: " + value);
            if (value > 0) {
                this.setState({
                    hadiths: hadiths
                });
            }
        });
    }
}

export default HadiisComponent;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5
    },
    list_view: {
        paddingBottom: 15
    },
    item_view: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'stretch',
        paddingTop: 8,
        paddingBottom: 8,
    },
    sommaire_view: {
        alignItems: "center",
        padding: 4,
    },
    sommaire_title: {
        fontSize: 18,
        fontFamily: "sans-serif-medium",
        fontWeight: 'normal',
        color: '#000'
    },
    play_icon: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    spinner_view: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'stretch'
    },
    h_title_width: {
        width: 80,
    },
    number_width: {
        width: 110,
    },
    title_text: {
        fontSize: 15,
        color: '#000'
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#f8F4F4"
    },
    playing_icon_view: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        alignContent: 'stretch'
    },
    backward_icon: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 20
    },
    forward_icon: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 20,
    },
    forward_seek_second: {
        fontSize: 16,
        paddingLeft: 2
    },
    backward_seek_second: {
        fontSize: 16,
        paddingRight: 2
    }
})
