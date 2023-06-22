<script setup>

</script>

<template>
	<form class="form">
		<slot />
	</form>
</template>

<style lang="scss" scoped>
.form {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
