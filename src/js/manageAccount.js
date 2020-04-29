// Email

emailBtn.addEventListener("click", function () {
    const newEmail = document.getElementById("newEmail").value
    firebase.auth().onAuthStateChanged(function (user) {
        user.updateEmail(newEmail).then(function () {
            alert("Email changed")
        }).catch(function (error) {

            console.log(error)

            document.getElementById("confirmPassEmail").hidden = false
            document.getElementById("confirmPassEmailBtn").hidden = false

        });
    })
})



confirmPassEmailBtn.addEventListener("click", function () {
    firebase.auth().onAuthStateChanged(function (user) {
        const passAgain = document.getElementById("confirmPassEmail").value
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            passAgain
        );
        user.reauthenticateWithCredential(credential).then(function () {
            const newEmail = document.getElementById("newEmail").value
            user.updateEmail(newEmail).then(function () {

                document.getElementById("confirmPassEmail").hidden = true
                document.getElementById("confirmPassEmailBtn").hidden = true

                alert("Email changed")
            }).catch(function (error) {

                console.log(error)

            });
        }).catch(function (error) {
            console.log(error)

        })
    });

})

// Password

passBtn.addEventListener("click", function () {
    const newPass = document.getElementById("newPass").value
    firebase.auth().onAuthStateChanged(function (user) {
        user.updatePassword(newPass).then(function () {
            alert("Password changed")
        }).catch(function (error) {

            console.log(error)

            document.getElementById("confirmPassPass").hidden = false
            document.getElementById("confirmPassPassBtn").hidden = false

        });
    })
})

confirmPassPassBtn.addEventListener("click", function () {
    firebase.auth().onAuthStateChanged(function (user) {
        const passAgain = document.getElementById("confirmPassPass").value
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            passAgain
        );
        user.reauthenticateWithCredential(credential).then(function () {
            const newEmail = document.getElementById("newPass").value
            user.updatePassword(newEmail).then(function () {

                document.getElementById("confirmPassPass").hidden = true
                document.getElementById("confirmPassPassBtn").hidden = true

                alert("Password changed")
            }).catch(function (error) {

                console.log(error)

            });
        }).catch(function (error) {
            console.log(error)

        })
    });

})

// Avatar

var fileButton = document.getElementById("avatar")

fileButton.addEventListener("change", function (e) {
    var file = e.target.files[0]

    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = firebase.storage().ref(user.uid + "/avatar/" + "my_avatar")
        storageRef.put(file).then(function () {
            storageRef.getDownloadURL().then(function (url) {
                document.getElementById("avatarURL").setAttribute("src", url)
            }).catch(function (error) {
                console.log(error)
            })

        })

    })
})