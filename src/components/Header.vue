<template>
    <div class="biogen-header">

        <div id="img-container" class="my-auto mb-auto">
            <router-link to="/"><img alt="BIOGEN Logo" src="../assets/logos-02.png"></router-link>
        </div>

        <!-- User Profile button displayed only if user is logged in -->
        <UserProfile v-if="currentRoute"/>

        <!-- Logout button displayed only if user is logged in -->
        <Logout v-if="currentRoute"/>

    </div>
</template>

<script>
    import Logout from './LogoutControl'
    import UserProfile from './UserProfileControl'

    export default {
        name: "Header",
        components: {
            Logout,
            UserProfile
        },
        computed: {
            currentRoute() {
                if (this.$route.path === '/login') {
                    return false;
                } else if (this.$route.path === '/register') {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
</script>

<style scoped>
    .biogen-header {
        width: 100%;
        height: 56px;
        color: #FFF;
        background: #47789d;
        position: fixed;
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 9px 1px rgba(0, 0, 0, 0.12), 0 4px 2px -2px rgba(0, 0, 0, 0.2);
        will-change: transform;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-flex-wrap: nowrap;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        -webkit-box-pack: start;
        -webkit-justify-content: flex-start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: stretch;
        -webkit-align-items: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        -webkit-align-content: center;
        -ms-flex-line-pack: center;
        align-content: center;
        -webkit-transition: -webkit-transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
        transition: -webkit-transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
        transition: transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
        transition: transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s, -webkit-transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
        z-index: 1000;
    }

    img {
        max-height: 5vh;
        margin: 0;
    }
</style>