<template>
	<div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<player v-show="songList.length > 0">
		</Player>

	</div>
</template>

<script>
import player from './components/playerBar/playerBar';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {};
	},
	components: {
		player,
	},
	mounted() {},
	methods: {},
	computed: {
		...mapGetters(['songList', 'showDetail']),
	},
};
</script>

<style lang="scss">
@import './assets/styles/normalize.scss';
@import './assets/styles/reset.scss';
@import './assets/styles/mixin.scss';
</style>
