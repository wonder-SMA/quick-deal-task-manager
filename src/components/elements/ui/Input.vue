<script setup>
const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  /** @type 'text' | 'tel' | 'email' | 'password'; */
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  heading: {
    type: String,
    required: false,
  },
  /** @type 'left' | 'center' | 'right'; */
  headingLocation: {
    type: String,
    required: false,
    default: 'left',
  },
  modelValue: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
  },
  readonly: {
    type: Boolean,
    required: false,
  },
  size: {
    type: Number,
    required: false,
  },
  minLength: {
    type: Number,
    required: false,
  },
  maxLength: {
    type: Number,
    required: false,
  },
  pattern: {
    type: String,
    required: false,
  },
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
	<label class="input">
		<label :class="`input__label input__label-${headingLocation}`" v-if="heading">
			<span class="input__required" v-if="required">* </span>
			{{ heading }}
		</label>
		<input
			class="input__field"
			:id="id"
			:name="name"
			:type="type"
			:value="modelValue"
			:placeholder="placeholder"
			:required="required"
			:readonly="readonly"
			:size="size"
			:minLength="minLength"
			:maxLength="maxLength"
			:pattern="pattern"
			@input="emit('update:modelValue', $event.target.value)"
		/>
	</label>
</template>

<style lang="scss" scoped>
.input {
	width: 100%;
	display: flex;
	flex-direction: column;

	.input__label {
		margin-bottom: 0.25rem;
		font-size: 0.875rem;
		font-style: italic;
		color: inherit;

		text-align: center;

		.input__required {
			color: #dc2626;
		}
	}

	.input__label-left {
		text-align: left;
	}

	.input__label-center {
		text-align: center;
	}

	.input__label-right {
		text-align: right;
	}

	.input__field {
		width: 100%;
		padding: 0.5rem;
		border-radius: 0.25rem;
		font-size: inherit;
		color: inherit;
		user-select: text;
		outline: none;
		appearance: none;
		transition: border .2s, border-color 0s;

		&:valid {
			border: 1px solid #d1d5db;

			&:hover {
				border-color: #9ca3af;
			}

			&:focus-visible {
				border: 1px solid transparent;
				outline: 2px solid #6b7280;
			}
		}

		&:invalid {
			border: 1px solid #dc2626;

			&:focus-visible {
				border: 1px solid transparent;
				outline: 2px solid #dc2626;
			}
		}
	}
}
</style>
