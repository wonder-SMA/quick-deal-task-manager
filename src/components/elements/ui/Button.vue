<script setup>
const props = defineProps({
  /** @type 'button' | 'submit'; */
  type: {
    type: String,
    required: false,
    default: 'button',
  },
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
	<button :type="type" class="button" :id="id" :aria-label="ariaLabel">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.button {
	max-height: 2.5rem;
	padding: 0.5rem 1rem;
	border: 1px solid transparent;
	border-radius: 0.25rem;
	text-align: center;
	font-size: inherit;
	color: white;
	background-color: #2563eb;
	outline-offset: 4px;
	user-select: none;
	touch-action: manipulation;
	cursor: pointer;
	transition: all .2s;

	&:hover {
		background-color: #3b82f6;
	}

	&:active {
		background-color: #1d4ed8;
	}
}
</style>
