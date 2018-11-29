<template>

    <div class="answers">

        <div class="container">

            <div class="row px-3">

                <div class="col-md-12" v-for="option in options">

                    <div class="multiple-choice">

                        <button v-bind:class="{
                            blue: gameActive,
                            disabled: !gameActive,
                            red: !gameActive,
                            yellow: (selected === option && selected !== correct),
                            green: (!gameActive && selected === option && selected === correct)
                            || (!gameActive && selected !== correct && option === correct)
                        }"
                                v-on:click="selectOption(option)"
                                class="action-button w-100 mb-3 mx-auto">
                            {{ option }}
                        </button>

                    </div>

                </div>

                <button v-if="!gameActive" v-on:click="nextQuestion()" class="action-button w-100 blue my-4 mx-auto">
                    Suivant
                </button>

            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "Answers",
        props: {
            answers: Object
        },
        data: function() {
            return {
                options: [],
                correct: '',
                gameActive: true,
                selected: '',
                gameStatus: false // used to determine if the user picked the
                                  // right/ wrong answer at the current question
            }
        },
        created: function() {
            this.assignProps()
            console.log(this.options)
        },
        methods: {
            assignProps: function() {
                this.options = this.answers.incorrect_answers
                this.correct = this.answers.correct_answer
                this.gameActive = true
                this.selected = ''
            },
            selectOption: function(answer) {
                this.selected = answer;
                this.gameActive = false;

                if (this.correct == this.selected) {
                    this.gameStatus = true;
                } else {
                    this.gameStatus = false;
                }
            },
            nextQuestion: function() {
                this.$emit('nextQuestion', this.gameStatus)
            }
        },
        watch: {
            '$props': {
                handler: function(value, oldValue) {
                    this.assignProps()
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    a, button {
        font-size: 4vw;
        text-align: center;
        margin: auto;
    }
</style>