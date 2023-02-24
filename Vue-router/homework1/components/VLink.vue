<template>
    <a @click="onClick" :href="href" :class="{ active: isActive }">
        <slot></slot>
    </a>
</template>
<script>
export default {
    props: {
        href: {
            type: String,
            required: true,
        }
    },
    // name: 'vlink',
    methods: {
        onClick(e) {
            e.preventDefault()
            let path = this.href
            this.$root.currentRoute = path
            window.history.pushState(null, null, path)
        }
    },
    computed: {
        isActive: function () {
            return this.$root.currentRoute == this.href
        }
    }
}
</script>
<style >
.active {
    background-color: aquamarine;
}
</style>