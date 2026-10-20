<template>
  <div class="task-list">
    <div v-if="tasks.length === 0" class="empty">暂无任务</div>
    <div
      v-for="task in tasks"
      :key="task.id"
      class="task-item"
    >
      <input
        type="checkbox"
        :checked="task.completed"
        @change="$emit('toggle', task.id)"
      />
      <span
        :class="{ completed: task.completed }"
        @dblclick="$emit('edit', task)"
      >
        {{ task.text }}
      </span>
      <div class="actions">
        <button class="edit-btn" @click="$emit('edit', task)">编辑</button>
        <button class="delete-btn" @click="$emit('delete', task.id)">删除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tasks: {
    type: Array,
    required: true
  }
})

defineEmits(['toggle', 'edit', 'delete'])
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty {
  text-align: center;
  color: #999;
  padding: 20px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #f9f9f9;
  border-radius: 8px;
  transition: 0.2s;
}

.task-item:hover {
  background: #f0f0f0;
}

.task-item span {
  flex: 1;
  cursor: pointer;
  word-break: break-all;
}

.completed {
  text-decoration: line-through;
  color: #aaa;
}

.actions {
  display: flex;
  gap: 6px;
}

.edit-btn, .delete-btn {
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.edit-btn {
  background: #e0e0e0;
  color: #333;
}

.delete-btn {
  background: #ff4d4f;
  color: white;
}
</style>