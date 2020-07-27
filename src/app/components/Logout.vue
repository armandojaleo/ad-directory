<template lang="html">
  <div>
    <div class="row py-4">
      <div class="col-12">
        <h1 class="d-inline">Logout</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created: function() {
    this.logout();
  },
  methods: {
    logout() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.getItem('authtoken') }
      };
      let uri = "/users/logout";
      this.axios
        .get(uri, auth)
        .then(response => {
          localStorage.removeItem('authtoken');
          document.location.href = "/";
        })
        .catch(function() {
          router.push("/");
        });
    }
  }
};
</script>