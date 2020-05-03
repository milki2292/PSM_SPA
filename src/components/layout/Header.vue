<template>
    <div id="strip">
        <div @click="goHome" id="foddy"><font-awesome-icon icon="hamburger" />Foddy</div>
        <button @click="logout" id="logout" class="btn btn-search" hidden>
            Wyloguj  <font-awesome-icon icon="sign-out-alt" />
        </button>
        <button @click="goLogin" class="btn btn-search" id="login" hidden>Zaloguj</button>
        <p id="offline" hidden>Jesteś Offline</p>
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
            let app = this
            firebase.auth().signOut()
                .then(function () {
                    app.goHome();
                })
        },
        goLogin() {
            const path = '/Login';
             if (this.$route.path !== path) this.$router.push("/Login");
        },
    },    
    mounted(){
        window.setInterval(() => {
           if(!navigator.onLine){
               document.getElementById("offline").hidden = false
           } else {
               document.getElementById("offline").hidden = true
           }
        }, 1)
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
    @media screen and (max-width: 475px) {
        #offline{
            display: block;
            position: absolute;
            left: 40%;
            right: 40%;
            font-size: 4vw;
            font-weight: 700;
            text-align: center;
        }       
        #logout, #login {
            float: right;
            margin-top: 10px;
            margin-bottom: 5px;
            margin-right: 5px;
            width: 115px;
            text-align: center;
            height: 40px;
        } 
    }
    @media screen and (max-width: 900px) and (min-width: 475px) {
        #offline {
            display: block;
            position: absolute;
            left: 30%;
            right: 30%;
            font-size: 3.5vw;
            font-weight: 700;
            text-align: center;
            padding-top: 1%;
        }
    }
    @media screen and (min-width: 900px){
        #offline {
            display: block;
            position: absolute;
            left: 30%;
            right: 30%;
            font-size: 3vw;
            font-weight: 700;
            text-align: center;
            padding-top: 3px;
        }
    }
    @media screen and (min-width: 1400px){
        #offline {
            display: block;
            position: absolute;
            left: 30%;
            right: 30%;
            font-size: 2vw;
            font-weight: 700;
            text-align: center;
            padding-top: 3px;
        }
    }
    

</style>