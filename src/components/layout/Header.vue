<template>
    <div id="strip">
            <div @click="goHome" id="foddy"><font-awesome-icon icon="hamburger" />Foddy</div>
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