<template>
    <div class="container">
        <h1>Profile</h1>
        <br>
        <img style="border-radius:50%" id="avatarURL" src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png" width="200"
            height="200">

            
            <div>
                <br>
        <button class="btn btn-login btn-lg" @click="goManagement" >Zarządzaj Kontem</button>
    </div>
<br>
        
        <!-- <div> {{this.restaurants[0]}} </div> -->
        <div v-if="restaurants.length!=0" id="ulu" >
            <div id="res-name">{{ this.restaurants[0].name }}<br>
                {{ this.restaurants[0].location.city }}, {{ this.restaurants[0].location.address1 }}
            </div>
            <div id="res-title">{{this.restaurants[0].categories[0].title}}</div> 
            <div id="res-img">
                <img v-bind:src="this.restaurants[0].image_url" width="100%" height="100%" />
            </div>
            <div id="c"></div>
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
            const storageRef = firebase.storage().ref(user.uid + "/avatar/" + "my_avatar")
            storageRef.getDownloadURL().then(function (url) {
                document.getElementById("avatarURL").setAttribute("src", url)
            }).catch(function (error) {
                console.log(error)
            })
            dbRef.doc(user.uid).get().then(function(doc) {
                if (doc.exists) {
                    doc.data().restaurants.forEach(el => {
                        restaurants.push(el)
                    })
                } else {
                    console.log("Nie ma ulubionych");
                }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
            });

        })

     },
    methods: {
        goManagement(){
            this.$router.push("/UserManagement");
        }

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
#ulu{
    background-color: #fff;
}
</style>