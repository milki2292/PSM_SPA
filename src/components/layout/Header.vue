<template>
    <div id="strip">
        <div @click="goHome" id="foddy"><font-awesome-icon icon="hamburger" />Foddy</div>
        <button @click="logout" id="logout" class="btn btn-search">
            Wyloguj  <font-awesome-icon icon="sign-out-alt" />
        </button>
        <button @click="goLogin" class="btn btn-search" id="login">Zaloguj</button>
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    name: 'Header',
    methods:{
        goHome() {
            const path = '/';
            if (this.$route.path !== path) this.$router.push(path);
        },
        logout() {
            let a = this.$router;
            firebase.auth().signOut()
                .then(function () {
                    console.log("logout");
                    this.goHome(a)('/');
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        goLogin() {
            this.$router.push("/Login");
        },
    }
}
</script>

<style>
    #strip {
        width: 100%;
        text-align: center;
        align-items: center;
        background-color: #e04242;
        height: 60px;
        clear:both;
    }
    #foddy {
        font-size: 26px;
        font-weight: 600;
        padding-top: 10px;
        color: white;
        float:left;
        margin-left: 1%;
    }
    #foddy:hover{
        cursor:pointer;
    }
    #logout, #login {
        float: right;
        margin-top: 10px;
        margin-bottom: 5px;
        margin-right: 5px;
        width:150px;
        text-align: center;
        height: 40px;
    }
</style>