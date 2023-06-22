<script setup>
import { ref } from 'vue';
import Button from '@/components/elements/ui/Button.vue';
import DeleteIconButton from '@/components/elements/ui/DeleteIconButton.vue';
import Form from '@/components/layouts/Form.vue';
import Input from '@/components/elements/ui/Input.vue';
import List from '@/components/layouts/List.vue';

const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Map,
    required: true,
  },
});
const emit = defineEmits(['create', 'change', 'delete']);

const inputValue = ref('');
const inputRef = ref(null);
const inputMode = ref('Создать');
let currentItemId = '';

const onClickOnItem = (id) => {
  inputValue.value = props.data.get(id).value;
  currentItemId = id;
  inputMode.value = 'Изменить';
};

const onCreateItem = () => {
  if (inputValue.value) {
    emit('create', inputValue.value);
  }
};

const onDiscard = () => {
  currentItemId = '';
  inputMode.value = 'Создать';
  inputValue.value = '';
};

const onChangeItem = () => {
  if (inputValue.value && props.data.get(currentItemId).value !== inputValue.value) {
    emit('change', currentItemId, inputValue.value);
  }
  onDiscard();
};

const onDeleteItem = () => {
  emit('delete', currentItemId);
  onDiscard();
};

const onSubmit = () => {
  inputMode.value === 'Создать' ? onCreateItem() : onChangeItem();
  inputValue.value = '';
  inputRef.value.$el.lastChild.blur();
};
</script>

<template>
	<main class="main">
		<h1 class="main__heading" :title="heading">{{ heading }}</h1>
		<List
			:data="Array.from(data.entries())"
			@click="onClickOnItem"
		/>
		<div class="main__form-wrapper">
			<Form
				class="main__form"
				@submit.prevent="onSubmit"
			>
				<Input
					ref="inputRef"
					v-model="inputValue"
					:id="`new-${name}-name`"
					:name="`new-${name}-name`"
					:heading="`${inputMode} ${title}`"
					headingLocation="center"
				/>
				<div class="main__button-container">
					<Button
						v-if="inputMode === 'Изменить'"
						id="al"
						aria-label="Отменить изменение"
						@click="onDiscard"
					>
						Отменить
					</Button>
					<Button
						type="submit"
						id="al"
						:aria-label="`Создать ${title}`"
					>
						{{ inputMode }}
					</Button>
				</div>
			</Form>
			<DeleteIconButton
				v-if="inputMode === 'Изменить'"
				class="delete-button"
				aria-label="Удалить категорию"
				title="Удалить категорию"
				:height="26"
				:width="26"
				@click="onDeleteItem"
			/>
			<slot
				v-if="inputMode === 'Изменить'"
				name="button"
				:id="currentItemId"
			/>
		</div>
	</main>
</template>

<style lang="scss" scoped>
.main {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	.main__heading {
		width: 100%;
		padding: 1rem;
		text-align: center;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.main__form-wrapper {
		position: relative;
		width: 100%;
		max-width: 600px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.main__form {
			height: auto;
			padding: 1rem 4rem;
			gap: 1rem;

			.main__button-container {
				width: 100%;
				display: flex;
				justify-content: space-around;
				gap: 1rem;
			}
		}

		.delete-button {
			position: absolute;
			top: 2.15rem;
			left: 0;
		}
	}
}
</style>
