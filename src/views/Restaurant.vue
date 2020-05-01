<template>
  <div class="container">
    <div>
      <img v-bind:src="restaurant.image_url" width="60%" height="60%" />
    </div>
    <br>
    <div style="font-size: 3vw;">
      {{ this.restaurant.name }}
    </div>
    <div style="font-size: 20px">
      {{ this.restaurant.categories[0].title }}
    </div>
    <div style="font-size: 20px">
      {{ this.restaurant.location.city }}, {{ restaurant.location.address1 }}
    </div>
    <br>
    <div style="width: 50%; margin: 0 auto;font-size: 20px">
      <div style="float: left; width: 33%; margin: 0 auto;">
        {{ this.restaurant.rating }}/5 ocena
      </div>
      <div style="float: left; width: 33%; margin: 0 auto;"> ceny :{{ this.restaurant.price }}</div>
      <div style="float: left; width: 33%; margin: 0 auto;">{{ this.restaurant.review_count }} opinii</div>
      <div style="clear: both;"></div>
    </div>
    <div style="font-size: 20px">
      <br>
      Galeria
    </div>
    <div style="margin-top:20px">
      <img v-bind:src="restaurant.photos[1]" width="60%" height="60%" />
    </div>
    <br>
    <div>
      <img v-bind:src="restaurant.photos[2]" width="60%" height="60%" />
    </div>
    <br>
    <p>
      <!-- {{ this.restaurant }} -->
      <button @click="addToFavourites()" id="favourite" class="btn btn-login btn-lg">
        dodaj do ulubionych
      </button>
    </p>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Restaurant",
  data: function () {
    return {
      db: firebase.firestore(),
      resID: this.$route.params.restaurantID,
      restaurant: null,
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
  methods: {
    addToFavourites() {
      var user = firebase.auth().currentUser;
      var docRef = this.db.collection("favourites").doc(user.uid);
      var restaurant = this.restaurant;
      if (user) {
        docRef.get().then(function (doc) {
          if (doc.exists) {
            docRef
              .update({
                restaurants: firebase.firestore.FieldValue.arrayUnion(
                  restaurant
                ),
              })
              .then(function () {
                alert("dodano");
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            docRef
              .set({
                restaurants: [restaurant],
              })
              .then(function () {
                alert("Dodano do ulubionych");
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        });
      }
    },
  },
};
</script>
<style>
.container {
  width: 100%;
  align-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
}
.btn-login {
  background-color: hsl(27, 100%, 66%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
  width: 300px;
  justify-self: center;
}
.btn-login:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.active,
.open .dropdown-toggle.btn-danger {
  background-color: hsl(24, 83%, 45%) !important;
  background-repeat: repeat-x;
}
</style>
