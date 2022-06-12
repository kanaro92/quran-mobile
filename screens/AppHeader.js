import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBook, faBookmark, faBookOpen, faBookReader, faInfoCircle, faTools} from '@fortawesome/free-solid-svg-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import InfoComponent from './InfoComponent';
import BookMarkComponent from './BookMarkComponent';
import PageComponent from './PageComponent';
import ToolComponent from './ToolComponent';
import {appService} from "../service/app-service";
import HadiisComponent from "./HadiisComponent";

const {width, height} = Dimensions.get('screen');

class AppHeader extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.header}>
                <FontAwesomeIcon icon={faInfoCircle} size={26} color={"#24561F"}
                                 onPress={() => this.infoRBSheet.open()}
                />
                <FontAwesomeIcon icon={faBookmark} size={22} color={"#24561F"}
                                 onPress={() => this.bookMarkRBSheet.open()}
                />
                <FontAwesomeIcon icon={faBookReader} size={22} color={"#24561F"}
                                 onPress={() => this.pageRBSheet.open()}
                />
                <FontAwesomeIcon icon={faBook} size={22} color={"#24561F"}
                                 onPress={() => this.hadiisRBSheet.open()}
                />
                <FontAwesomeIcon icon={faTools} size={22} color={"#24561F"}
                                 onPress={() => this.toolsRBSheet.open()}
                />

                <RBSheet
                    ref={ref => {
                        this.infoRBSheet = ref;
                    }}
                    height={height - 130}
                    openDuration={250}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                >
                    <InfoComponent/>
                </RBSheet>

                <RBSheet
                    ref={ref => {
                        this.bookMarkRBSheet = ref;
                    }}
                    height={height - 130}
                    openDuration={250}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                >
                    <BookMarkComponent/>
                </RBSheet>

                <RBSheet
                    ref={ref => {
                        this.pageRBSheet = ref;
                    }}
                    height={height - 130}
                    openDuration={250}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                >
                    <PageComponent/>
                </RBSheet>

                <RBSheet
                    ref={ref => {
                        this.hadiisRBSheet = ref;
                    }}
                    height={height - 130}
                    openDuration={250}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                >
                    <HadiisComponent/>
                </RBSheet>

                <RBSheet
                    ref={ref => {
                        this.toolsRBSheet = ref;
                    }}
                    height={height - 130}
                    openDuration={250}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                >
                    <ToolComponent/>
                </RBSheet>
            </View>

        );
    }

    componentDidMount() {
        // subscribe to home component messages
        this.subscription = appService.getIndexSubject().subscribe(index => {
            if (index) {
                this.pageRBSheet.close();
                this.bookMarkRBSheet.close();
            }
        });
    }

    componentWillUnmount() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}

export default AppHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 30,
        paddingTop: 5,
        marginBottom: 5,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
