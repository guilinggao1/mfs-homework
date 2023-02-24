<template>
    <div class="articleItem">
        <h3>{{ article.title }}</h3>
        <ul>
            <div class="desc">
                <span class="target">{{ article.target }}</span>
                <span class="circle"></span>
                <span class="date">{{ article.data }}</span>
                <span class="circle"></span>
                <span class="click-times">{{ article.clickTimes }}</span>
            </div>
            <div class="content" v-if="showDetail">{{ article.content }}</div>
            <div class="content" v-else>{{ article.content | clip(100) }}</div>
            <div class="view-article" v-if="!showDetail"><router-link :to="`/article/${article.id}`">查看文章</router-link>
            </div>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        showDetail: {
            type: Boolean,
            default: false,
        },
        article: {
            require: true,
            type: [Object, Array]
        }
    },
    data() {
        return {

        }
    },
    // filters: {
    //     clip: function (str, num) {
    //         if (str.length > num) {
    //             return str.substr(0, num)
    //         } else {
    //             return str
    //         }
    //     }
    // },
}
</script>
<style scoped>
.articleItem h3,
.desc,
.content,
.view-article,
.circle {
    text-align: center;
}

.target,
.date,
.click-times {
    color: grey;
    font-size: 14px;
}

.circle {
    display: block;
    height: 4px;
    width: 4px;
    background-color: black;
    border-radius: 50%;
    margin: 0 5px;
}

.desc {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.view-article {
    margin: 20px;
}

.view-article a {
    text-decoration: none;
    color: #000;
    margin: 20px;
    text-align: center;
}

a::after {
    content: '|';
    display: inline-block;
    margin: 0 10px;
    font-weight: 900;
}

a::before {
    content: '|';
    display: inline-block;
    margin: 0 10px;
    font-weight: 900;
}

.content {
    margin-top: 20px;
    text-align: center;
    line-height: 1.5;
}
</style>