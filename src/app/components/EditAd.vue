<template>
  <div>
    <div class="row py-4">
      <div class="col-9">
        <h1 class="d-inline">Update Ad</h1>
      </div>
      <div class="col-3">
        <router-link :to="{ name: 'MyAds' }" class="btn btn-success">Return</router-link>
      </div>
    </div>
    <form v-on:submit.prevent="updateAd">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="ad.name" />
      </div>

      <div class="form-group">
        <label>Company</label>
        <input type="text" class="form-control" v-model="ad.company" />
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" v-model="ad.description"></textarea>
      </div>

      <div class="form-group">
        <label>Link:</label>
        <input type="text" class="form-control" v-model="ad.link" />
      </div>

      <div class="form-group">
        <label name="product_price">Category</label>
        <input type="text" class="form-control" v-model="ad.category" />
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import toastr from "toastr";

export default {
  data() {
    return {
      ad: {}
    };
  },

  created: function() {
    this.getAd();
  },

  methods: {
    getAd() {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      let uri = "/ads/edit/" + this.$route.params.id;
      this.axios
        .get(uri, auth)
        .then(response => {
          this.ad = response.data;
        })
        .catch(function() {
          router.push("/SignIn");
        });
    },
    updateAd() {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      let uri = "/ads/update/" + this.$route.params.id;
      this.axios
        .post(uri, this.ad, auth)
        .then(response => {
          toastr.success(response.data.ad, "Ad updated");
          this.$router.push({ name: "MyAds" });
        })
        .catch(function() {
          localStorage.removeItem("authtoken");
          document.location.href = "/signin";
        });
    }
  }
};
</script>
