<template>
    <li>
        <div :class="{ bold: isFolder }" @click="toggle" @dblclick="changeType">
            {{ model.name }}
            <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
        </div>
        <!-- v-show呢如果条件为false，运行后，还是生成了条件为false所在的标签，但是只是让其display属性为none -->
        <ul v-show="isOpen" v-if="isFolder">
            <TreeItem class="item" v-for="model in model.children" :model="model">
            </TreeItem>
            <li class="add" @click="addChild">+</li>
        </ul>
    </li>
</template>

<script>
export default {
    name: 'TreeItem', // 在引用自身的时候是必须的
    props: {
        model: Object
    },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        //判断是否有孩子
        isFolder() {
            return this.model.children && this.model.children.length
        }
    },
    methods: {
        toggle() {
            if (this.isFolder) {
                this.isOpen = !this.isOpen
            }
        },
        changeType() {
            if (!this.isFolder) {
                this.model.children = []
                this.addChild()
                this.isOpen = true
            }
        },
        addChild() {
            this.model.children.push({
                name: 'new stuff'
            })
        }
    }
}
</script>

