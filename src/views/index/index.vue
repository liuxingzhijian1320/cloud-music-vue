<template>
	<div class="index">
		<div class="fixed-bar">
			<v-header></v-header>
			<mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs" lineClass="table-line">
				<mu-tab value="rage" title="时下流行" />
				<mu-tab value="songList" title="歌单" />
				<mu-tab value="leaderBoard" title="排行榜" />
				<mu-tab value="hotSinger" title="热门歌手" />
			</mu-tabs>
		</div>

		<div class="default-view">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>

	</div>
</template>
<script>
import VHeader from 'components/header/header';
export default {
	name: 'home',
	data() {
		return {
			activeTab: 'rage',
		};
	},
	methods: {
		handleTabChange(val) {
			this.activeTab = val;
			this.$router.push({ path: '/index/' + val });
		},
	},
	components: {
		VHeader,
	},
};
</script>
<style lang="scss" scoped>
.fixed-bar {
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 25;
	.mu-tabs {
		background-color: #fff;
		.mu-tab-link {
			color: rgba(102, 102, 102, 1);
		}
		.mu-tab-active {
			color: #ce3d3e;
		}
	}
}
.default-view {
	margin-top: 2.1rem;
}
</style>
