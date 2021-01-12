<template lang="html">
  <div>
    <div class="row py-4">
      <div class="col-9">
        <h1 class="d-inline">My Companies</h1>
      </div>
      <div class="col-3 text-right">
        <router-link v-if="ifAuthenticated" :to="{ name: 'CreateCompany' }" class="btn btn-success">New</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form v-on:submit.prevent="searchCompanies()">
          <input type="text" class="form-control" v-model="search" placeholder="Search" />
        </form>
      </div>
    </div>
    <div v-if="companies == null" class="row mt-5">
      <div class="col-12">
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h2 class="display-4">We are sorry</h2>
            <p class="lead">I can't find it</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row my-2" v-for="(company, index) in companies" :key="index">
      <div class="col-12">
        <div class="card">
          <img src class="card-img-top" alt />
          <div class="card-body">
            <h5 class="card-title">Name: {{ company.name }}</h5>
            <p class="card-text">Description: {{ company.description }}</p>
            <p class="card-text">Phone: {{ company.phone }}</p>
            <p class="card-text">Link: {{ company.link }}</p>
            <p class="card-text">
              <small class="text-muted">Last update: {{ company.lasttimestamp }}</small>
            </p>
            <div v-if="ifAuthenticated">
              <router-link
                :to="{ name: 'EditCompany', params: {id: company._id} }"
                class="btn btn-primary"
              >Edit</router-link>
              <button class="btn btn-danger" v-on:click="deleteCompany(company._id, index)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companies: [],
      ifAuthenticated: localStorage.getItem("authtoken") ? true : false,
      search: ""
    };
  },

  created: function() {
    this.fetchCompanies();
  },

  methods: {
    fetchCompanies() {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      let uri = "/companies/user";
      return this.axios
        .get(uri, auth)
        .then(response => {
          this.companies = response.data;
        })
        .catch(function() {
          //localStorage.removeItem("authtoken");
          //document.location.href = "/signin";
        });
    },
    searchCompanies() {
      if (this.search !== "") {
        let uri = "/companies/search/" + encodeURIComponent(this.search);
        this.axios.get(uri).then(response => {
          this.companies = response.data;
        });
      } else {
        this.fetchCompanies();
      }
    },
    deleteCompany(id, index) {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      const response = confirm("Are you sure you want to delete?");
      if (response) {
        let uri = "/companies/delete/" + id;
        this.companies.splice(index, 1);
        this.axios.get(uri, auth).catch(function() {
          localStorage.removeItem("authtoken");
          document.location.href = "/signin";
        });
      }
    }
  }
};
</script>