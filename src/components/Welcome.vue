<template>
  <div class="welcome d-flex align-items-center">

    <div class="container text-center">

      <h1>Bonjour {{ account.user.firstName }}.</h1>

      <div class="w-50 mx-auto" id="btn-container">

        <button class="action-button animate green w-100 mb-3" v-on:click="getQuestions">
          Jouer
        </button>

        <router-link to="/leaderboards">
          <button class="action-button animate green w-100 mx-auto">Classement</button>
        </router-link>

      </div>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Welcome',
  computed: {
      ...mapState({
          account: state => state.account
      })
  },
  methods: {
      getQuestions() {
          var router = this.$router
          this.$store.dispatch('getQuestions')
              .then(function(response) {
                  console.log("Request was sent successfully ! Server response: ", response)
                  router.push({name: 'game'})
              })
              .catch(function(error) {
                  console.log("Request was rejected... Original error: ", error)
              })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .welcome {
    min-height: 100vh;
  }

  h1 {
    color: #fff;
    margin: 50px;
  }

  a, button {
    font-size: 4vw;
    text-align: center;
    margin: auto;
  }
</style>
