import client from './client';

const endPoint = '/codes/';

const getCode = (code) => client.get(endPoint+code)

export default {
    getCode,
};
