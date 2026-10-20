<!-- src/App.vue -->
<template>
  <div class="notebook-app">
    <div class="container">
      <!-- 头部标题 -->
      <header class="header">
        <h1>📝 Vue 智能便签本</h1>
        <p class="subtitle">记录灵感，管理日常任务</p>
      </header>

      <!-- 输入栏 -->
      <div class="input-section">
        <input 
          v-model="newTodoText" 
          @keyup.enter="addTodo"
          placeholder="输入待办事项，按回车添加..." 
          class="todo-input"
        />
        <button @click="addTodo" class="add-btn">添加</button>
      </div>

      <!-- 任务分类统计 -->
      <div class="filter-section">
        <span class="count">共 {{ todos.length }} 条记录</span>
        <div class="filters">
          <button :class="{ active: filter === 'all' }" @click="filter = 'all'">全部</button>
          <button :class="{ active: filter === 'active' }" @click="filter = 'active'">未完成</button>
          <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">已完成</button>
        </div>
      </div>

      <!-- 任务列表 -->
      <ul class="todo-list">
        <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
          <label class="todo-item">
            <input type="checkbox" v-model="todo.completed" />
            <span class="text">{{ todo.title }}</span>
          </label>
          <button @click="deleteTodo(todo.id)" class="del-btn">删除</button>
        </li>
        <li v-if="filteredTodos.length === 0" class="empty-state">
          暂无相关便签~
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const newTodoText = ref('')
const filter = ref('all')
const todos = ref([])

// 从本地存储读取历史便签（持久化，刷新不丢失）
onMounted(() => {
  const saved = localStorage.getItem('vue_notebook_data')
  if (saved) {
    todos.value = JSON.parse(saved)
  } else {
    // 默认演示数据
    todos.value = [
      { id: 1, title: '学习 Vue 3 组合式 API', completed: true },
      { id: 2, title: '搭建 GitHub 仓库并上传项目', completed: true },
      { id: 3, title: '准备前端面试八股文', completed: false }
    ]
  }
})

// 监听 todos 改变，随时保存到 localStorage
watch(todos, (newVal) => {
  localStorage.setItem('vue_notebook_data', JSON.stringify(newVal))
}, { deep: true })

// 增加
const addTodo = () => {
  if (!newTodoText.value.trim()) return
  todos.value.unshift({
    id: Date.now(),
    title: newTodoText.value.trim(),
    completed: false
  })
  newTodoText.value = ''
}

// 删除
const deleteTodo = (id) => {
  todos.value = todos.value.filter(item => item.id !== id)
}

// 过滤计算属性
const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.completed)
  if (filter.value === 'completed') return todos.value.filter(t => t.completed)
  return todos.value
})
</script>

<style scoped>
.notebook-app {
  min-height: 100vh;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  font-family: sans-serif;
  box-sizing: border-box;
}
.container {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  padding: 24px;
  height: fit-content;
}
.header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}
.subtitle {
  color: #888;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 20px;
}
.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.todo-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
}
.todo-input:focus {
  border-color: #42b883;
}
.add-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 13px;
  color: #666;
}
.filters button {
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  margin-left: 6px;
}
.filters button.active {
  color: #42b883;
  font-weight: bold;
}
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid #eee;
}
.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.completed .text {
  text-decoration: line-through;
  color: #bbb;
}
.del-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 12px;
}
.empty-state {
  text-align: center;
  color: #999;
  padding: 20px 0 !important;
}
</style>