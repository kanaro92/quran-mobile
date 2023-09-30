import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPhoneAlt} from "@fortawesome/free-solid-svg-icons";

class ToolComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title_text}>So a yiɗi soodde jaaɓngal ngal jokkondir e</Text>
                <Text/>
                <Text style={styles.name_text}>Abuu Sih - Senegal</Text>
                <Text style={styles.text}>
                    <View style={styles.icons}>
                        <Image source={require('../images/orange-money.png')} style={styles.image}/>
                        <Image source={require('../images/wave.png')} style={styles.image}/>
                        <Text style={styles.phone_text}> </Text>
                    </View>
                    <View style={styles.icons}>
                        <FontAwesomeIcon icon={faPhoneAlt} size={26} color={"#24561F"}/>
                        <Text style={styles.phone_text}>00 221 77 504 34 68</Text>
                    </View>
                    <View style={styles.icons}>
                        <FontAwesomeIcon icon={faPhoneAlt} size={26} color={"#24561F"}/>
                        <Text style={styles.phone_text}>00 221 77 309 17 82</Text>
                        <Image source={require('../images/whatsapp.jpg')}/>
                    </View>
                </Text>

                <Text/>
                <Text/>
                <Text style={styles.name_text}>Saiid Nuuru Jah - Muritani</Text>
                <Text style={styles.text}>
                    <View style={styles.icons}>
                        <Image source={require('../images/bankily.png')} />
                        <Image source={require('../images/ghaza-telecom.jpg')} />
                    </View>
                    <View style={styles.icons}>
                        <FontAwesomeIcon icon={faPhoneAlt} size={26} color={"#24561F"}/>
                        <Text style={styles.phone_text}>00 222 47 70 53 01</Text>
                        <Image source={require('../images/whatsapp.jpg')} />
                    </View>
                </Text>

                <Text/>
                <Text/>
                <Text style={styles.name_text}>Hamath Joop - Muritani</Text>
                <Text style={styles.text}>
                    <View style={styles.icons}>
                        <Image source={require('../images/bankily.png')} />
                        <Image source={require('../images/ghaza-telecom.jpg')} />
                    </View>
                    <View style={styles.icons}>
                        <FontAwesomeIcon icon={faPhoneAlt} size={26} color={"#24561F"}/>
                        <Text style={styles.phone_text}>00 222 46 74 91 08</Text>
                        <Image source={require('../images/whatsapp.jpg')} />
                    </View>
                </Text>
            </ScrollView>

        );
    }
}

export default ToolComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    icons: {
        paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    title_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000'
    },
    name_text: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingLeft: 20,
        color: '#000'
    },
    phone_text: {
        fontSize: 22,
        paddingLeft: 20,
        color: '#000'
    },
    text: {
        fontSize: 16,
        paddingLeft: 20,
        color: '#000'
    },
    bold_text: {
        fontWeight: 'bold',
    }
})

