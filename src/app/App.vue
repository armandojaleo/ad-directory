<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link :to="{ name: 'DisplayAd' }" class="navbar-brand">
        Ad Directory
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li v-if="ifAuthenticated" class="nav-item" data-toggle="collapse" data-target="#navbarNav">
            <router-link :to="{ name: 'CreateAd' }" class="nav-link">
              New Ad
            </router-link>
          </li>
          <li v-if="ifAuthenticated" class="nav-item" data-toggle="collapse" data-target="#navbarNav">
            <router-link :to="{ name: 'MyAds' }" class="nav-link">
              My Ads
            </router-link>
          </li>
        </ul>
        <ul v-if="ifAuthenticated" class="nav navbar-nav navbar-right">
          <li class="nav-item" data-toggle="collapse" data-target="#navbarNav">
            <router-link :to="{ name: 'Me' }" class="nav-link">
              Me
            </router-link>
          </li>
          <li class="nav-item" data-toggle="collapse" data-target="#navbarNav">
            <router-link :to="{ name: 'Logout' }" class="nav-link">
              Logout
            </router-link>
          </li>
        </ul>
        <ul v-else class="nav navbar-nav navbar-right">
          <li class="nav-item" data-toggle="collapse" data-target="#navbarNav">
            <router-link :to="{ name: 'SignIn' }" class="nav-link">
              Login
            </router-link>
          </li>
          <li class="nav-item" data-toggle="collapse" data-target="#navbarNav">
            <router-link :to="{ name: 'SignUp' }" class="nav-link">
              Signup
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- CONTENT -->
    <div class="container">
      <div>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ifAuthenticated: localStorage.getItem('authtoken')? true: false
    };
  },
}
</script>