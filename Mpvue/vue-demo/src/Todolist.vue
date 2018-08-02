<template>
   <div>
      <Title :title="title" :subtitle="subtitle"></Title>
      <input @keyup.enter="addTodo" type="text" v-model="mytodo">
      <button @click="addTodo">添加</button>
      <button @click="clean">清空</button>
      <ul>
        <li v-for="(todo,i) in todos"
        :key="i"
        :class="{'done':todo.done}"
        @click="compeleteTodo(i)">{{i+1}}:{{todo.text}}</li>
      </ul>

      <p>{{remain}}/{{todos.length}}</p>
    </div>
</template>
<script>
import Title from './components/Title'
export default {

//   name: 'Todolist',
  data () {
    return {
      title: 'hello VueJs',
      subtitle: 'Vue React Angular is good',
      showSub: true,
      mytodo: '',
      todos: [
        {text: '吃饭', done: false},
        {text: '睡觉', done: false},
        {text: '写代码', done: false}
      ]
    }
  },
  components: {
    Title
  },
  computed: {
    remain () {
      return this.todos.filter(v => !v.done).length
    }
  },
  methods: {
    addTodo () {
      this.todos.push({text: this.mytodo, done: false})
      this.mytodo = ''
    },
    compeleteTodo (index) {
      console.log(index)
      this.todos[index].done = !this.todos[index].done
    },
    clean () {
      this.todos = this.todos.filter(v => !v.done)
    }
  }
}
</script>
<style>
.done{
    color:red;
    text-decoration: line-through;
}
</style>
