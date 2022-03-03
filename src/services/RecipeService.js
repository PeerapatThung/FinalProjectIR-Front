import apiClient from "@/services/AxiosClient.js"

export default {
    getRecipes(page) {
        return apiClient.get('/recipes/' + page)
    },
    getRecipe(id) {
        return apiClient.get('/recipe/' + id)
    }
}