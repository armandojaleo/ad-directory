<template lang="html">
  <div>
    <div class="row py-4">
      <div class="col-7">
        <h1 class="d-inline">Me</h1>
      </div>
      <div class="col-5 text-right">
        <router-link :to="{ name: 'MyAds' }" class="btn btn-success">My Ads</router-link>
        <router-link :to="{ name: 'MyCompanies' }" class="btn btn-success">My Companies</router-link>
        <button class="btn btn-danger disabled" v-on:click="deleteMe()">Delete Me</button>
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
        <transition name="fade">
          <small v-if="msg.password">{{msg.password}}</small>
        </transition>
      </div>
      <div class="form-group">
        <label>Repeat password</label>
        <input type="password" class="form-control" v-model="user.password2" />
        <transition name="fade">
          <small v-if="msg.password">{{msg.password}}</small>
        </transition>
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
      user: {
        password1: "",
        password2: "",
      },
      msg: [],
    };
  },
  created: function () {
    this.getUser();
  },
  watch: {
    "user.password2": function () {
      this.validatePassword(this.user.password1, this.user.password2);
    },
    $route(to, from) {
      this.user.destroy();
    },
  },
  methods: {
    getUser() {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") },
      };
      let uri = "/users/me";
      this.axios
        .get(uri, auth)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          localStorage.removeItem("authtoken");
          document.location.href = "/signin";
        });
    },
    updateUser() {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") },
      };
      let uri = "/users/update";
      this.axios
        .post(uri, this.user, auth)
        .then((response) => {
          toastr.success(response.data.user, "Password updated");
        })
        .catch(function () {
          localStorage.removeItem("authtoken");
          document.location.href = "/signin";
        });
    },
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Invalid Email Address";
      }
    },
    validatePassword(password1, password2) {
      if (password1 !== password2) {
        this.msg["password"] = "The password must be the same";
      } else {
        this.msg["password"] = "";
      }
    },
  },
};
</script>