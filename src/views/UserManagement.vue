<template>
  <div class="container">
    <img
      id="avatarURL"
      src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png"
      width="200"
      height="200"
      style="border-radius: 50%;"
    />
    <div>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
      />
    </div>
    <br />
    <h4>Zmien email</h4>
    <div>
      <input
        style="font-size:25px; width:300px"
        type="textfield"
        id="newEmail"
        placeholder="New Email"
      />
      <br />
      <br />
      <button
        style="margin:auto"
        @click="changeEmail"
        id="emailBtn"
        class="btn btn-login btn-lg btn-block"
      >
        Zmien
      </button>
      <br />
    </div>
    <div>
      <h4>Zmien hasło</h4>
      <input
        style="font-size:25px; width:300px"
        type="textfield"
        id="newPass"
        placeholder="New Password"
      />
      <br />
      <br />
      <button
        style="margin:auto"
        @click="changePassword"
        id="passBtn"
        class="btn btn-login btn-lg btn-block"
      >
        Zmien
      </button>
    </div>
    <br />
    <br />
    <br />
    <br />
    <input
      type="textfield"
      id="confirmPassEmail"
      placeholder="Password"
      hidden
    />
    <button
      @click="changeEmailReauthenticate"
      id="confirmPassEmailBtn"
      class="btn btn-login btn-lg btn-block"
      hidden
    >
      Zatwierdź
    </button>

    <input
      type="textfield"
      id="confirmPassPass"
      placeholder="Password"
      hidden
    />
    <button
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
      const storageRef = firebase
        .storage()
        .ref(user.uid + "/avatar/" + "my_avatar");
      storageRef
        .getDownloadURL()
        .then(function(url) {
          document.getElementById("avatarURL").setAttribute("src", url);
        })
        .catch(function(error) {
          console.log(error);
        });
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
            .catch(function(error) {
              console.log(error);
            });
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
          .catch(function(error) {
            console.log(error);

            document.getElementById("confirmPassEmail").hidden = false;
            document.getElementById("confirmPassEmailBtn").hidden = false;
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
                alert("Email changed");
              })
              .catch(function(error) {
                console.log(error);
              });
          })
          .catch(function(error) {
            console.log(error);
          });
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
          .catch(function(error) {
            console.log(error);

            document.getElementById("confirmPassPass").hidden = false;
            document.getElementById("confirmPassPassBtn").hidden = false;
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
                alert("Password changed");
              })
              .catch(function(error) {
                console.log(error);
              });
          })
          .catch(function(error) {
            console.log(error);
          });
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
