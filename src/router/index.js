import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import SearchTitle from '@/views/SearchTitle.vue'
import NetWorkError from '@/views/NetworkError.vue';
import RecipeList from '@/views/RecipeList.vue'
import RecipeDetails from '@/views/Details.vue';
import SearchIngredient from '@/views/SearchIngredients.vue'
import RecipeService from '../services/RecipeService';
import GStore from '@/store'
import NProgress from 'nprogress'
import welcome from "@/templates/base.vue"
const routes = [{
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/',
        name: 'RecipeList',
        component: RecipeList,
        props: (route) => ({ page: parseInt(route.query.page) || 1 })
    },
    {
        path: '/recipe/:id',
        name: 'RecipeDetails',
        component: RecipeDetails,
        beforeEnter: (to) => {
            return RecipeService.getRecipe(to.params.id) // Return and params.id
                .then((response) => {
                    // Still need to set the data here
                    GStore.recipe = response.data.result // <--- Store the event
                    GStore.image = "@/assets/image/" + response.data.result.image
                })
                .catch((error) => {
                    if (error.response && error.response.status == 404) {
                        return {
                            // <--- Return
                            name: '404Resource',
                            params: { resource: 'recipe' }
                        }
                    } else {
                        return { name: 'NetworkError' } // <--- Return
                    }
                })
        },
    },
    {
        path: '/search/ingredient',
        name: 'SearchIngredient',
        component: SearchIngredient,
        props: (route) => ({ page: parseInt(route.query.page) || 1 })
    },
    {
        path: '/search/title',
        name: 'SearchTitle',
        component: SearchTitle,
        props: (route) => ({ page: parseInt(route.query.page) || 1 })
    },
    {
        path: '/network-error',
        name: 'NetworkError',
        component: NetWorkError
    },
    {
        path: '/login',
        name: 'login',
        component: welcome
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})
router.beforeEach(() => {
    NProgress.start()
})

router.afterEach(() => {
    NProgress.done()
})
export default router