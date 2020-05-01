<template>
  <div>
    <p>
      {{this.restaurant}}
      <button @click="addToFavourites()" id="favourite">dodaj do ulubionych</button>
    </p>
  </div>
</template>

<script>

import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Restaurant",
  data: function() {
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
    addToFavourites(){
      var user = firebase.auth().currentUser
      var docRef = this.db.collection("favourites").doc(user.uid)
      var restaurant = this.restaurant
         if (user) {
           docRef.get().then(function(doc){
             if(doc.exists){
               docRef.update({
                 restaurants: firebase.firestore.FieldValue.arrayUnion(restaurant)
               })
               .then(function(){
                 alert("dodano")
               })
               .catch(function(error){
                 console.log(error)
               })

             } else {
               docRef.set({
                 restaurants: [restaurant]
               })
               .then(function() {
                  alert("Dodano do ulubionych")
               })
               .catch(function(error){
                 console.log(error)
               })
             }
           })
         }

    }
  }
};
</script>
