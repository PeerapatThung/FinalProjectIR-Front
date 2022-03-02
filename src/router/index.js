import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import Search from '@/views/Search.vue'
import NetWorkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'
const routes = [{
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/',
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