import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'todo-app-tasks'

function loadTasks() {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
}

export function useTasks() {
    const tasks = ref(loadTasks())
    const filter = ref('all') // 'all' | 'done' | 'undone'
    const editingTask = ref(null) // 当前正在编辑的任务

    // 筛选后的任务列表
    const filteredTasks = computed(() => {
        if (filter.value === 'done') {
            return tasks.value.filter(t => t.completed)
        } else if (filter.value === 'undone') {
            return tasks.value.filter(t => !t.completed)
        }
        return tasks.value
    })

    // 本地持久化
    watch(tasks, (newVal) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    }, { deep: true })

    // 添加任务
    function addTask(text) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        }
        tasks.value.push(newTask)
    }

    // 更新任务文本
    function updateTask(id, newText) {
        const task = tasks.value.find(t => t.id === id)
        if (task) task.text = newText
        editingTask.value = null
    }

    // 切换完成状态
    function toggleTask(id) {
        const task = tasks.value.find(t => t.id === id)
        if (task) task.completed = !task.completed
    }

    // 删除任务
    function deleteTask(id) {
        tasks.value = tasks.value.filter(t => t.id !== id)
    }

    // 开始编辑任务（打开弹窗并传入任务）
    function startEdit(task) {
        editingTask.value = { ...task }
    }

    // 取消编辑
    function cancelEdit() {
        editingTask.value = null
    }

    return {
        tasks,
        filter,
        filteredTasks,
        editingTask,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
        startEdit,
        cancelEdit
    }
}