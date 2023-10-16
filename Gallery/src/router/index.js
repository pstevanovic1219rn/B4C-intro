import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Single from '@/views/Single.vue';
//import Cart from '@/views/Cart.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Search from "@/views/Search.vue";
import Firma from "@/views/Firma.vue";
import Insert from "@/views/Insert.vue";
import Edit from "@/views/Edit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/firma',
    name: 'Firma',
    component: Firma
  },
  {
    path: '/single/:id',
    name: 'Single',
    component: Single
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/insert',
    name: 'Insert',
    component: Insert
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
