<template>
  <div>
    <div class="container">
      <div id="profile">
        <a href="./user.html" style="text-decoration: none;"
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
          <i class="icon-search"></i>
          <input
            type="text"
            placeholder="Szukaj Restauracji"
            style="border: none; width: 270px; height: 100%;"
            v-model="location"
          />
        </div>
      </div>
      <br />
      <button class="btn btn-search btn-lg" v-on:click="searchByLocation()">
        Szukaj<i class="icon-search"></i>
      </button>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Home",
  methods: {
    goLogin() {
      this.$router.push("/Login");
    },
    goRegistration() {
      this.$router.push("/Registration");
    },
    logout() {
    firebase.auth().signOut()
        .then(function () {
            console.log("logout")
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    
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
};
</script>

<style>
body::after {
  content: "";
  background: url(../img/bground-pizza.jpg);
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
  font-size: 30px;
}
a:link {
  color: rgb(0, 0, 0);
  text-decoration: none;
}

#logout > a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
#searchframe {
  width: 350px;
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
  height: 210px;
}
#res-name {
  float: left;
  padding-top: 72px;
  padding-bottom: 72px;
  font-size: 22;
  width: 60%;
}
#res-title {
  float: left;
  font-size: 22;
  width: 15%;
  padding-top: 72px;
}
#res-img {
  float: right;
  width: 25%;
  padding-top: 10px;
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
.container {
  width: 100%;
  align-content: center;
  align-items: center;
  text-align: center;
  margin-top: 50px;
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
  width: 300;
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
