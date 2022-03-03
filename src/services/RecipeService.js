import apiClient from "@/services/AxiosClient.js"

export default {
    getRecipes(page) {
        return apiClient.get('/recipes/' + page)
    },
    getRecipe(id) {
        return apiClient.get('/recipe/' + id)
    },
    searchTitle(json, page) {
        return apiClient.post('/title/' + page, {
            query: json.query
        })
    },
    searchIngredients(json, page) {
        return apiClient.post('/ingre/' + page, {
            query: json.query
        })
    }
}