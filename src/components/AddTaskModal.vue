<template>
  <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3>{{ isEdit ? '编辑任务' : '添加任务' }}</h3>
      <input
        ref="inputRef"
        v-model="text"
        type="text"
        placeholder="请输入任务内容"
        @keyup.enter="confirm"
      />
      <div class="modal-actions">
        <button class="cancel-btn" @click="$emit('close')">取消</button>
        <button class="confirm-btn" @click="confirm" :disabled="!text.trim()">
          {{ isEdit ? '保存' : '添加' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  visible: Boolean,
  task: Object // 编辑时传入的任务对象 { id, text }
})

const emit = defineEmits(['close', 'confirm'])

const text = ref('')
const inputRef = ref(null)

const isEdit = computed(() => !!props.task)

watch(() => props.visible, async (val) => {
  if (val) {
    text.value = props.task ? props.task.text : ''
    await nextTick()
    inputRef.value?.focus()
  }
})

function confirm() {
  if (!text.value.trim()) return
  emit('confirm', {
    id: props.task?.id,
    text: text.value.trim()
  })
  text.value = ''
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}

.modal h3 {
  margin: 0 0 16px 0;
}

.modal input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn, .confirm-btn {
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.cancel-btn {
  background: #eee;
  color: #333;
}

.confirm-btn {
  background: #42b883;
  color: white;
}

.confirm-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>