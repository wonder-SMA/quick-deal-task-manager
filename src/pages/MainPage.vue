<script setup>
import { router } from '@/router/router';
import EnterIconButton from '@/components/elements/ui/EnterIconButton.vue';
import MainLayout from '@/components/layouts/MainLayout.vue';
import { useTaskManagerStore } from '@/stores/task-manager-store.js';

const taskManagerStore = useTaskManagerStore();
const { categoryState } = taskManagerStore;

const onCreateCategory = (categoryName) => taskManagerStore.createCategory(categoryName);

const onChangeCategory = (categoryId, newCategoryName) => taskManagerStore.changeCategory(categoryId, newCategoryName);

const onDeleteCategory = (categoryId) => taskManagerStore.deleteCategory(categoryId);

const onGoToTasks = async (id) => await router.push('/' + id);
</script>

<template>
	<MainLayout
		heading="Категории задач"
		name="category"
		title="категорию"
		:data="categoryState"
		@create="onCreateCategory"
		@change="onChangeCategory"
		@delete="onDeleteCategory"
	>
		<template #button="{ id }">
			<EnterIconButton
				class="enter-button"
				aria-label="Войти в категорию"
				title="Войти в категорию"
				:height="26"
				:width="26"
				@click="onGoToTasks(id)"
			/>
		</template>
	</MainLayout>
</template>

<style lang="scss" scoped>
.enter-button {
	position: absolute;
	top: 2.15rem;
	right: 0;
}
</style>
