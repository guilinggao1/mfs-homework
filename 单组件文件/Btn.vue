<template>
    <button @click="btnClick()">{{ count }}</button>
</template>
<script>
export default {
    name: 'my-btn',
    data() {
        return {
            count: 0
        }
    },
    methods: {
        btnClick: function () {
            this.count++
            this.$emit('btnClick')
        }
    }
}
</script>

<style scoped>
/* button {
    background-color: rgb(23, 173, 83);
    color: rgb(233, 233, 242);
    border: none;

} */
</style>
