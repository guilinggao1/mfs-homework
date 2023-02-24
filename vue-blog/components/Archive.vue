<template>
    <div class="archive">
        <h2>文章归类</h2>
        <ul>
            <li v-for="archive in archive">
                <router-link :to="`/archive/${archive.year}/${archive.month}`">{{ archive.year }}/{{ archive.month
                }}={{ archive.articleNumber }}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        archive: {
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
.archive h2 {
    font-weight: 500;
    font-size: 18px;
    color: #000;
}

.archive li {
    font-size: 14px;
    line-height: 28px;
}

a {
    text-decoration: none;
    color: #000;
}
</style>