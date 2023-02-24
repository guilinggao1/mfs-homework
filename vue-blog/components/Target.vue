<template>
    <div class="target">
        <h2>标签</h2>
        <ul v-for="targets in targets">
            <li><router-link :to="`/target/${targets.id}`">{{ targets.name }}</router-link></li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        targets: {
            require: true,
            type: Array
        }
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.target h2 {
    font-weight: 500;
    font-size: 18px;
    color: #000;
}

ul {
    display: flex;
    flex-wrap: wrap;
}

.target li {

    font-size: 12px;
    border: 1px blue solid;
    padding: 4px;
    margin: 4px;
}

a {
    text-decoration: none;
    color: #000;
}
</style>
