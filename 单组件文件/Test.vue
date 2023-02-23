<template>
    <div>
        <div>{{ sum }}</div>
        <my-btn @btnClick="btnClick"></my-btn>
        <my-btn @btnClick="btnClick"></my-btn>
        <my-btn @btnClick="btnClick"></my-btn>
        <p><img :src="pic"></p>
    </div>
</template>
<script>
import MyBtn from './Btn.vue'
import pic from '../assets/logo.png'

export default {
    name: 'test',
    data() {
        return {
            sum: 0,
            pic
        }
    },
    methods: {
        btnClick: function () {
            this.sum++
        }
    },
    components: { MyBtn }
}
</script>

<style scoped>
img {
    width: 200px;
    height: 200px;
}
</style>
