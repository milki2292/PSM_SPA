<template>
  <div id="app">
    <Header />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
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
body{
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
