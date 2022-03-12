import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router'
import animejs from '../views/animejs/index.vue'
import FontAwesome from '../views/FontAwesome/index.vue'
import itemSetting from '../views/itemSetting/index.vue'
import tailwindcss from '../views/itemSetting/tailwindcss/index.vue'
const routerHistory = createWebHashHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由
export const routes = [{
    path: '/animejs',
    component: animejs,
    name: "animejs",
    meta: {
        title: 'animejs'
    },
    children: []
}, {
    path: '/FontAwesome',
    component: FontAwesome,
    name: "FontAwesome",
    meta: {
        title: 'FontAwesome'
    },
    children: []
}, {
    path: '/itemSetting',
    component: itemSetting,
    meta: {
        title: 'itemSetting'
    },
    name: 'itemSetting',
    children: [{
        path: 'tailwindcss',
        component: tailwindcss,
        name: 'itemSettingTailwindcss',
        meta: {
            title: 'itemSettingTailwindcss'
        }
    }]
}]
export const router = createRouter({
    history: routerHistory,
    routes
})