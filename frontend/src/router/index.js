// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue'),
      },
      {
        path: 'registrar',
        name: 'Registrar',
        component: () => import('@/views/RegistrarView.vue'),
      },
      {
        path: 'sorteio/:sorteio',
        name: 'Sorteio',
        component: () => import('@/views/SorteioView.vue'),
      },
      {
        path: 'sorteio/:sorteio/:pessoa/',
        name: 'SorteioPessoa',
        component: () => import('@/views/SorteioPessoaView.vue'),
      },
      {
        path: 'sorteio/:sorteio/realizar/',
        name: 'RealizarSorteio',
        component: () => import('@/views/RealizarSorteioView.vue'),
      },
      {
        path: 'sorteios/:pessoa',
        name: 'SorteiosPessoa',
        component: () => import('@/views/SorteiosPessoaView.vue'),
      },
      {
        path: 'perfil/',
        name: 'Perfil',
        component: () => import('@/views/PerfilView.vue'),
      },
      {
        path: 'sorteio/cadastro',
        name: 'CadastroSorteio',
        component: () => import('@/views/CadastroSorteioView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
