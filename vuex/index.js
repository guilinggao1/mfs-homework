import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

class Todo {
    constructor(id, txt) {
        this.id = id
        this.txt = txt
        this.done = false
    }
}
export const store = new Vuex.Store({
    state: {
        todos: [],
        visbility: 'all',
        leftNum: 0

    },
    mutations: {
        // 增加
        AddTodo: function (state, value) {
            let item = new Todo(state.todos.length, value)
            state.todos.push(item)
            console.log(state)
        },
        // 改变状态
        ChangeTodo: function (state, idx) {
            state.todos[idx].done = !state.todos[idx].done
        },
        // 清除
        ClearTodo: function (state) {
            state.todos = state.todos.filter(i => !i.done)
        },
        // 删除
        RemoveTodo: function (state, idx) {
            state.todos.splice(idx, 1)
        },
        //过滤
        Filter: function (state, filter) {
            state.visbility = filter
        },
        // 全选
        AllDone: function (state) {
            if (state.leftNum === state.todos.length || state.leftNum === 0) {
                state.todos.forEach(i => i.done = !i.done)
            } else {
                state.todos.forEach(i => {
                    if (!i.done) {
                        i.done = true
                    }
                })
            }
        }
    },
    getters: {
        listTodo: function (state) {
            switch (state.visbility) {
                case 'all': return state.todos
                case 'active': return state.todos.filter(i => !i.done)
                case 'completed': return state.todos.filter(i => i.done)
                default: return state.todos
            }
        },
        leftNum(state) {
            state.leftNum = state.todos.filter(i => !i.done).length
            return state.leftNum
        }
    }

})
