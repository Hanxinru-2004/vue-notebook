<template>
  <div class="filter-bar">
    <button
      v-for="btn in buttons"
      :key="btn.value"
      :class="{ active: modelValue === btn.value }"
      @click="$emit('update:modelValue', btn.value)"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])

const buttons = [
  { label: '全部', value: 'all' },
  { label: '已完成', value: 'done' },
  { label: '未完成', value: 'undone' }
]
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

button {
  padding: 6px 16px;
  border: 1px solid #42b883;
  background: white;
  color: #42b883;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

button.active {
  background: #42b883;
  color: white;
}

button:hover {
  opacity: 0.8;
}
</style>