<template>
    <div class="question">

        <p>{{ question }}</p>

    </div>
</template>

<script>
    export default {
        name: "Question",
        props: {
            question: String
        }
    }
</script>

<style scoped>
    .question {
        font-size: 25px;
    }

    a, button {
        font-size: 4vw;
        text-align: center;
        margin: auto;
    }
</style>