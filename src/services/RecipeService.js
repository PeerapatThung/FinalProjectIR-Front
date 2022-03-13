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
            query: json.search
        })
    },
    searchIngredients(json, page) {
        return apiClient.post('/ingre/' + page, {
            query: json.search
        })
    },
    setFav(user, recipe) {
        return apiClient.post('/setFav', {
            userid: user,
            recipeid: recipe
        })
    },
    getFav(user) {
        return apiClient.get('/fav/' + user)
    },
    removeFav(user, recipe) {
        return apiClient.post('/removeFav', {
            userid: user,
            recipeid: recipe
        })
    },
    seeAllFav(page, user) {
        return apiClient.post('/showfav/' + page, {
            userid: user
        })
    },
    searchFav(json, user) {
        return apiClient.post('/searchfav/' + user, {
            query: json.search
        })
    }
}