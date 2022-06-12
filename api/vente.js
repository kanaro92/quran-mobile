import client from './client';

const endPoint = '/ventes/';

const getVenteByCode = (code) => client.get(endPoint+code);
const getVentebyPhoneUID = (uid) => client.get(endPoint+'byPhoneUID/'+uid);

export default {
    getVenteByCode,
    getVentebyPhoneUID,
};
