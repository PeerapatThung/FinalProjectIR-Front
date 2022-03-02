import apiClient from "@/services/AxiosClient.js"

export default {
    search(json) {
        return apiClient.post('/search', {
            query: json.query,
            score: json.score
        })
    }
}