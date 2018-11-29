<template>
    <div class="logout-control my-auto ml-auto">

        <router-link to="/login" class="btn btn-link">Déconnexion</router-link>

    </div>
</template>

<script>
    export default {
        name: "Logout"
    }
</script>

<style scoped>
    .logout-control {
        right: 0;
    }

    a {
        color: #fff;
    }

    a:hover {
        color: #aaa;
    }
</style>