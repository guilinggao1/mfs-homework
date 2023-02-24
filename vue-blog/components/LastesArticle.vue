<template>
    <div class="lastestarticle">
        <h2>近期文章</h2>
        <ul>
            <li v-for="lastesArticle in lastesArticle">
                <router-link :to="`/article/${lastesArticle.id}`">{{ lastesArticle.title }}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        lastesArticle: {
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
<style scopeds>
.lastestarticle h2 {
    font-weight: 500;
    font-size: 18px;
    color: #000;
}

.lastestarticle li {
    font-size: 14px;
    line-height: 28px;
}

a {
    text-decoration: none;
    color: #000;
}
</style>