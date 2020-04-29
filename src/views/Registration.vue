<template>
  <div class="container">
    <div id="a">
      <img src="../img/foo-ico.png" id="icon" />
      <input type="textfield" id="email" placeholder="Email" />
      <input type="password" id="password" placeholder="Hasło" />
      <input type="password" id="password2" placeholder="Powtórz hasło" />
      <br /><br />
      <button
        @click="register"
        id="savebutton"
        class="btn btn-login btn-lg btn-block"
      >
        Zarejestruj
      </button>
    </div>
    <div id="v1"></div>
    <div id="b">
      <br /><br />
      <button id="button1" class="btn btn-git btn-lg ">
        Zarejestruj z Github <i class="icon-github-circled"></i>
      </button>

      <br /><br />
      <button id="button2" class="btn btn-google btn-lg ">
        Zarejestruj z Google <i class="icon-google"></i>
      </button>

      <br /><br />
      <button id="button3" class="btn btn-fb btn-lg ">
        Zarejestruj z Facebook <i class="icon-facebook-official"></i>
      </button>

      <br /><br />
      <button id="button4" class="btn btn-yahoo btn-lg ">
        Zarejestruj z Yahoo <i class="icon-yahoo"></i>
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
    }
}
</script>

<style scoped></style>
