<template>
  <div>
    <div class="container">
      <div id="profile">
        <a @click="goUser" style="text-decoration: none;"
          ><img
            id="avatarURL"
            src=".././img/service_default_avatar_182956.png"
            width="200"
            height="200"
        /></a>

        <div style="font-weight: 600;">
          Profil
        </div>
      </div>
      <div id="motto">
        <div style="font-weight: 600;">Foddy</div>
        Jedz gdzie chcesz
      </div>
      <div id="logout" style="font-size: 30px; text-decoration: none;">
        <button @click="logout"><i class="icon-logout"></i></button>
      </div>
      <div>
        <a @click="goLogin"><button id="login">Zaloguj</button></a>
        <a @click="goRegistration"
          ><button id="register">Zarejestruj</button></a
        >
      </div>
      <div id="c"></div>
      <br />
      <div id="searchframe">
        <div id="search">
          <div id="local">
          <font-awesome-icon icon="search" />
          <input
            type="text"
            placeholder=" Szukaj"
            style="border: none; width: 270px; height: 100%;"
            v-model="location"
          />
          </div>
          <div id="zakres">
          <label for="prices">Zakres cenowy </label>

          <select v-model="price" id="prices">
            <option value="1">Tanie</option>
            <option value="2">Średnie</option>
            <option value="3">Drogie</option>
            <option value="4">Bardzo drogie</option>
          </select>
          </div>
          <div id="sort">
          <label for="sortBy">Sortuj po </label>

          <select v-model="sortBy" id="sortBy">
            <option value="best_match">Najlepszy traf</option>
            <option value="rating">Oceny</option>
            <option value="review_count">Liczbie recenzji</option>
          </select>
          </div>
          <div id="c"></div>
      </div>
        </div>
      <br />
      <button class="btn btn-search btn-lg" v-on:click="searchByLocation()">
        Szukaj<font-awesome-icon icon="search" />
      </button>
      <div @click="goRestaurant(restaurant.id)" v-bind:key="restaurant.id" v-for="restaurant in results.businesses" id="restaurants">
          <div id="res-name">{{ restaurant.name }}<br>
              {{ restaurant.location.city }}, {{ restaurant.location.address1 }}
          </div>
          <div id="res-title">{{restaurant.categories[0].title}}</div> 
          <div id="res-img">
              <img v-bind:src="restaurant.image_url" width="100%" height="100%" />
          </div>
          <div id="c"></div>
      </div>
      </div>
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Home",
  data: function() {
    return{
      results: [],
      location: "",
      price: "1,2,3,4",
      sortBy: "best_match",
      API_key: "Bearer fkbp8a45dtXLiROWZHIh6ruBZVTOtm_oNzqlj2NzfDskFb5HMCFjRBEJgkIgJkv-Q0H7IFkT3LWgzDWoNbjsHnZ5WVECz-Fr5lYhR_hYtE_PAPrrwBNeLgtn-MOmXnYx"
    }
  },
  created(){
         firebase.auth().onAuthStateChanged(function (user) {
            const storageRef = firebase.storage().ref(user.uid + "/avatar/" + "my_avatar")
            storageRef.getDownloadURL().then(function (url) {
                document.getElementById("avatarURL").setAttribute("src", url)
            }).catch(function (error) {
                console.log(error)
            })
})
     },
  mounted() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        document.getElementById("login").hidden = true;
        document.getElementById("register").hidden = true;
        document.getElementById("profile").hidden = false;
        document.getElementById("logout").hidden = false;
      } else {
        document.getElementById("login").hidden = false;
        document.getElementById("register").hidden = false;
        document.getElementById("profile").hidden = true;
        document.getElementById("logout").hidden = true;
      }
    });
  },
  methods: {
    goLogin() {
      this.$router.push("/Login");
    },
    
    goRegistration() {
      this.$router.push("/Registration");
    },
    goRestaurant(id){
      this.$router.push({path:`/Restaurant/${id}`})
    },
    goUser() {
      this.$router.push("/User");
    },
    logout() {
      firebase.auth().signOut()
        .then(function () {
            console.log("logout")
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    searchByLocation: function () {
      var url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search"
      var config = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": this.API_key,
        }
      }
      fetch(`${url}?location=${this.location}&price=${this.price}&sort_by=${this.sortBy}`, { headers: config.headers })
          .then(response => response.json())
          .then(json => this.results = json)
          .catch(error => console.log(error))

  }
    
  },
};
</script>

