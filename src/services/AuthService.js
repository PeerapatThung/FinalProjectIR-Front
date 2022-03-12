import apiClient from "@/services/AxiosClient.js"
import GStore from '@/store'

export default {
    login(json) {
        return apiClient.post('/login', {
            email: json.email,
            password: json.password
        }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            GStore.currentUser = response.data.user
            console.log(response.data)
            return Promise.resolve(response.data)
        }).catch((error) => {
            return Promise.reject(error)
        })
    },
    register(json) {
        return apiClient.post('/signup', {
            email: json.email,
            name: json.name,
            password: json.password
        })
    },
    logout() {
        apiClient.post('/logout')
        localStorage.removeItem('user')
        GStore.currentUser = null
    }
}