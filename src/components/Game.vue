<template>
    <div class="game d-flex align-items-center">

        <div class="card w-75 text-center py-4 mx-auto">

            <!-- Question component above Answers -->
            <Question v-bind:question="question"></Question>

            <!-- Then, display the possible answers for current question -->
            <Answers v-bind:answers='object' v-on:nextQuestion='getQuestion($event)'></Answers>

        </div>

    </div>
</template>

<script>
    import Question from './Question.vue'
    import Answers from './Answers.vue'

    export default {
        name: "Game",
        components: {
            Question,
            Answers
        },
        data: function() {
            return {
                questions: this.$store.state.questions,
                question: '',
                object: {},
                result: {
                    corrects: 0,
                    incorrects: 0
                },
                gameActive: true
            }
        },
        created: function() {
            this.getQuestion()
            console.log(this.questions)
        },
        methods: {
            getQuestion: function(answer) {
                if(answer){
                    this.result.corrects++
                }
                else if(answer == false){
                    this.result.incorrects++
                }
                else if(answer == null){
                    console.log("Problem, man...")
                }
                if(this.questions[0]){
                    this.gameActive = true;
                    this.object = this.questions.shift();
                    this.question = this.object.question;
                }
                else {
                    this.$store.commit('setResults', this.result);
                    this.$router.push({name: 'results'})
                }
            }
        }
    }
</script>

<style scoped>
    .game {
        min-height: 100vh;
        height: auto;
    }

    a, button {
        font-size: 4vw;
        text-align: center;
        margin: auto;
    }
</style>