<template>
    <div>
        <h1>User</h1>
        <br>
        <img id="avatarURL" src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png" width="200"
            height="200">
        <button @click="goManagement">Zarządzaj Kontem</button>
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

</style>