<template>
	<div class="filters">
	  <div class="filters__label">Trier par</div>
	  <v-select v-model="filter" :options="options"></v-select>
	</div>
</template>

<script>
	export default {
		name: 'Dropdown',
		props: ['value', 'options'],
		computed: {
			filter: {
				get() { return this.value },
				set(filter) { this.$emit('input', filter) }
			}
		}
	}
</script>

<style scoped lang="scss">
	.filters
	{
	  display: flex;
	  align-items: center;
	  margin: 20px 0;
	}

	.filters__label { margin: 0 0 0 auto; }
</style>