<template>
  <div>
    <div class="row py-4">
      <div class="col-10">
        <h1 class="d-inline">Signin</h1>
      </div>
      <div class="col-2"></div>
    </div>
    <form v-on:submit.prevent="signIn">
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" v-model="user.username" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="user.password" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Signin</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    signIn() {
      let uri = "/users/signin";
      this.axios
        .post(uri, this.user)
        .then(response => {
          localStorage.setItem("authtoken", response.data.token);
          const auth = {
            headers: { "auth-token": localStorage.getItem("authtoken") }
          };
          let uri = "/users/me";
          this.axios.get(uri, auth).then(response => {
            document.location.href = "/me";
          });
        })
        .catch(function(error) {
          if (error.response) {
            document.location.href = "/signin";
          }
        });
    }
  }
};
</script>
