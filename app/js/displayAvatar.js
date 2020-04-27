firebase.auth().onAuthStateChanged(function (user) {
    storageRef = firebase.storage().ref(user.uid + "/avatar/" + "my_avatar")
    storageRef.getDownloadURL().then(function (url) {
                document.getElementById("avatarURL").setAttribute("src", url)
            }).catch(function (error) {
                console.log(error)
            })
})