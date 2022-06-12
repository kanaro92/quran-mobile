import { create } from 'apisauce'

const apiClient = create({
    baseURL: 'http://159.223.214.233:8080/api/v1/quran',
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 15000
})

export default apiClient;
