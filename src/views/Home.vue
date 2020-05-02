<template>
  <div>
    <div class="container">
      <div id="profile">
        <a @click="goUser" style="text-decoration: none;"
          ><img
            id="avatarURL"
            src=".././img/service_default_avatar_182956.png"
            width="50%"
            height="50%"
            style="border-radius: 50%;"
        /></a>

        <div id="accountName" style="font-weight: 600;">
           profil
        </div>
      </div>
      <div id="motto">
        Jedz gdzie chcesz!
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
            style="border: none; width: 33%; height: 100%;"
            v-model="location"
          />
          </div>
          <div id="zakres">
            <select v-model="price" id="price">
              <option value="" selected disabled >Zakres Cenowy...</option>
              <option value="1">Tanie</option>
              <option value="2">Średnie</option>
              <option value="3">Drogie</option>
              <option value="4">Bardzo drogie</option>
            </select>
          </div>
          <div id="sort">
          <select v-model="sortBy" id="sortBy">
            <option value="" selected disabled>Sortuj po...</option>
            <option value="best_match">Najlepszy traf</option>
            <option value="rating">Oceny</option>
            <option value="review_count">Liczbie recenzji</option>
          </select>
          </div>
          <div id="c"></div>
      </div>
        </div>
      <br />
      <button class="btn btn-search btn-lg" @click="searchByLocation()">
        Szukaj <font-awesome-icon icon="search" />
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
      <div hidden id="loader" class="loader"></div>
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
      price:"" ,
      sortBy:"" ,
      API_key: "Bearer fkbp8a45dtXLiROWZHIh6ruBZVTOtm_oNzqlj2NzfDskFb5HMCFjRBEJgkIgJkv-Q0H7IFkT3LWgzDWoNbjsHnZ5WVECz-Fr5lYhR_hYtE_PAPrrwBNeLgtn-MOmXnYx"
    }
  },
  created(){
        if(this.$root.$data.results){
          this.results = this.$root.$data.results
        }
          firebase.auth().onAuthStateChanged(function (user) {
            document.getElementById("accountName").innerHTML = user.email
              const storageRef = firebase.storage().ref(user.uid + "/avatar/" + "my_avatar")
              storageRef.getDownloadURL().then(function (url) {
                document.getElementById("avatarURL").setAttribute("src", url)
            }).catch(function (error) {
                console.log(error)
            })
          })      
    firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            document.getElementById("login").hidden = true;
            document.getElementById("profile").hidden = false;
            document.getElementById("logout").hidden = false;
        } else {
          document.getElementById("login").hidden = false;
          document.getElementById("profile").hidden = true;
          document.getElementById("logout").hidden = true;
        }
    });
        
  },
      mounted() {
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
      var loader = document.getElementById("loader")
      loader.hidden = false
     
      var app = this
      var url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${this.location}`
      var config = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": this.API_key,
        }
      }
      if(this.price && this.sortBy){
        url = `${url}&price=${this.price}&sort_by=${this.sortBy}`
      } else if (this.price){
        url = `${url}&price=${this.price}`
      }else if (this.sortBy){
        `${url}&sort_by=${this.sortBy}`
      }
      
      fetch(url, { headers: config.headers })
          .then(response => response.json())
          .then(json => app.results = json)
          .then(() => loader.hidden = true)
          .then(() => app.$root.$data.results = app.results)
          .catch(error => console.log(error))
  }
    
  },
};
</script>

<style>
select:required:invalid {
  color: #666;
}
option[value=""][disabled] {
  display: none;
}
option {
  color: #000;
}

#local{
  width:33%;
  float: left;
  border-right: 10px solid rgb(92, 91, 91);
  padding: 12px;
  
}
element.style {
    border: none;
    width: 90%;
    height: 100%;
    text-align: center;
}
#zakres {
    float: none;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-52%, -50%);
    width: 34%;
}
#price {
    height: 50px;
    width: 100%;
    text-align: justify;
    border-right: 4px solid rgb(92, 91, 91);
}
#sort{
  width: 34%;
  float: right;
}
#sortBy{
    height: 48px;
    width: 100%;
    text-align: justify;
    border-left: 1px solid rgb(92, 91, 91);
}
#searchframe {
  width: 76%;
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
  clear: both;
}
@media screen and (max-width: 1200px){
  #searchframe{
    height: 200px;
    width: 50%;
  }
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
#profile:hover{
  cursor:pointer;
}
/* #logout {
  float: left;
  width: 33%;
  margin: auto;
} */
#motto {
  display: inline-block;
  width: 40%;
  font-size: 2.5vw;
  font-weight: 600;
}
@media screen and (max-width: 800px){
  #motto{
    display: inline-block;
    width: 40%;
    font-size: 5vw;
  }
}

/* #logout > a {
  color: rgb(0, 0, 0);
  text-decoration: none;
} */
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
  margin-top: 80px;
  
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

.loader {
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>


