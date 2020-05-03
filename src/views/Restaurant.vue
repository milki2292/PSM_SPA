<template>
  <div class="container">
    <div>
      <img id="topPhoto" v-bind:src="restaurant.image_url"/>
    </div>
    <br>
    <div id="restaurantName">
      {{ this.restaurant.name }}
    </div>
    <div class="restaurantCategory">
      {{ this.restaurant.categories[0].title }}
    </div>
    <div id="restaurantLocation">
      {{ this.restaurant.location.city }}, {{ restaurant.location.address1 }}
    </div>
    <br>
    <div style="width: 70%; margin: 0 auto;font-size: 20px">
      <div class="restaurantInfo">
        Ocena: {{ this.restaurant.rating }}/5
      </div>
      <div class="restaurantInfo" style=border-left:none;> Ceny :{{ this.restaurant.price }}</div>
      <div class="restaurantInfo" style=border-left:none;>{{ this.restaurant.review_count }} Opinie/i</div>
      <div style=clear:both;></div>
    </div>
    <div class="restaurantCategory">
    <p>
      <button @click="addToFavourites()" id="favourite" class="btn btn-login btn-lg">
        Dodaj do ulubionych
      </button>
    </p>
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
  mounted() {
    this.getRestaurant();
  },
  methods: {
    getRestaurant(){
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
    },
    addToFavourites() {
      var user = firebase.auth().currentUser;
      var restaurant = this.restaurant;
      try{
        var docRef = this.db.collection("favourites").doc(user.uid);
      }catch(error){
        alert("Zaloguj się, aby dodać do ulubionych")
      }
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
                alert("Dodano do ulubionych");
              })
          } else {
            docRef
              .set({
                restaurants: [restaurant],
              })
              .then(function () {
                alert("Dodano do ulubionych");
              })
          }
        });
      }
    },
  },
};
</script>
<style >
#favourite{
  margin-top: 30px;
}
.restaurantInfoBorder{
  border-left:none;
}
@media screen and (max-width: 990px ) {
  #topPhoto{
    width:60%;
  }
  #restaurantName{
    font-size:6vw;
    font-weight: 700;
  }
  #restaurantLocation{
    font-size:4vw;
    font-weight: 400;
  }
  .restaurantCategory{
    font-size:5vw;
    font-weight: 500;
  }
  .restaurantInfo{
    float: left; 
    width: 33%; 
    margin: 0 auto; 
    border: 3px solid rgb(92, 91, 91);
    font-size: 2.5vw;
    font-weight: 700;
  }
}
@media screen and (min-width: 990px ) {
  #topPhoto{
    width:30%;
  }
  #restaurantName{
    font-size:3vw;
    font-weight: 700;
  }
  #restaurantLocation{
    font-size:2vw;
    font-weight: 400;
  }
  .restaurantCategory{
    font-size:2.5vw;
    font-weight: 500;
  }
  .restaurantInfo{
    float: left; 
    width: 33%; 
    margin: 0 auto; 
    border: 3px solid rgb(92, 91, 91);
    font-size: 1.5vw;
    font-weight: 700;
  }
}
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


@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
