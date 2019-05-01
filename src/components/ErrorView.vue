<template>
	<div class="appError">
	  <div class="msgApp msgApp--error">Aïe, il semblerait qu'il y ait une erreur technique</div>
	  <button class="btn btn--refresh" type="button" v-on:click="refresh()">Rafraîchir l'écran</button>
	</div>
</template>

<script>
	export default {
  		name: 'ErrorView',
  		methods: {
  			refresh: function () {
      			window.location.reload()
    		}
  		}
  	}
</script>

<style scoped lang="scss">
	.appError
	{
	  text-align: center;

	  .btn--refresh
	  {
	    margin: 20px 0 0;
	  }
	}
</style>