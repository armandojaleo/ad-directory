<template>
  <div>
    <div class="row py-4">
      <div class="col-9">
        <h1 class="d-inline">New Ad</h1>
      </div>
      <div class="col-3 text-right">
        <router-link :to="{ name: 'DisplayAds' }" class="btn btn-success">Return</router-link>
      </div>
    </div>
    <form v-on:submit.prevent="createAd">
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="ad.name" />
      </div>
      <div class="form-group">
        <label>Company:</label>
        <select class="form-control" v-model="ad.company">
          <option v-for="company in companies" :key="company._id" v-bind:value="company._id">
            {{ company.name }}
          </option>
        </select>
        <input type="hidden" v-model="ad.companyid" />
      </div>
      <div class="form-group">
        <label>Description:</label>
        <textarea class="form-control" v-model="ad.description"></textarea>
      </div>
      <div class="form-group">
        <label>Link:</label>
        <input type="text" class="form-control" v-model="ad.link" />
      </div>
      <div class="form-group">
        <label>Category:</label>
        <input type="text" class="form-control" v-model="ad.category" />
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
      ad: {},
      companies: {}
    };
  },
  methods: {
    createAd() {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      let uri = "/ads/new";
      this.axios
        .post(uri, this.ad, auth)
        .then(response => {
          toastr.success(response.data.ad, "Ad created");
          this.$router.push({ name: "MyAds" });
        })
        .catch(function() {
          localStorage.removeItem("authtoken");
          document.location.href = "/signin";
        });
    },
    fetchCompanies() {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      let uri = "/companies/user";
      this.axios
        .get(uri, auth)
        .then(response => {
          this.companies = response.data;
        })
        .catch(function() {
          localStorage.removeItem("authtoken");
          document.location.href = "/signin";
        });
    }
  }
};
</script>
