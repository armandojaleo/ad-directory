<template lang="html">
  <div>
    <div class="row p-4">
      <div class="col-md-10">
        <h1 class="d-inline">Me</h1>
      </div>
      <div class="col-md-2">
        <router-link :to="{ name: 'MyAds' }" class="btn btn-success">My Ads</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label>Username</label>:
        {{ user.username }}
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label>Email</label>:
        {{ user.email }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  created: function() {
    this.getUser();
  },
  methods: {
    getUser() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.getItem('authtoken') }
      };
      let uri = "/users/me";
      this.axios
        .get(uri, auth)
        .then(response => {
          this.user = response.data;
        })
        .catch(function() {
          router.push("/SignIn");
        });
    }
  }
};
</script>