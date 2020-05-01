<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/layout/Header'
import firebase from "./js/firebase.js";

export default {
  name: 'app',
  components: {
    Header,
  },
  methods:{
     mounted(){
         firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                document.getElementById("login").hidden = true
                document.getElementById("register").hidden = true
                document.getElementById("profile").hidden = false
                document.getElementById("logout").hidden = false


            }
            else {
                document.getElementById("login").hidden = false
                document.getElementById("register").hidden = false
                document.getElementById("profile").hidden = true
                document.getElementById("logout").hidden = true
            }
        });
      }
  }
  
}
</script>

<style>
body {
  content: "";
  background: url(./img/bground-pizza.jpg);
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
</style>
