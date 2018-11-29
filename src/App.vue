<template>
  <div id="app">

    <Header />

    <!-- Alert displayed when the user tries to connect/ register to the app -->
    <div class="main-alert">
      <div v-if="alert.message" :class="`alert ${alert.type} w-75 mx-auto`" data-dismiss="alert">{{alert.message}}</div>
    </div>

    <router-view class="main" />

  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Luckiest+Guy');

  #app {
    font-family: 'Luckiest Guy', Helvetica, Arial, cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #719ebf;
    height: 100%;
  }

  html, body {
    font-family: 'Luckiest Guy', Helvetica, Arial, cursive;
  }

  .main {
    padding-top: 60px;
  }

  .main-alert {
    padding-top: 90px;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .animate
  {
    transition: all 0.1s;
    -webkit-transition: all 0.1s;
  }

  .action-button
  {
    position: relative;
    padding: 10px 40px;
    margin: 0px 10px 10px 0px;
    float: left;
    border-radius: 10px;
    border: 0;
    color: #FFF;
    text-decoration: none;
    cursor: pointer;
  }

  .blue
  {
    background-color: #3498DB;
    border-bottom: 5px solid #2980B9;
    text-shadow: 0px -2px #2980B9;
  }

  .red
  {
    background-color: #E74C3C;
    border-bottom: 5px solid #BD3E31;
    text-shadow: 0px -2px #BD3E31;
  }

  .green
  {
    background-color: #82BF56;
    border-bottom: 5px solid #669644;
    text-shadow: 0px -2px #669644;
  }

  .yellow
  {
    background-color: #F2CF66;
    border-bottom: 5px solid #D1B358;
    text-shadow: 0px -2px #D1B358;
  }

  .action-button:active
  {
    transform: translate(0px,5px);
    -webkit-transform: translate(0px,5px);
    border-bottom: 0px solid;
  }

  .disabled {
    pointer-events: none;
  }
</style>

<script>
    import french from 'vee-validate/dist/locale/fr'
    import Header from "./components/Header";
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'App',
        components: {Header},
        mounted: function() {
            this.$validator.localize('fr', french)
        },
        computed: {
            ...mapState({
                alert: state => state.alert
            })
        },
        methods: {
            ...mapActions({
                clearAlert: 'alert/clear'
            })
        },
        watch: {
            $route (to, from) {
                this.clearAlert()
            }
        }
    }
</script>