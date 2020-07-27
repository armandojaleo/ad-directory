<template lang="html">
  <div>
    <div class="row py-4">
      <div class="col-9">
        <h1 class="d-inline">Me</h1>
      </div>
      <div class="col-3 text-right">
        <router-link :to="{ name: 'MyAds' }" class="btn btn-success">My Ads</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <label>Username</label>:
        {{ user.username }}
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <label>Email</label>:
        {{ user.email }}
      </div>
    </div>
    <form v-on:submit.prevent="updateUser">
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="user.password1" />
      </div>
      <div class="form-group">
        <label>Repeat Password</label>
        <input type="password" class="form-control" v-model="user.password2" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import toastr from "toastr";

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
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      let uri = "/users/me";
      this.axios
        .get(uri, auth)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          localStorage.removeItem("authtoken");
          document.location.href = "/signin";
        });
    },
    updateUser() {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      let uri = "/users/update";
      this.axios
        .post(uri, this.user, auth)
        .then(response => {
          toastr.success(response.data.user, "Password updated");
        })
        .catch(function() {
          localStorage.removeItem("authtoken");
          document.location.href = "/signin";
        });
    }
  }
};
</script>