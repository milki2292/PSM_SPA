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

</style>
