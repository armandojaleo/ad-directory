<template>
  <div>
    <div class="row py-4">
      <div class="col-10">
        <h1 class="d-inline">Signup</h1>
      </div>
      <div class="col-2"></div>
    </div>
    <form v-on:submit.prevent="signUp">
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" v-model="user.username" />
      </div>
      <div class="form-group">
        <label>email</label>
        <input type="email" class="form-control" v-model="user.email" />
        <span v-if="msg.email">{{msg.email}}</span>
      </div>
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
        <button class="btn btn-primary">Signup</button>
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
        emai: "",
        password1: "",
        password2: "",
      },
      msg: [],
    };
  },
  watch: {
    "user.email": function (value) {
      this.user.email = value;
      this.validateEmail(value);
    },
    "user.password2": function () {
      this.validatePassword(this.user.password1, this.user.password2);
    },
  },
  methods: {
    signUp() {
      let uri = "/users/signup";
      this.axios
        .post(uri, this.user)
        .then((response) => {
          toastr.success(response.data.user, "User created");
          this.$router.push({ name: "DisplayAd" });
        })
        .catch(function () {
          localStorage.removeItem("authtoken");
          document.location.href = "/signup";
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
      if (password1 === password2) {
        this.msg["password"] = "";
      } else {
        this.msg["password"] = "The password must be the same";
      }
    },
  },
};
</script>