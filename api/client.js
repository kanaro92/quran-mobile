import { create } from 'apisauce'

const apiClient = create({
    baseURL: 'http://146.190.150.139:8081/api/v1/quran',
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 15000
})

export default apiClient;
