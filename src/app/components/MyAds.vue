<template>
  <div>
    <div class="row py-4">
      <div class="col-9">
        <h1 class="d-inline">My Ads</h1>
      </div>
      <div class="col-3 text-right">
        <router-link v-if="ifAuthenticated" :to="{ name: 'CreateAd' }" class="btn btn-success">New</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form v-on:submit.prevent="searchAds()">
          <input type="text" class="form-control" v-model="search" placeholder="Search" />
        </form>
      </div>
    </div>
    <div v-if="ads.length == 0" class="row mt-5">
      <div class="col-12">
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h2 class="display-4">We are sorry</h2>
            <p class="lead">I can't find it</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row my-2" v-for="(ad, index) in ads" :key="index">
      <div class="col-12">
        <div class="card">
          <img src class="card-img-top" alt />
          <div class="card-body">
            <h5 class="card-title">Name: {{ ad.name }}</h5>
            <p class="card-text">Description: {{ ad.description }}</p>
            <p class="card-text">
              <small class="text-muted">Company: {{ ad.company }}</small>
            </p>
            <p class="card-text">
              <small class="text-muted">Link: {{ ad.link }}</small>
            </p>
            <p class="card-text">
              <small class="text-muted">Categories: {{ ad.category }}</small>
            </p>
            <p class="card-text">
              <small class="text-muted">Last update: {{ ad.lasttimestamp }}</small>
            </p>
            <div v-if="ifAuthenticated">
              <router-link
                :to="{ name: 'EditAd', params: {id: ad._id} }"
                class="btn btn-primary"
              >Edit</router-link>
              <button class="btn btn-danger" v-on:click="deleteAd(ad._id, index)">Delete</button>
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
      ads: [],
      ifAuthenticated: localStorage.getItem("authtoken") ? true : false,
      search: ""
    };
  },

  created: function() {
    this.fetchAds();
  },

  methods: {
    fetchAds() {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      let uri = "/ads/user";
      this.axios
        .get(uri, auth)
        .then(response => {
          this.ads = response.data;
        })
        .catch(function() {
          localStorage.removeItem("authtoken");
          document.location.href = "/signin";
        });
    },
    searchAds() {
      if (this.search !== "") {
        let uri = "/ads/search/" + encodeURIComponent(this.search);
        this.axios.get(uri).then(response => {
          this.ads = response.data;
        });
      } else {
        this.fetchAds();
      }
    },
    deleteAd(id, index) {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      const response = confirm("Are you sure you want to delete?");
      if (response) {
        let uri = "/ads/delete/" + id;
        this.ads.splice(index, 1);
        this.axios.get(uri, auth).catch(function() {
          localStorage.removeItem("authtoken");
          document.location.href = "/signin";
        });
      }
    }
  }
};
</script>
