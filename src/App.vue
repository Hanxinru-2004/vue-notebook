<template>
  <div class="app-container">
    <h1>📝 待办管理系统</h1>
    <div class="toolbar">
      <FilterBar v-model="filter" />
      <button class="add-btn" @click="showAddModal = true">+ 添加任务</button>
    </div>

    <TaskList
      :tasks="filteredTasks"
      @toggle="toggleTask"
      @edit="startEdit"
      @delete="deleteTask"
    />

    <AddTaskModal
      :visible="showAddModal || !!editingTask"
      :task="editingTask"
      @close="closeModal"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FilterBar from './components/FilterBar.vue'
import TaskList from './components/TaskList.vue'
import AddTaskModal from './components/AddTaskModal.vue'
import { useTasks } from './composables/useTasks.js'

const {
  filter,
  filteredTasks,
  editingTask,
  addTask,
  updateTask,
  toggleTask,
  deleteTask,
  startEdit,
  cancelEdit
} = useTasks()

const showAddModal = ref(false)

function closeModal() {
  showAddModal.value = false
  cancelEdit()
}

function handleConfirm({ id, text }) {
  if (id) {
    updateTask(id, text)
  } else {
    addTask(text)
  }
  closeModal()
}
</script>

<style>
/* 全局基础样式 */
body {
  margin: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: #f5f5f5;
}

#app {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>

<style scoped>
.app-container {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

h1 {
  margin: 0 0 20px 0;
  font-size: 28px;
  color: #333;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.add-btn {
  background: #42b883;
  border: none;
  color: white;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.add-btn:hover {
  background: #36a372;
}

/* 响应式：移动端调整内边距和字体 */
@media (max-width: 480px) {
  .app-container {
    padding: 16px;
    border-radius: 0;
    box-shadow: none;
  }

  h1 {
    font-size: 24px;
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .add-btn {
    align-self: flex-start;
  }
}
</style>