<template>
    <div id="app">
        <input type="checkbox" @click="allDone">
        <input type="text" @keyup.enter="addTodo" v-model="inputTodo">
        <ul>
            <li v-for="(i, idx) in listTodo " :key="idx">
                <input type="checkbox" @click="change(idx)" :checked="i.done">{{ i.txt }}
                <button @click="remove(idx)">X</button>
            </li>
        </ul>
        <span>{{ leftNum }} items left</span>
        <button @click="filt('all')" :class="[visbility === 'all' ? selected : '']">All</button>
        <button @click="filt('active')" :class="[visbility === 'active' ? selected : '']">Active</button>
        <button @click="filt('completed')" :class="[visbility === 'completed' ? selected : '']">Completed</button>
        <span @click="clear">clear</span>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            inputTodo: "",
            done: 'completed',
            visbility: 'all'
        }
    },
    computed: {
        ...mapGetters(['listTodo', 'leftNum'])
    },
    components: {

    },
    methods: {
        addTodo: function () {
            if (this.inputTodo === '') {
                return
            }
            console.log(this.inputTodo)
            this.$store.commit("AddTodo", this.inputTodo)
            this.inputTodo = ''
        },
        ...mapMutations({
            change: 'ChangeTodo',
            remove: 'RemoveTodo',
            clear: 'ClearTodo',
            allDone: 'AllDone',
            filt: 'Filter'
        })
    }


}
</script>
<style>
ul {
    padding: 0;
    margin: 0;
    list-style: none;
}

.selected {
    border: 2px solid salmon;
    background-color: aqua;
}
</style>