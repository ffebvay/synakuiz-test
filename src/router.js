import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome.vue'
import Game from '@/components/Game.vue'
import Results from '@/components/Results.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import LeaderBoards from '@/components/LeaderBoards.vue'
import UserProfile from '@/components/UserProfile.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import UserScores from '@/components/UserScores.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
      {
          path: '/login',
          name: 'login',
          component: Login
      },
      {
          path: '/register',
          name: 'register',
          component: Register
      },
      {
          path: '/game',
          name: 'game',
          component: Game
      },
      {
          path: '/results',
          name: 'results',
          component: Results
      },
      {
          path: '/leaderboards',
          name: 'leaderboards',
          component: LeaderBoards
      },
      {
          path: '/@:username',
          component: UserProfile,
          children : [
              {
                  path: '/avatar',
                  name: 'user-avatar',
                  component: UserAvatar
              },
              {
                  path: '/scores',
                  name: 'user-scores',
                  component: UserScores
              }
          ]
      },

      // otherwise redirect to home
      { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('user')

    if (authRequired && !loggedIn) {
        return next('/login')
    }

    next()
})

export default router
