<template>
    <div class="container">
        <h1>Profil</h1>
        <img id="avatarURL" src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png" style="border-radius: 50%;object-fit: cover;height: 200px; width: 200px;">
        <div id="accountName" style="font-weight: 600;">
           profil
        </div>            
            <div>
                <br>
        <button class="btn btn-login btn-lg" @click="goManagement" >Zarządzaj Kontem</button>
    </div>
<br>
    <p>Ulubione</p>
        
        <div @click="goRestaurant(restaurant.id)" v-bind:key="restaurant.id" v-for="restaurant in this.restaurants" class="restaurants" >
            <div class="res-name">{{ restaurant.name }}<br>
                {{ restaurant.location.city }}, {{ restaurant.location.address1 }}
            </div>
            <div class="res-title">{{restaurant.categories[0].title}}</div> 
            <div class="res-img">
                <img v-bind:src="restaurant.image_url" width="100%" height="100%" />
            </div>
            <div class="c"></div>
        </div> 
        
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    name:"Users",
    data: function() {
    return {
      db: firebase.firestore(),
      restaurants: [],
    };
  },
     created(){
         var restaurants = this.restaurants
         var dbRef = this.db.collection("favourites")

         firebase.auth().onAuthStateChanged(function (user) {
             document.getElementById("accountName").innerHTML = user.email
            const storageRef = firebase.storage().ref(user.uid + "/avatar/" + "my_avatar")
            storageRef.getDownloadURL().then(function (url) {
                document.getElementById("avatarURL").setAttribute("src", url)
            })
            dbRef.doc(user.uid).get().then(function(doc) {
                if (doc.exists) {
                    doc.data().restaurants.forEach(el => {
                        restaurants.push(el)
                    })
                } 
                })
        })

     },
    methods: {
        goManagement(){
            this.$router.push("/UserManagement");
        },
        goRestaurant(id){
      this.$router.push({path:`/Restaurant/${id}`})
    },
    }

}
</script>
<style scoped>
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