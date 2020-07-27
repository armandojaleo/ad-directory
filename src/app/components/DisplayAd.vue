<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Ad Directory</h1>
        <router-link v-if="ifAuthenticated" :to="{ name: 'CreateAd' }" class="btn btn-primary float-right mt-2">New</router-link>
      </div>
    </div>
    <br>

    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <td>Name</td>
          <td>Company</td>
          <td>Description</td>
          <td>Category</td>
          <td>Updated</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(ad, index) in ads" :key="index">
          <td>{{ ad.name }}</td>
          <td>{{ ad.company }}</td>
          <td>{{ ad.description }}</td>
          <td>{{ ad.category }}</td>
          <td>{{ ad.lasttimestamp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ads: [],
      ifAuthenticated: localStorage.getItem('authtoken')? true: false
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
    }
  }
};
</script>
