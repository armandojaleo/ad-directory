<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">My Ads</h1>
        <router-link
          v-if="ifAuthenticated"
          :to="{ name: 'CreateAd' }"
          class="btn btn-primary float-right mt-2"
        >New</router-link>
      </div>
    </div>
    <br />

    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <td>Name</td>
          <td>Company</td>
          <td>Description</td>
          <td>Category</td>
          <td>Updated</td>
          <td v-if="ifAuthenticated">Actions</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(ad, index) in ads" :key="index">
          <td>{{ ad.name }}</td>
          <td>{{ ad.company }}</td>
          <td>{{ ad.description }}</td>
          <td>{{ ad.category }}</td>
          <td>{{ ad.lasttimestamp }}</td>
          <td v-if="ifAuthenticated">
            <router-link :to="{ name: 'EditAd', params: {id: ad._id} }" class="btn btn-primary">Edit</router-link>
            <button class="btn btn-danger" v-on:click="deleteAd(ad._id, index)">Delete</button>
          </td>
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
      ifAuthenticated: localStorage.getItem("authtoken") ? true : false
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
          router.push("/SignIn");
        });
    },
    deleteAd(id, index) {
      const auth = {
        headers: { "auth-token": localStorage.getItem("authtoken") }
      };
      const response = confirm("Are you sure you want to delete?");
      if (response) {
        let uri = "/ads/delete" + id;
        this.ads.splice(index, 1);
        this.axios.get(uri, auth).catch(function() {
          router.push("/SignIn");
        });
      }
    }
  }
};
</script>
