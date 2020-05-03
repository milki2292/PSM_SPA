<template>
  <div class="container">
    <img
      id="avatarURL"
      src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png"
      width="200"
      height="200"
      style="border-radius: 50%;object-fit: cover;height: 200px;width: 200px;"
    />
      <div id="accountName" style="font-weight: 600;">
           profil
      </div>  
    <h4>Zmień Awatar</h4>
    <div>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
      />
    </div>
    <br />
    <h4 id="reenterOldPassword" style="color:red; margin-top:10px; margin-bottom:20px;" hidden>Ponownie wpisz dotychczasowe hasło.</h4>
    <h4>Zmień adres e-mail</h4>
    <div>
      <input
        style="font-size:25px; width:300px"
        type="textfield"
        id="newEmail"
        placeholder="Nowy adres e-mail"
      />
      <br />
      <br />
      <button
        style="margin:auto"
        @click="changeEmail"
        id="emailBtn"
        class="btn btn-login btn-lg btn-block"
      >
        Zmień
      </button>
      <br />
    </div>
    <div>
      <h4>Zmień Hasło</h4>
      <input
        style="font-size:25px; width:300px"
        type="textfield"
        id="newPass"
        placeholder="Nowe Hasło"
      />
      <br />
      <br />
      <button
        style="margin:auto"
        @click="changePassword"
        id="passBtn"
        class="btn btn-login btn-lg btn-block"
      >
        Zmień
      </button>
    </div>
    <br />
    <br />
    <br />
    
    <input
      style="font-size:25px; width:300px; margin-top:30px;"
      type="textfield"
      id="confirmPassEmail"
      placeholder="Wpisz obecne Hasło"
      hidden
    />
      <br />
      <br />
    <button
      style="margin:auto"
      @click="changeEmailReauthenticate"
      id="confirmPassEmailBtn"
      class="btn btn-login btn-lg btn-block"
      hidden
    >
      Zatwierdź
    </button>

    <input
      style="font-size:25px; width:300px"
      type="textfield"
      id="confirmPassPass"
      placeholder="Wpisz obecne Hasło"
      hidden
    />
      <br />
      <br />
    <button
      style="margin:auto"
      @click="changePasswordReauthenticate"
      id="confirmPassPassBtn"
      class="btn btn-login btn-lg btn-block"
      hidden
    >
      Zatwierdź
    </button>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "UserManagement",
  created() {
    firebase.auth().onAuthStateChanged(function(user) {
      document.getElementById("accountName").innerHTML = user.email
      const storageRef = firebase
        .storage()
        .ref(user.uid + "/avatar/" + "my_avatar");
      storageRef
        .getDownloadURL()
        .then(function(url) {
          document.getElementById("avatarURL").setAttribute("src", url);
        })
    });
  },
  mounted() {
    var fileButton = document.getElementById("avatar");

    fileButton.addEventListener("change", function(e) {
      var file = e.target.files[0];

      firebase.auth().onAuthStateChanged(function(user) {
        var storageRef = firebase
          .storage()
          .ref(user.uid + "/avatar/" + "my_avatar");
        storageRef.put(file).then(function() {
          storageRef
            .getDownloadURL()
            .then(function(url) {
              document.getElementById("avatarURL").setAttribute("src", url);
            })
        });
      });
    });
  },
  methods: {
    changeEmail() {
      const newEmail = document.getElementById("newEmail").value;
      firebase.auth().onAuthStateChanged(function(user) {
        user
          .updateEmail(newEmail)
          .then(function() {
            alert("Email changed");
          })
          .catch(function() {
            document.getElementById("confirmPassEmail").hidden = false;
            document.getElementById("confirmPassEmailBtn").hidden = false;
            document.getElementById("reenterOldPassword").hidden = false;
          });
      });
    },
    changeEmailReauthenticate() {
      firebase.auth().onAuthStateChanged(function(user) {
        const passAgain = document.getElementById("confirmPassEmail").value;
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          passAgain
        );
        user
          .reauthenticateWithCredential(credential)
          .then(function() {
            const newEmail = document.getElementById("newEmail").value;
            user
              .updateEmail(newEmail)
              .then(function() {
                document.getElementById("confirmPassEmail").hidden = true;
                document.getElementById("confirmPassEmailBtn").hidden = true;
                document.getElementById("reenterOldPassword").hidden = true;
                alert("Email changed");
              })
          })
      });
    },
    changePassword() {
      const newPass = document.getElementById("newPass").value;
      firebase.auth().onAuthStateChanged(function(user) {
        user
          .updatePassword(newPass)
          .then(function() {
            alert("Password changed");
          })
          .catch(function() {
            document.getElementById("confirmPassPass").hidden = false;
            document.getElementById("confirmPassPassBtn").hidden = false;
            document.getElementById("reenterOldPassword").hidden = false;
          });
      });
    },
    changePasswordReauthenticate() {
      firebase.auth().onAuthStateChanged(function(user) {
        const passAgain = document.getElementById("confirmPassPass").value;
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          passAgain
        );
        user
          .reauthenticateWithCredential(credential)
          .then(function() {
            const newEmail = document.getElementById("newPass").value;
            user
              .updatePassword(newEmail)
              .then(function() {
                document.getElementById("confirmPassPass").hidden = true;
                document.getElementById("confirmPassPassBtn").hidden = true;
                document.getElementById("reenterOldPassword").hidden = true;
                alert("Password changed");
              })
          })
      });
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  align-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
}
</style>
