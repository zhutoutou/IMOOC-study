<template>
    <div>
        <h1>vuejs is good</h1>
        <Todolist></Todolist>
    </div>
</template>
<script>
import Todolist from '@/components/Todolist'
export default {
  data () {

  },
  components: {
    Todolist
  }
}
</script>
<style>
h1 {
    color:red
}
</style>
