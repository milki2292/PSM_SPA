<template>
    <div>
        <h1>User</h1>
        <br>
        <img id="avatarURL" src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png" width="200"
            height="200">
        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">

        <br>
        <br>
        <h4>Zmien email</h4>
        <input type="textfield" id="newEmail" placeholder="New Email" />
        <button id="emailBtn" class="btn btn-login btn-lg btn-block">Zmien</button>

        <h4>Zmien hasło</h4>
        <input type="textfield" id="newPass" placeholder="New Password" />
        <button id="passBtn" class="btn btn-login btn-lg btn-block">Zmien</button>

        <br>
        <br>
        <br>
        <br>
        <input type="textfield" id="confirmPassEmail" placeholder="Password" hidden />
        <button id="confirmPassEmailBtn" class="btn btn-login btn-lg btn-block" hidden>Zatwierdź</button>

        <input type="textfield" id="confirmPassPass" placeholder="Password" hidden />
        <button id="confirmPassPassBtn" class="btn btn-login btn-lg btn-block" hidden>Zatwierdź</button>
    </div>
</template>