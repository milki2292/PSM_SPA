<template>
    <div class="container">
        <div id="a">
            <div class="logowanieAwatar"><font-awesome-icon icon="hamburger" />Logowanie</div>
            <h4></h4>
            <input type="textfield" id="email" placeholder="Email" />
            <h4></h4>
            <input type="password" id="password" placeholder="Hasło" />
            <br><br>
            <button @click="login" id="loginbutton" class="btn btn-login btn-lg ">Zaloguj</button>
        </div>
        <div id="v1"></div>
        <div id="v2"></div>
        <div id="b">
            <br><br>
            <button @click="loginGithub" id="button1" class="btn btn-git btn-lg ">Zaloguj z Github <font-awesome-icon :icon="['fab', 'github']" />
            </button>
            <br><br>
            <button @click="loginGoogle" id="button2" class="btn btn-google btn-lg ">Zaloguj z Google <font-awesome-icon :icon="['fab', 'google']" /></button>
            <br><br>
            <button @click="loginFacebook" id="button3" class="btn btn-fb btn-lg ">Zaloguj z Facebook <font-awesome-icon :icon="['fab', 'facebook']" /></button>
            <br><br>
            <button @click="loginYahoo" id="button4" class="btn btn-yahoo btn-lg ">Zaloguj z Yahoo <font-awesome-icon :icon="['fab', 'yahoo']" /></button>
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
        },
        loginGithub(){
            var githubProvider = new firebase.auth.GithubAuthProvider();
            this.externalSighnIn(githubProvider)
        },
        loginGoogle(){
            var googleProvider = new firebase.auth.GoogleAuthProvider();
            this.externalSighnIn(googleProvider)
        },
        loginFacebook(){
            var facebookProvider = new firebase.auth.FacebookAuthProvider();
            this.externalSighnIn(facebookProvider)
        },
        loginYahoo(){
            var yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');
            this.externalSighnIn(yahooProvider)
        },
        externalSighnIn(provider){
            firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult().then(function (result) {
                var user = result.user;
                console.log(user);
                }).catch(function (error) {
                    console.log(error)
                });
        }

    }
}

</script>

<style scoped>
    .logowanieAwatar{
        width:192px;
        margin:0 auto;
        font-size: 32px;
        padding-top:100px;
    }
</style>