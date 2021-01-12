import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';
import Me from './components/Me.vue';
import MyCompanies from './components/MyCompanies.vue';
import CreateCompany from './components/CreateCompany.vue';
import EditCompany from './components/EditCompany.vue';
import DisplayAds from './components/DisplayAds.vue';
import MyAds from './components/MyAds.vue';
import CreateAd from './components/CreateAd.vue';
import EditAd from './components/EditAd.vue';
import Logout from './components/Logout.vue';

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
    name: 'MyCompanies',
    path: '/me/companies',
    component: MyCompanies,
    beforeEnter: ifAuthenticated
  },
  {
    name: 'CreateCompany',
    path: '/me/companies/new',
    component: CreateCompany,
    beforeEnter: ifAuthenticated
  },
  {
    name: 'EditCompany',
    path: '/me/companies/edit/:id',
    component: EditCompany,
    beforeEnter: ifAuthenticated
  },
  {
    name: 'DisplayAds',
    path: '/',
    component: DisplayAds
  },
  {
    name: 'MyAds',
    path: '/me/ads',
    component: MyAds,
    beforeEnter: ifAuthenticated
  },
  {
    name: 'CreateAd',
    path: '/me/ads/new/',
    component: CreateAd,
    beforeEnter: ifAuthenticated
  },
  {
    name: 'EditAd',
    path: '/me/ads/edit/:id',
    component: EditAd,
    beforeEnter: ifAuthenticated
  },
  {
    name: 'Logout',
    path: '/logout',
    component: Logout,
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
