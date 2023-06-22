import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const TASK_MANAGER_STORE_KEY = 'quick-deal-task-manager';

const getFromLocalStorage = key => {
  const jsonData = localStorage.getItem(key);

  if (jsonData) {
    return JSON.parse(jsonData);
  }

  return null;
};

const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useTaskManagerStore = defineStore('taskManagerStore', () => {

    // Состояние менеджера задач
    const categoryState = ref(new Map(getFromLocalStorage(TASK_MANAGER_STORE_KEY)?.categories || []));
    const taskState = ref(new Map(getFromLocalStorage(TASK_MANAGER_STORE_KEY)?.tasks || []));

    // Создание категории задач
    const createCategory = (categoryName) => {
      categoryState.value.set(uuidv4(), { value: categoryName });
    };

    // Изменение категории задач
    const changeCategory = (categoryId, newCategoryName) => {
      categoryState.value.set(categoryId, { value: newCategoryName });
    };

    // Удаление категории задач
    const deleteCategory = (categoryId) => {

      // Удаление всех задач из данной категории
      for (let taskEntry of taskState.value.entries()) {
        if (taskEntry[1].categoryId === categoryId) {
          taskState.value.delete(taskEntry[0]);
        }
      }

      // Удаление самой категории
      categoryState.value.delete(categoryId);
    };

    // Создание задачи
    const createTask = (taskName, categoryId) => {
      taskState.value.set(uuidv4(), { value: taskName, categoryId });
    };

    // Изменение задачи
    const changeTask = (taskId, newTaskName) => {
      taskState.value.set(taskId, { ...taskState.value.get(taskId), value: newTaskName });
    };

    // Удаление задачи
    const deleteTask = (taskId) => taskState.value.delete(taskId);

    watch([categoryState, taskState], ([categoryState, taskState]) => {
      setToLocalStorage(TASK_MANAGER_STORE_KEY, {
        categories: Array.from(categoryState.entries()),
        tasks: Array.from(taskState.entries()),
      });
    }, { deep: true });


    return {
      categoryState,
      taskState,
      createCategory,
      changeCategory,
      deleteCategory,
      createTask,
      changeTask,
      deleteTask,
    };
  },
);
