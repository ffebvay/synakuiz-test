<template>
    <div class="profile-page">
        <div clas="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">

                        <!-- Only get username at the top of the user profile page -->
                        <h4>{{ account.user.username }}</h4>

                        <hr />

                    </div>
                </div>
            </div>

            <div class="container mb-5">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">

                                <router-link
                                        class="nav-link"
                                        active-class="active"
                                        exact
                                        :to="{ name: 'user-avatar' }">
                                    Mon avatar
                                </router-link>

                            </li>

                            <li class="nav-item">

                                <router-link
                                        class="nav-link"
                                        active-class="active"
                                        exact
                                        :to="{ name: 'user-scores' }">
                                    Détails du score
                                </router-link>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Display corresponding page below -->
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "UserProfile",
        computed: {
            ...mapState({
                account: state => state.account
            })
        }
    }
</script>

<style scoped>
    .profile-page {
        min-height: 100vh;
    }
</style>