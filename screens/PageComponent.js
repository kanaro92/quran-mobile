import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import allSourates from "../sourates";
import {appService} from '../service/app-service';
import freeSourates from "../free-sourates";

class PageComponent extends Component {
    constructor() {
        super();
        this.state = {
            sourates: freeSourates
        }
        appService.getData('quranCode').then(value => {
            console.log("quranCode: " + value);
            try {
                if (value > 0) {
                    this.setState({
                        sourates: allSourates
                    });
                }
            } catch (e) {
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView>
                        <View style={styles.sommaire_view}>
                            <Text style={styles.sommaire_title}>Cimooje</Text>
                        </View>
                        <View style={styles.list_view}>
                            <FlatList
                                data={this.state.sourates}
                                keyExtractor={item => item.page_number.toString()}
                                renderItem={({item, index}) => {
                                    return <TouchableOpacity onPress={() => this.onItemSelect(index)}>
                                        <View style={styles.item_view}>

                                            <View style={styles.pr_title_width}>
                                                <Text style={styles.pr_title_text}>{item.pr_title}</Text>
                                            </View>
                                            <View style={styles.number_width}>
                                                <Text>Hello {item.page_number}</Text>
                                            </View>
                                            <View style={styles.ar_title_width}>
                                                <Text style={styles.ar_title_text}>{item.ar_title}</Text>
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

    onItemSelect(index) {
        console.log("index "+index)
        // appService.setIndexSubject(index);
    }
}

export default PageComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5
    },
    list_view: {
        paddingBottom: 15,
    },
    item_view: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'stretch',
        paddingTop: 4,
        paddingBottom: 4,
    },
    sommaire_view: {
        alignItems: "center",
        padding: 4,
    },
    sommaire_title: {
        fontSize: 18,
        fontFamily: "sans-serif-medium",
        fontWeight: 'normal',
    },
    pr_title_width: {
        width: 150,
    },
    ar_title_width: {
        width: 80,
    },
    number_width: {
        width: 100,
    },
    pr_title_text: {
        fontSize: 13,
        color: '#000'
    },
    ar_title_text: {
        fontSize: 16,
        color: '#000'
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#f8F4F4"
    },
})
