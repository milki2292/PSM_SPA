<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/layout/Header'
import * as firebase from "./js/firebase.js";

export default {
  name: 'app',
  data(){
    return{
      fb: firebase
    }
  },
  components: {
    Header,
  },  
}
</script>

<style>
body::after {
  content: "";
  background: url(https://source.unsplash.com/random/1600x900/?food);
  opacity: 0.4;
  position: fixed; 
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
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
.btn-search2 {
  background-color: hsl(0, 0%, 39%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
  width: 200px;
  height: 50px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-search2:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.active,
.open .dropdown-toggle.btn-danger {
  background-color: hsl(0, 73%, 58%) !important;
  background-repeat: repeat-x;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-search3 {
  background-color: hsl(0, 0%, 39%) !important;
  background-repeat: repeat-x;
  color: #fff !important;
  width: 200px;
  height: 50px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-search3:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.active,
.open .dropdown-toggle.btn-danger {
  background-color: hsl(0, 73%, 58%) !important;
  background-repeat: repeat-x;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
