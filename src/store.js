import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { alert } from './_modules/alert.module';
import { account } from './_modules/account.module';
import { users } from './_modules/users.module';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    results: {
      correct_answers: 0,
      incorrect_answers: 0
    },
    questions: []
  },
  modules: {
    alert,
    account,
    users
  },
  mutations: {
      translateData: function (state, questions) {
          for (var i = 0; i < questions.length; i++) {
              questions[i].question = htmlDecode(questions[i].question)
              questions[i].correct_answer = htmlDecode(questions[i].correct_answer)
              questions[i].incorrect_answers.push(questions[i].correct_answer)

              for (var j = 0; j < questions[i].incorrect_answers.length; j++) {
                  questions[i].incorrect_answers[j] = htmlDecode(questions[i].incorrect_answers[j])
              }

              shuffle(questions[i].incorrect_answers)
          }
          state.questions = questions
      },
      setResults(state, answers) {
        state.results.correct_answers = answers.corrects
        state.results.incorrect_answers = answers.incorrects
      }
  },
  getters: {
      getScore: function(state) {
          let total = state.results.correct_answers + state.results.incorrect_answers;
          return state.results.correct_answers + " / " + total;
      }
  },
  actions: {
    getQuestions(context) {
      return new Promise(function(resolve, reject) {
        axios
            .get('https://opentdb.com/api.php?amount=10&category=17')
            .then(function(response) {
              console.log(response)
              context.commit('translateData', response.data.results)
              resolve(true)
            })
            .catch(function(error) {
              console.log('An error occurred: ', error)
              reject(false)
            })
      })
    }
  }
})

// Decodes a potential special character that was passed
// in a weird encoding type ("&amp" things like that)
function htmlDecode(input) {
  var e = document.createElement('div')
  e.innerHTML = input
  return e.childNodes[0].nodeValue
}

// Mixes the elements that belong to the passed parameter so that we can
// get random positions for each answer in each question card
function shuffle(array) {
  for (let i = array.length; i > 0; i--) {
      let rndIndex = Math.floor(Math.random() * i);

      // Swap current element with array element of index "rndIndex"
      [array[i - 1], array[rndIndex]] = [array[rndIndex], array[i - 1]];
  }

  return array;
}
