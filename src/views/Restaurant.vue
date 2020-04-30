<template>
  <div>
    <p>
      {{this.restaurant}}
    </p>
  </div>
</template>

<script>
export default {
  name: "Restaurant",
  data: function() {
    return {
      resID: this.$route.params.restaurantID,
      restaurant: [],
      API_key:
        "Bearer fkbp8a45dtXLiROWZHIh6ruBZVTOtm_oNzqlj2NzfDskFb5HMCFjRBEJgkIgJkv-Q0H7IFkT3LWgzDWoNbjsHnZ5WVECz-Fr5lYhR_hYtE_PAPrrwBNeLgtn-MOmXnYx",
    };
  },
  created() {
    var config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.API_key,
      },
    };
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${this.resID}`,
      { headers: config.headers }
    )
      .then((response) => response.json())
      .then((json) => (this.restaurant = json))
      .catch((error) => console.log(error));
  },
};
</script>
