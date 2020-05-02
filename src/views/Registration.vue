<template>
  <div class="container">
    <div id="a">
      <div class="rejestracjaAwatar"><font-awesome-icon icon="hamburger" />Rejestracja</div>
      <input type="textfield" id="email" placeholder="Email" />
      <input type="password" id="password" placeholder="Hasło" />
      <input type="password" id="password2" placeholder="Powtórz hasło" />
      <br /><br />
      <button
        @click="register"
        id="savebutton"
        class="btn btn-login btn-lg"
      >
        Zarejestruj
      </button>
    </div>
    <div id="v1"></div>
    <div id="b">
      <br /><br />
      <button @click="loginGithub" id="button1" class="btn btn-git btn-lg ">
        Zarejestruj z Github <font-awesome-icon :icon="['fab', 'github']" />
      </button>

      <br /><br />
      <button @click="loginGoogle" id="button2" class="btn btn-google btn-lg ">
        Zarejestruj z Google <font-awesome-icon :icon="['fab', 'google']" />
      </button>

      <br /><br />
      <button @click="loginFacebook" id="button3" class="btn btn-fb btn-lg ">
        Zarejestruj z Facebook <font-awesome-icon :icon="['fab', 'facebook']" />
      </button>

      <br /><br />
      <button @click="loginYahoo" id="button4" class="btn btn-yahoo btn-lg ">
        Zarejestruj z Yahoo <font-awesome-icon :icon="['fab', 'yahoo']" />
      </button>
    </div>
    <div id="c"></div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
    name: "Registration",
    mounted(){
        var home = this.$router
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                home.push('/');
            }
        });
    },
    methods:{
        register(){
            const email = document.getElementById("email").value
            const password = document.getElementById("password").value
            const password2 = document.getElementById("password2").value

            if (password != password2) {
                alert("hasła są różne")
            }
            else {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(function () {
                       alert("zalogowano")
                    })
                    .catch(function (error) {
                        console.log(error.code);
                        console.log(error.message);
                    });
            }
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
                    console.log(error);
                });
        }
    }
}
</script>

<style scoped>
.rejestracjaAwatar{
        width:192px;
        margin:0 auto;
        font-size: 32px;
        padding-top:20px;
    }
#b{
  margin-top:50px;
}
</style>
