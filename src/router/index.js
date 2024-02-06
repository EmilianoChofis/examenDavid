import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Landing.vue'),
  },
  {
    path:"/main",
    component:()=> import('../components/Layout.vue'),

    children:[
      {
        path:'/inicio',
        name: '/inicio',
        component :()=> import ('../views/Inicio.vue')
      },
      {
        path:'/formulario',
        name: '/formulario',
        component :()=> import ('../views/Formulario.vue')
      },
      {
        path:'/paginacion',
        name: '/paginacion',
        component :()=> import ('../views/Pagination.vue')
      },
      {
        path:'*',
        component :()=> import ('../views/404.vue')
      },


    ]
  }
]

const router = new VueRouter({routes,})
export default router