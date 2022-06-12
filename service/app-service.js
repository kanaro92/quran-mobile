import { Subject } from 'rxjs';
import AsyncStorage from "@react-native-community/async-storage";
const indexSubject = new Subject();

export const appService = {
    getIndexSubject: () => indexSubject.asObservable(),
    setIndexSubject(index: any){
        indexSubject.next(index)
    },

    async storeData(key, value) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log('Error while saving data: ' + e);
        }
    },

    async getData(key) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (e) {
            console.log('Error while getting data: ' + e);
        }
    }
};

