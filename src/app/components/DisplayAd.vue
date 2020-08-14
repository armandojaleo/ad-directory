<template>
  <div>
    <div class="row py-4">
      <div class="col-9">
        <h1 class="d-inline">Ad Directory</h1>
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
    <div v-else class="row my-2">
      <div class="col-12 col-md-4 my-2" v-for="(ad, index) in ads" :key="index">
        <div class="card">
          <img src class="card-img-top" alt />
          <div class="card-body">
            <h5 class="card-title">{{ ad.name }}</h5>
            <p class="card-text text-nowrap text-truncate" style="width: 18rem;">{{ ad.description }}</p>
            <p class="card-text">
              <small class="text-muted">{{ ad.company }}</small>
            </p>
            <p class="card-text">
              <small class="text-muted">In {{ ad.category }}</small>
            </p>
            <p class="card-text">
              <small class="text-muted">{{ ad.lasttimestamp }}</small>
            </p>
            <a :href="ad.link" class="btn btn-primary" target="_new">Visit</a>
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
      let uri = "/ads";
      this.axios.get(uri).then(response => {
        this.ads = response.data;
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
    }
  }
};
</script>
