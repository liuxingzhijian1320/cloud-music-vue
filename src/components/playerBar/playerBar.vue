<template>
	<div class="foot">
		<div class="player-mini">
			<div class="mini-content">
				<audio :src="audio.location" id="audioPlay" autoplay/>
				<div class="cover" @click="showDetail">
					<mu-circular-progress v-show="loading" :size="30" class="loading" />
					<img class="logo" :src="audio.albumPic + '?param=100y100'" :alt="audio.name" v-show="!loading"
					  :class="{rotateImg:playing}">
				</div>
				<div class="info">
					<div class="name">{{audio.name}}</div>
					<div class="artist">{{audio.singer}}</div>
				</div>
				<div class="control">
					<mu-icon-button class="mini-btn player-list" @click="showList" />
					<mu-icon-button class="mini-btn playing" :class="{pause: playing}" @click="toggleStatus"
					/>
					<mu-icon-button class="mini-btn next" @click="next" />
				</div>
				<div class="pro">
					<!-- <div class="pro-load proload" :style="{'-webkit-transform':'translateX(' + prBufferedTime +'%)' }"></div> -->
					<!-- <div class="pro-play proplay" :style="{'-webkit-transform':'translateX(' + prCurrentTime +'%)' }"></div> -->
				</div>
			</div>
		</div>
		<!-- <BottomSheet ref="bottomSheet"></BottomSheet> -->

	</div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import BottomSheet from 'components/BottomSheet/BottomSheet';

export default {
	data() {
		return {};
	},
	components: {
		BottomSheet,
	},
	methods: {
		//打开播放列表
		showList() {
			this.$refs.bottomSheet.show();
		},
		//下一首
		next() {
			this.toggleStatus();
			this.$store.commit('playNext');
		},
		//切换播放状态
		toggleStatus() {
			if (this.playing) {
				document.getElementById('audioPlay').pause();
				this.$store.commit('pause');
			} else {
				document.getElementById('audioPlay').play();
				this.$store.commit('play');
			}
		},
		//跳转详情页
		showDetail() {
			this.$router.push({ name: 'playerDetail', params: { id: this.audio.id } });
		},
	},
	computed: {
		...mapGetters(['audio', 'songList', 'loading', 'playing']),
	},
};
</script>
<style lang="scss" scopoed>
.foot {
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 998;
	animation: fade 0.3s ease;
}
@keyframes fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
.player-mini {
	width: 100%;
	height: 1.1rem;
	position: relative;
	background-color: rgba(#f6f6f6, 0.9);
	color: #333333;
}
.mini-content {
	display: flex;
	#audioPlay {
		display: none;
	}
	.cover {
		width: 1.1rem;
		height: 1.1rem;
		overflow: hidden;
		margin-left: 0.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		.logo {
			width: 100%;
			height: 100%;
			background-size: cover;
			border-radius: 50%;
			&.rotateImg {
				animation: rotate 20s linear infinite;
			}
		}
	}
	.info {
		width: 3rem;
		padding-left: 0.2rem;
		.name,
		.artist {
			overflow: hidden;
			display: block;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.name {
			font-size: 0.3rem;
			color: #333333;
			margin-top: 0.2rem;
		}
		.artist {
			font-size: 0.24rem;
			color: #999;
		}
	}
	.control {
		flex: 1;
		display: flex;
		.mini-btn {
			flex: 1;
			height: 100%;
			&.player-list {
				background: url('../../../static/playbar_btn_playlist.png') no-repeat !important;
				background-size: cover !important;
			}
			&.playing {
				background: url('../../../static/playbar_btn_play.png') no-repeat !important;
				background-size: cover !important;
			}
			&.next {
				background: url('../../../static/playbar_btn_next.png') no-repeat !important;
				background-size: cover !important;
			}
			&.pause {
				background: url('../../../static/playbar_btn_pause.png') no-repeat !important;
				background-size: cover !important;
			}
		}
	}
}

@keyframes rotate {
	form {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
