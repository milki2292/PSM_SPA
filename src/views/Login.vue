<template>
    <div class="container">
        <div id="a">
            <div class="loginAvatar"><font-awesome-icon icon="hamburger" />Logowanie</div>
            <h4></h4>
            <h4 id="invalidLoginPrompt" style="color:red; margin-top:100px;" hidden>Błędny Login i/lub Hasło...</h4>
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
                .catch(function () {
                    document.getElementById("invalidLoginPrompt").hidden = false;
                    document.getElementById("email").style.marginTop = "10px";
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
        externalSighnIn(provider){
            firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult()
        }

    }
}

</script>

<style scoped>
    .loginAvatar{
        width:70%;
        margin:0 auto;
        font-size: 32px;
        padding-top:100px;
    }
</style>