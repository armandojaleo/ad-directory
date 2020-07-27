import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import Me from './components/Me.vue';
import MyAds from './components/MyAds.vue';
import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';
import Logout from './components/Logout.vue';
import CreateAd from './components/CreateAd.vue';
import DisplayAd from './components/DisplayAd.vue';
import EditAd from './components/EditAd.vue';

const ajax = axios.create({
  baseURL: (process.env.VUE_APP_BASE_URL !== undefined) ? process.env.VUE_APP_BASE_URL : '//localhost:4000/'
})

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('authtoken')) {
    next();
    return;
  }
  router.push({
    name: 'SignIn',
    params: {
      returnTo: to.path,
      query: to.query,
    },
  });
};

const routes = [
  {
    name: 'SignIn',
    path: '/signin',
    component: SignIn,
  },
  {
    name: 'SignUp',
    path: '/signup',
    component: SignUp
  },
  {
    name: 'Me',
    path: '/me',
    component: Me,
    beforeEnter: ifAuthenticated
  },
  {
    name: 'MyAds',
    path: '/me/ads',
    component: MyAds,
    beforeEnter: ifAuthenticated
  },
  {
    name: 'Logout',
    path: '/logout',
    component: Logout,
    beforeEnter: ifAuthenticated
  },
  {
    name: 'DisplayAd',
    path: '/',
    component: DisplayAd
  },
  {
    name: 'CreateAd',
    path: '/new/',
    component: CreateAd,
    beforeEnter: ifAuthenticated
  },
  {
    name: 'EditAd',
    path: '/edit/:id',
    component: EditAd,
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
