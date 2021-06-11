import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main.vue'
import Dashboard from '../pages/dashboard'
import PXE from '../pages/PXE'
import Tasks from '../pages/tasks'
import DistPoint from '../pages/distPoint'
import Settings from '../pages/settings'
import Dictionary from '../pages/Dictionary'


Vue.use(VueRouter)



const routes = [
  {path: '/main', name: 'main', component: Main, children:[
    {path: '/main/dashboard', name: 'dashboard', component: Dashboard },
    {path: '/main/pxe', name: 'pxe', component: PXE },
    {path: '/main/tasks', name: 'tasks', component: Tasks },
    {path: '/main/distPoint', name: 'distPoint', component: DistPoint },
    {path: '/main/settings', name: 'settings', component: Settings }
  ] },
  {path: '/dictionary', name: 'Dictionary', component: Dictionary }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
