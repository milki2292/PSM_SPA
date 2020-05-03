<template>
  <div>
    <div>
      <div id="likeContainer" hidden>
        <button @click="like()" id="giveLike" class="like-btn btn"><font-awesome-icon id="thumbsUp" :icon="['far', 'thumbs-up']" />Like</button>
        <p id="likeCounter">{{likes}} <font-awesome-icon id="thumbsUp" icon="thumbs-up" /></p>
      </div>
      <div class="container">
        <div id="motto">
          Jedz gdzie chcesz!
        </div>
        <div id="profile" hidden>
          <a @click="goUser" style="text-decoration: none;"
            ><img
              id="avatarURL"
              src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png"
              style="border-radius: 50%;object-fit: cover;height: 120px; width: 120px;"
          /></a>

          

          <div id="accountName" style="font-weight: 600;">
            profil
          </div>
        </div>
        
        <div id="c"></div>
        <br />
        <div id="searchframe">
          <div id="search">
            <div id="local">
            <font-awesome-icon icon="search" />
            <input
              type="text"
              placeholder=" Lokalizacja"
              style="border: none; width: 90%; height: 100%;"
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
            <div class="c"></div>
        </div>
          </div>
        <br />
        <button class="btn btn-search btn-lg" @click="searchByLocation()">
          Szukaj <font-awesome-icon icon="search" />
        </button>
        <br><br>
        <div hidden id="loader" class="loader"></div>
        <div @click="goRestaurant(restaurant.id)" v-bind:key="restaurant.id" v-for="restaurant in results.businesses" class="restaurants">
            <div class="res-name">{{ restaurant.name }}<br>
                {{ restaurant.location.city }}, {{ restaurant.location.address1 }}
            </div>
            <div class="res-title">{{restaurant.categories[0].title}}</div> 
            <div class="res-img">
                <img v-bind:src="restaurant.image_url" width="100%" height="100%"/>
            </div>
            <div class="c"></div>
        </div>
        
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
      db: firebase.firestore(),
      likes: 0,
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
          if(user){
            document.getElementById("accountName").innerHTML = user.email
              const storageRef = firebase.storage().ref(user.uid + "/avatar/" + "my_avatar")
              storageRef.getDownloadURL().then(function (url) {
                document.getElementById("avatarURL").setAttribute("src", url)
            })
          }      
        })
          
        var app = this      
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            app.checkIfIGiveLike();
            document.getElementById("login").hidden = true;
            document.getElementById("profile").hidden = false;
            document.getElementById("logout").hidden = false;
            document.getElementById("likeContainer").hidden = false;
        } else {
          document.getElementById("login").hidden = false;
          document.getElementById("profile").hidden = true;
          document.getElementById("logout").hidden = true;
          document.getElementById("likeContainer").hidden = true;


        }
    });

        
  },
      mounted() {
        window.setInterval(() => {
        this.displayLikes()
      },1 )
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
    searchByLocation: function () {
      var loader = document.getElementById("loader")
      loader.hidden = false
     
      var url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${this.location}`
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

      var app = this
      
      fetch(url, { headers: config.headers })
          .then(response => response.json())
          .then(json => app.results = json)
          .then(() => loader.hidden = true)
          .then(() => app.$root.$data.results = app.results)
  },
  displayLikes(){
    this.db.collection('likes').get().then(
    snapshot => {
      let counter = 0
      snapshot.forEach(() => {
        counter += 1
      })
      this.likes = counter
    }
);
  },
  like(){
    document.getElementById("giveLike").disabled = true
    var app = this
    firebase.auth().onAuthStateChanged(function(user) {
      app.db.collection("likes").doc(user.uid).set({
      like: true,
    }) 
});
  },
  checkIfIGiveLike(){
    let app = this
    firebase.auth().onAuthStateChanged(function(user) {
      app.db.collection("likes").doc(user.uid).get().then(function(doc){
        if(doc.exists){
          document.getElementById("giveLike").disabled = true
          document.getElementById("giveLike").innerHTML ="Liked!"
        }
      })
     })
  }
    
  },
};
</script>

<style>
#likeContainer{
    margin: 7px;
    padding-bottom: 20px;
}
.like-btn{
  float: left;
  width: auto;
  background-color: hsl(0, 0%, 39%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
}
.like-btn:hover{
  float: left;
  width: auto;
  background-color: hsl(0, 73%, 58%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
}
.like-btn:disabled{
  float: left;
  width: auto;
  background-color: hsl(0, 0%, 39%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
}
#likeCounter{    
  float: left;
  padding-top: 6px;
  margin: auto;
  margin-left: 15px;
  font-weight: 600;
  font-size: 10;
}
#loader {
  display: inline-block;
}
select:required:invalid {
  color: #666;
}
option[value=""][disabled] {
  display: none;
}
option {
  color: #000;
}
@media screen and (min-width: 1200px) {
  #motto {
    display: inline-block;
    width: 100%;
    font-size: 4vw;
    font-weight: 600;
  }
  #local{
    width:33%;
    float: left;
    border-right: 10px solid rgb(92, 91, 91);
    padding: 12px;
    
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
}
@media screen and (max-width: 1200px){
  #motto{
    display: inline-block;
    width: 100%;
    font-size: 6.5vw;
    font-weight: 600;
  }
  #searchframe {
    height: 150px;
    width: 70%;
    margin: auto;
    position: relative;    
    background-color: rgb(92, 100, 100);
}
  #search {
    background-color: white;
    margin: auto;
    width: 96%;
    height: 93%;
    overflow: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    clear: both;
}
  #local {
    width: 100%;
    height: 33%;
    border-bottom: 5px solid rgb(92, 91, 91);
    padding: 0px;
}  
  #zakres {
    float: left;
    height: 33%;
    width: 100%;
  }
  #price {
    height: 100%;
    width: 100%;
    text-align: justify;
    border-bottom: 5px solid rgb(92, 91, 91);
  }
  #sort {
    height: 35%;
    width: 100%;
  } 
  #sortBy {
    height: 100%;
    width: 100%;
    text-align: justify;
  }
}

.container {
  width: 100%;
  align-content: center;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 10px;
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
  padding-top: 20px;
}
#profile:hover{
  cursor:pointer;
}

input:focus {
  outline: none;
}
.restaurants {
  background-color: white;
  border-style: solid;
  border-width: 1px;
  margin-top: 15px;
  box-shadow: 10px 10px 16px -7px rgba(148, 138, 148, 1);
  height: auto;
}
.restaurants:hover{
  background-color: #e04242;
  cursor: pointer;
}
.res-title {
    float: left;
    font-size: 2.8vmin;
    width: 19%;
    margin-top: 5%;
}
.res-name {
    float: left;
    font-size: 2.8vmin;
    font-weight:700;
    width: 54%;
    height: 100%;
    margin-top:5%;
}
.res-img {
    float: right;
    width: 25%;
    height: 13vw;
}
.res-img > img{
object-fit: cover;
}

.restaurants > a {
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

@media screen and (max-width: 1000px){
  #v1 {
    display:none;
  }
  #v2{
    height:500px;
    float:left;
    width: 1%;
  }

}
@media screen and (max-width: 770px){
 #a {
    float: none;
}
 #b{
   float:none;
 }
 #v2{
   display: none;
 }
}
#email {
  margin-top: 100px;
  width: 295px;
  border: none;
  border-bottom: 2px solid grey;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 24px;
}
#password {
  width: 295px;
  border: none;
  border-bottom: 2px solid grey;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 24px;
}
#password2 {
  width: 295px;
  border: none;
  border-bottom: 2px solid grey;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 24px;
}

#v1 {
  width: 2%;
  border-right: 1px solid rgb(59, 57, 57);
  height: 500px;
  float: left;
  left: 48%;
  margin-top: 30px;
  margin-right: 17px;
}
@media screen and (min-width: 770px) {
  
  #a {
    align-items: center;
    text-align: center;
    width: 45%;
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
}
.c {
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
  border: 10px solid #f3f3f3;
  border-top: 10px solid #e04242;
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


