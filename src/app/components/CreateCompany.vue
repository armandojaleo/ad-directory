<template>
  <div>
    <div class="row py-4">
      <div class="col-9">
        <h1 class="d-inline">New Company</h1>
      </div>
      <div class="col-3 text-right">
        <router-link :to="{ name: 'MyCompanies' }" class="btn btn-success">Return</router-link>
      </div>
    </div>
    <form v-on:submit.prevent="createCompany">
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="company.name" />
      </div>
      <div class="form-group">
        <label>Identification:</label>
        <input type="text" class="form-control" v-model="company.identification" />
      </div>
      <div class="form-group">
        <label>Description:</label>
        <textarea class="form-control" v-model="company.description"></textarea>
      </div>
      <div class="form-group">
        <label>Phone:</label>
        <input type="text" class="form-control" v-model="company.phone" />
      </div>
      <div class="form-group">
        <label>Link:</label>
        <input type="text" class="form-control" v-model="company.link" />
      </div>
      <div class="form-group">
        <label>Keywords:</label>
        <input type="text" class="form-control" v-model="company.keywords" />
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
      company: {}
    };
  },
  methods: {
    createCompany() {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      let uri = "/companies/new";
      this.axios
        .post(uri, this.company, auth)
        .then(response => {
          toastr.success(response.data.company, "Company created");
          this.$router.push({ name: "MyCompanies" });
        })
        .catch(function() {
          localStorage.removeItem("authtoken");
          document.location.href = "/signin";
        });
    }
  }
};
</script>
