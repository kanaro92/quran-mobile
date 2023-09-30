import client from './client';

const endPoint = '/mobile-app-version/';

const getVersion = () => client.get(endPoint)

export default {
    getVersion,
};
