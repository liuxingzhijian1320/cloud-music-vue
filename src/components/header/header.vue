<template>
	<div>
		<mu-appbar>
			<!-- <div class="logo" slot="left"></div> -->
			<mu-icon-button icon='search' slot="right" />
		</mu-appbar>
	</div>
</template>
<script>
export default {
	name: 'header',
	data() {
		return {};
	},
};
</script>
<style lang="scss">
//修改header的颜色
.mu-appbar {
	background-color: #ce3d3e;
}
.logo {
	width: 3rem;
	height: 0.96rem;
	background: url('../../../static/logo.png') no-repeat left center;
	background-size: cover;
}
</style>


