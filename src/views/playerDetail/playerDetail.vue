<template>
  <div class="content">
    <div class="player-wrapper">
      <div class="player-inner">
        <div class="title">
          <span class="back">返回</span>
          <span class="name">
            {{audio.name}}
          </span>
        </div>
        <div class="cover" :style="{'background-image':'url(' + audio.albumPic + '?param=500y500' + ')'}"></div>
      </div>
    </div>

    <div class="mask">
      <div class="album-cover" :style="{'background-image':'url(' + audio.albumPic + '?param=750y1206' + ')'}"></div>
      <div class="cover-mask"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
// import api from '../../api';
export default {
	data() {
		return {};
	},
	components: {},
	computed: {
		...mapGetters(['audio', 'playing']),
	},
	watch: {},
};
</script>
<style lang="scss" scoped>
.content {
	height: 100vh;
	width: 100%;
	position: relative;
}
.mask {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	z-index: 10;
	.album-cover {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-repeat: no-repeat;
		filter: blur(1.2rem);
	}
	.cover-mask {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: 10;
	}
}
.player-wrapper {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	z-index: 20;
	.player-inner {
		height: 1rem;
		background-color: rgba(#000, 0.6);
		.title {
			display: flex;
			height: 1rem;
			font-size: 0.24rem;
			color: #ffffff;
			line-height: 1rem;
			text-align: center;
			.back {
				width: 1rem;
			}
			.name {
				flex: 1;
			}
		}

		.cover {
			border-radius: 50%;
			height: 4rem;
			width: 4rem;
			background-size: cover;
		}
	}
}
</style>
