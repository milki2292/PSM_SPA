<template>
    <div class="container">
        <div id="a">
            <img src="../img/foo-ico.png" id="icon">
            <h4></h4>
            <input type="textfield" id="email" placeholder="Email" />
            <h4></h4>
            <input type="password" id="password" placeholder="Hasło" />
            <br><br>
            <button @click="login" id="loginbutton" class="btn btn-login btn-lg btn-block">Zaloguj</button>
        </div>
        <div id="v1"></div>
        <div id="b">
            <br><br>
            <button id="button1" class="btn btn-git btn-lg ">Zaloguj z Github <i class="icon-github-circled"></i>
            </button>
            <br><br>
            <button id="button2" class="btn btn-google btn-lg ">Zaloguj z Google <i class="icon-google"></i></button>
            <br><br>
            <button id="button3" class="btn btn-fb btn-lg ">Zaloguj z Facebook <i
                    class="icon-facebook-official"></i></button>
            <br><br>
            <button id="button4" class="btn btn-yahoo btn-lg ">Zaloguj z Yahoo <i class="icon-yahoo"></i></button>
            <br><br>


            <div id="text1">Nie masz konta?</div>

            <a @click="goRegistration" style="text-decoration: none;"><button
                    class="btn btn-login btn-lg ">Zarejestruj</button></a>
        </div>
        <div id="c"></div>
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    name: 'Login',
        mounted(){
            var home = this.$router
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    home.push('/');
                }
            });
        },
    methods: {
        goRegistration(){
            var home = this.$router
            home.push('/Registration');
        },
        login(){    
            const email = document.getElementById("email").value
            const password = document.getElementById("password").value

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function () {
                    alert("zalogowano")
                })
                .catch(function (error) {
                    console.log(error.code);
                    console.log(error.message);
                });
        }
    }
}

</script>

<style scoped>

</style>