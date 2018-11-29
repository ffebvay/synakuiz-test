<template>
    <div class="user-profile-control my-auto ml-auto">

        <router-link :to="{ name: 'user-avatar' }" class="btn btn-link">Mon Espace</router-link>

    </div>
</template>

<script>
    export default {
        name: "UserProfileControl"
    }
</script>

<style scoped>
    .user-profile-control {
        right: 0;
    }

    a {
        color: #fff;
    }

    a:hover {
        color: #aaa;
    }
</style>