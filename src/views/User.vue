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
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    name:"Users",
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
</style>