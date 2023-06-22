<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  ariaLabel: {
    type: String,
    required: true,
  },
});
</script>

<template>
	<button
		class="icon-button"
		:id="id"
		:aria-label="ariaLabel"
	>
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.icon-button {
	border-radius: 50%;
	padding: 8px;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #54656f;
	background-color: transparent;
	user-select: none;
	touch-action: manipulation;
	cursor: pointer;
	transition: all .3s;

	svg {
		width: 100%;
		height: 100%;
		stroke: #54656f;
	}

	&:active {
		background-color: #d9dbdf;
	}
}
</style>
