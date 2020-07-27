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
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="user.password" />
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
      user: {}
    };
  },
  methods: {
    signUp() {
      let uri = "/users/signup";
      this.axios.post(uri, this.user).then(response => {
        toastr.success(response.data.user, "User created");
        this.$router.push({ name: "DisplayAd" });
      });
    }
  }
};
</script>