<style>
#local{
  float: left;
  border-right: 1px solid rgb(92, 91, 91);
  padding: 12px;
  
}
#zakres{
  float: left;
  padding: 7.5px;
  border-right: 1px solid rgb(92, 91, 91);
}
#sort{
  float: left;
  padding: 7.5px;
  
}
body::after {
  content: "";
  background: url(.././img/bground-pizza.jpg);
  opacity: 0.2;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.container {
  width: 100%;
  align-content: center;
  align-items: center;
  text-align: center;
  margin-top: 50px;
}
.center { 
  position: absolute; 
  top: 0; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  margin: auto; 
}
a:link {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
  

#profilepic {
  width: 72px;
  height: 72px;
}
#profile {
  float: left;
  width: 33%;
}
#logout {
  float: left;
  width: 33%;
  margin: auto;
}
#motto {
  float: left;
  width: 33%;
  font-size: 2.5vw;
}

#logout > a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
#searchframe {
  width: 800px;
  height: 60px;
  background-color: rgb(92, 100, 100);
  margin: auto;
  position: relative;
}
#search {
  background-color: white;
  margin: auto;
  width: 97%;
  height: 80%;
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
input:focus {
  outline: none;
}
#restaurants {
  background-color: white;
  border-style: solid;
  border-width: 1px;
  margin-top: 15px;
  box-shadow: 10px 10px 16px -7px rgba(148, 138, 148, 1);
  height: 23.5%;
}
#res-name{
  float: left;
  padding-top: 72px;
  padding-bottom: 72px;
  font-size: 2.5vmin;
  width: 54%;
}
#res-title{
  float: left;
  font-size: 2.5vmin;
  width: 19%;
  padding-top: 80;
  
}
#res-img{
float: right;
width: 25%;
height: 100%;

}

#restaurants > a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
#loader { 
  border: 12px solid #f3f3f3; 
  border-radius: 50%; 
  border-top: 12px solid #444444; 
  width: 70px; 
  height: 70px; 
  animation: spin 1s linear infinite; 
} 

@keyframes spin { 
  100% { 
      transform: rotate(360deg); 
  } 
} 

body {
  justify-content: center;
}
#strip {
  text-align: center;
  align-items: center;
  background-color: #e04242;
  height: 60px;
}
#foddy {
  font-size: 26px;
  font-weight: 600;
  padding-top: 10px;
  color: white;
}


#icon {
  margin-top: 52px;
}
#email {
  margin-top: 100px;
  width: 350px;
  border: none;
  border-bottom: 2px solid grey;
  margin-bottom: 20px;
  font-size: 24px;
}
#password {
  width: 350px;
  border: none;
  border-bottom: 2px solid grey;
  margin-bottom: 20px;
  font-size: 24px;
}
#password2 {
  width: 350px;
  border: none;
  border-bottom: 2px solid grey;
  margin-bottom: 20px;
  font-size: 24px;
}

#v1 {
  width: 2%;
  border-right: 1px solid rgb(218, 218, 218);
  height: 500px;
  float: left;
  left: 48%;
  margin-top: 30px;
  margin-right: 17px;
}
#a {
  align-items: center;
  text-align: center;
  width: 45%;
  /* display: table; */
  margin: 0 auto;
  display: table;
  float: left;
}
#b {
  align-items: center;
  text-align: center;
  width: 45%;

  margin-top: 48px;
  float: left;
}
#c {
  clear: both;
}
#regbutt {
  margin-right: 100px;
}
#text1 {
  text-align: center;
  font-size: 20;
}

.btn-yahoo {
  background-color: hsl(300, 76%, 11%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
  width: 300px;
}
.btn-yahoo:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.active,
.open .dropdown-toggle.btn-danger {
  background-color: hsl(300, 65%, 18%) !important;
  background-repeat: repeat-x;
}
.btn-twitter {
  background-color: hsl(212, 100%, 66%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
}
.btn-twitter:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.active,
.open .dropdown-toggle.btn-danger {
  background-color: hsl(216, 83%, 45%) !important;
  background-repeat: repeat-x;
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
.btn-fb {
  background-color: hsl(234, 79%, 48%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
  width: 300px;
}
.btn-fb:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.active,
.open .dropdown-toggle.btn-danger {
  background-color: hsl(219, 76%, 52%) !important;
  background-repeat: repeat-x;
}
.btn-git {
  background-color: hsl(0, 0%, 40%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
  width: 300px;
}
.btn-git:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.active,
.open .dropdown-toggle.btn-danger {
  background-color: hsl(0, 0%, 55%) !important;
  background-repeat: repeat-x;
}
.btn-google {
  background-color: hsl(0, 62%, 46%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
  width: 300px;
}
.btn-google:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.active,
.open .dropdown-toggle.btn-danger {
  background-color: hsl(0, 73%, 58%) !important;
  background-repeat: repeat-x;
}
.btn-search {
  background-color: hsl(0, 0%, 39%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
  width: 350px;
}
.btn-search:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.active,
.open .dropdown-toggle.btn-danger {
  background-color: hsl(0, 73%, 58%) !important;
  background-repeat: repeat-x;
}
</style>
