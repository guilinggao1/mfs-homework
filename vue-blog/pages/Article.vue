<template>
    <div class="main">
        <div class="col md-8 main list">
            <ArticleItem :article="articles" :showDetail="true"></ArticleItem>
        </div>
        <div class="col md-4 xs-12">
            <LastesArticle :lastesArticle="lastesArticle"></LastesArticle>
            <Archive :archive="archive"></Archive>
            <Target :targets="targets"></Target>
        </div>
    </div>
</template>
  
<script>
import LastesArticle from '../components/LastesArticle.vue';
import Archive from '../components/Archive.vue';
import Target from '../components/Target.vue';
import ArticleItem from '../components/ArticleItem.vue';
export default {
    data() {
        return {
            articles:
            {
                id: 1,
                title: '文章名字1',
                target: 'css',
                data: "2017/6/17",
                clickTimes: "122",
                content: "CSS (Cascading Style Sheets，层叠样式表），是一种用来为结构化文档（如 HTML 文档或 XML 应用）添加样式（字体、间距和颜色等）的计算机语言，CSS文件扩展名为 .css。通过使用 CSS 我们可以大大提升网页开发的工作效率！在我们的 CSS 教程中，您会学到如何使用 CSS 同时控制多重网页的样式和布局。CSS3 现在已被大部分现代浏览器支持，而下一版的 CSS4 仍在开发中。",
            }
            ,
            lastesArticle: [
                {
                    id: 1,
                    title: '文章名字1'
                },
                {
                    id: 2,
                    title: '文章名字2'
                }
            ],
            archive: [
                {
                    year: 2017,
                    month: 1,
                    articleNumber: 3
                },
                {
                    year: 2017,
                    month: 2,
                    articleNumber: 7
                },
                {
                    year: 2017,
                    month: 3,
                    articleNumber: 8
                },
            ],
            targets: [
                {
                    id: 1,
                    name: "CSS",
                },
                {
                    id: 2,
                    name: "Html",
                },
                {
                    id: 3,
                    name: "JS",
                }
            ]
        }
    },
    components: {
        LastesArticle,
        Archive,
        Target,
        ArticleItem,
    },
    created() {
        console.log(this.$route.name)
        console.log(this.$route.params)
    },
    watch: {
        '$route': function (newVal) {
            console.log(this.$route.name)
            console.log(this.$route.params)
        }
    }
    // name: 'article'
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
    padding: 0 20px;
}

.main {
    margin-top: 20px;
}
</style>
  