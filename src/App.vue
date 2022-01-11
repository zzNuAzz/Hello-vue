<template>
  <div id="app">
    <TodoLists />
  </div>
</template>

<script>

import TodoList from "./components/TodoList"

export default {
  name: 'App',
  components: {
    TodoLists: TodoList,
  }
}
</script>

