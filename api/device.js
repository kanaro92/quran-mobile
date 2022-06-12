import client from './client';

const endPoint = '/devices/';

const isPhoneUIDValid = (uid) => client.get(endPoint+uid)

export default {
    isPhoneUIDValid,
};
