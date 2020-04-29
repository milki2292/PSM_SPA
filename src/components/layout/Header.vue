<template>
    <div id="strip">
            <div id="foddy"><i class="icon-fast-food"></i>Foddy</div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
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