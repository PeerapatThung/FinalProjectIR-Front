import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import Search from '@/views/Search.vue'
import NetWorkError from '@/views/NetworkError.vue';
import RecipeList from '@/views/RecipeList.vue'
import RecipeDetails from '@/views/Details.vue';
import RecipeService from '../services/RecipeService';
import GStore from '@/store'
import NProgress from 'nprogress'
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
                    GStore.recipe = response.data // <--- Store the event
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
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/network-error',
        name: 'NetworkError',
        component: NetWorkError
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