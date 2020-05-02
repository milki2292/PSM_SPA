<template>
    <div id="strip">
        <div @click="goBack" id="foddy"><font-awesome-icon icon="hamburger" />Foddy</div>
        <p id="offline" hidden>offline</p>
    </div>
</template>

<script>

export default {
    name: 'Header',

    methods:{
        goHome() {
            const path = '/';
            if (this.$route.path !== path) this.$router.push(path);
        },  
        goBack(){
            this.$router.go(-1)
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
        text-align: center;
        align-items: center;
        background-color: #e04242;
        height: 60px;
    }
    #foddy {
        font-size: 26px;
        font-weight: 600;
        padding-top: 10px;
        color: white;
    }
    .icon-fast-food:before { 
        content: '\e815'; 
    }
</style>