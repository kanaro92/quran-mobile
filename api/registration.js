import client from './client';

const endPoint = '/registration';

const registerPhone = (registrationInfo) => client.post(endPoint, registrationInfo)
const registerPhoneAfterUninstall = (uid) => client.get(endPoint+"/"+uid)

export default {
    registerPhone,
    registerPhoneAfterUninstall
};
