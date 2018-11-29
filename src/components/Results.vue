<template>
    <div class="results d-flex align-items-center">

        <div class="card w-75 animated bounce text-center py-4 mb-3 mx-auto">

            <!-- Display the ScoreChart component -->
            <ScoreChart />

            <div class="container">

                <router-link to="/">
                    <button class="action-button animate blue w-100 my-4">Retour à l'accueil</button>
                </router-link>

            </div>

        </div>

    </div>
</template>

<script>
    import ScoreChart from "./ScoreChart"

    import { mapState } from 'vuex'
    import axios from 'axios'

    export default {
        name: "Results",
        components: {ScoreChart},
        data: function() {
            return {
                upload: {
                    username: '',
                    score: ''
                }
            }
        },
        computed: {
            ...mapState({
                account: state => state.account
            })
        },
        created: function() {
          this.upload.username = this.account.user.username
          this.upload.score = this.$store.getters.getScore
          this.sendData()
        },
        methods: {
            sendData: function() {
                console.log(this.upload)
                var router = this.$router

                axios
                    .post('https://biogen-demo.firebaseio.com/score.json', this.upload)
                    .then(function(response) {
                        console.log(response)
                    })
                    .catch(function(error) {
                        console.log("Can't send data... Original error: ", error)
                    })
            }
        }
    }
</script>

<style scoped>
    .results {
        min-height: 100vh;
    }

    a, button {
        font-size: 4vw;
        text-align: center;
        margin: auto;
    }
</style>