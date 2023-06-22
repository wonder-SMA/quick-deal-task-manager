<script setup>
import { router } from '@/router/router.js';
import ExitIconButton from '@/components/elements/ui/ExitIconButton.vue';
import MainLayout from '@/components/layouts/MainLayout.vue';
import { useTaskManagerStore } from '@/stores/task-manager-store.js';

const taskManagerStore = useTaskManagerStore();
const { categoryState, taskState } = taskManagerStore;

const categoryId = decodeURIComponent(window.location.pathname.slice(1));

const onCreateTask = (taskName) => taskManagerStore.createTask(taskName, categoryId);

const onChangeTask = (taskId, newTaskName) => taskManagerStore.changeTask(taskId, newTaskName);

const onDeleteTask = (taskId) => taskManagerStore.deleteTask(taskId);

const onGoBack = async () => await router.back();
</script>

<template>
	<nav>
		<ExitIconButton
			aria-label="Выйти из категории"
			title="Выйти из категории"
			:height="26"
			:width="26"
			@click="onGoBack"
		/>
	</nav>
	<MainLayout
		:heading="`Задачи из категории «${categoryState.get(categoryId).value}»`"
		name="task"
		title="задачу"
		:data="taskState"
		@create="onCreateTask"
		@change="onChangeTask"
		@delete="onDeleteTask"
	/>
</template>

<style lang="scss" scoped />
