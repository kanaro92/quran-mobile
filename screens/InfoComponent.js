import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

class InfoComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View>
                <ScrollView style={styles.container}>
                    <Text style={styles.title_text}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</Text>
                    <Text/>
                    <Text style={styles.text}>
                        يستند هذا التطبيق على ترجمة القرآن الكريم للسيد <Text style={styles.bold_text}>أبو سي</Text> بلغة بولار فولفولد.
                        التطبيق مقدم من <Text style={styles.bold_text}>همات موسى كان</Text>.

                    </Text>
                    <Text/>
                    <Text/>
                    <Text style={styles.title_text}>E innde Alla Jurumdeero Jurmotooɗo</Text>
                    <Text/>
                    <Text style={styles.text}>
                        Ngal jaaɓngal tuugnii ko e deftere Quraan teddunde nde ceerno <Text style={styles.bold_text}>Abuu
                        Sih</Text> firi he ɗemngal Pulaar Fulfulde.
                        Baañnjitiiɗo deftere nde e mbaaydi jaaɓngal ko <Text style={styles.bold_text}>Hamath Kan</Text>.
                    </Text>
                    <Text/>
                    <Text style={styles.title_text}>Jokkondir / اتصل</Text>
                    <Text/>
                    <Text style={styles.contacts}>Abuu Sih - أبو سي</Text>
                    <Text style={styles.contacts}>atumansy6@gmail.com</Text>
                    <Text style={styles.contacts}>+221 77 3091782</Text>
                    <Text/>
                    <Text style={styles.contacts}>Hamath Kan - كان همات </Text>
                    <Text style={styles.contacts}>kawkumputer@gmail.com</Text>
                    <Text style={styles.contacts}>+212646179679</Text>
                </ScrollView>
            </View>

        );
    }
}

export default InfoComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000'
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        padding: 4,
        color: '#000'
    },
    bold_text: {
        fontWeight: 'bold',
    },
    contacts: {
        textAlign: 'center',
        fontSize: 14,
    },
})
