<template>
    <div class="login-page d-flex align-items-center">

        <div class="container text-center">

            <h2 class="my-5">Connexion</h2>

            <form @submit.prevent="handleSubmission">

                <div class="form-group col-md-4 mx-auto">
                    <label for="username">Nom d'utilisateur</label>
                    <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                    <div v-show="submitted && !username" class="invalid-feedback">Le nom d'utilisateur est requis.</div>
                </div>

                <div class="form-group col-md-4 mx-auto">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                    <div v-show="submitted && !password" class="invalid-feedback">Un mot de passe est requis.</div>
                </div>

                <div class="form-group col-md-4 mx-auto">
                    <button class="action-button animate blue w-100 mb-3" :disabled="status.loggingIn">Se connecter</button>
                    <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    <router-link to="/register" class="btn btn-link">S'enregistrer</router-link>
                </div>

            </form>

        </div>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Login",
        data: function() {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },
        computed: {
            ...mapState('account', ['status'])
        },
        created () {
            // Reset login status
            this.logout()
        },
        methods: {
            ...mapActions('account', ['login', 'logout']),

            handleSubmission(e) {
                this.submitted = true
                const {username, password} = this

                if (username && password) {
                    this.login({username, password})
                }
            }
        }
    }
</script>

<style scoped>
    .login-page {
        min-height: 100vh;
    }

    button {
        text-align: center;
        margin: auto;
    }
</style>