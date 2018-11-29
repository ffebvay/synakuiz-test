<template>
    <div class="user-avatar">

        <!-- <img :src="account.user.avatar"/> -->
        <img src="../assets/avatars/Avatar-Base_V4.png"/>

    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "UserAvatar",
        computed: {
            ...mapState({
                account: state => state.account
            })
        }
    }
</script>

<style scoped>
    img {
        max-height: 300px;
    }
</style>