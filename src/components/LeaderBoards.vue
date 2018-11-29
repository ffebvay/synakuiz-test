<template>
    <div class="leaderboards d-flex align-items-center">

        <div class="container text-center">

            <h2 class="my-5">Classement global</h2>

            <table class="table table-borderless table-hover">

                <thead class="table-active">
                    <tr>
                        <th scope="col">Nom d'utilisateur</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>

                <tbody>
                    <tr scope="row" v-for="user in scores">
                        <td>{{ user.username }}</td>
                        <td>{{ user.score }}</td>
                    </tr>
                </tbody>

            </table>

            <router-link to="/">
                <button class="action-button animate blue w-100 my-4">Retour à l'accueil</button>
            </router-link>

        </div>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "LeaderBoards",
        data: function() {
            return {
                scores: []
            }
        },
        created: function() {
            axios
                .get('https://biogen-demo.firebaseio.com/score.json')
                .then((response) => {
                    let array = []
                    for (let item in response.data)
                        array.push(response.data[item])

                    // Sort the array items so that it shows a certain "ranking" style
                    this.scores = array.sort((a, b) => a.score < b.score ? 1 : -1)
                    console.log(this.scores)
                })
                .catch((error) => {
                    console.log('Could not fetch data... Original error: ', error)
                })
        }
    }
</script>

<style scoped>
    .leaderboards {
        min-height: 100vh;
    }

    a, button {
        font-size: 4vw;
        text-align: center;
        margin: auto;
    }
</style>