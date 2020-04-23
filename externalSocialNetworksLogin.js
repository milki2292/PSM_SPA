var githubProvider = new firebase.auth.GithubAuthProvider();
var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();
var yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');


function externalSighnIn(provider) {
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function (result) {
        var user = result.user;
        console.log(user);
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });
}

button1.addEventListener("click", function() { externalSighnIn(githubProvider)})
button2.addEventListener("click", function() { externalSighnIn(googleProvider)})
button3.addEventListener("click", function() { externalSighnIn(facebookProvider)})
button4.addEventListener("click", function() { externalSighnIn(yahooProvider)})
