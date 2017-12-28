<template>
	<div class="playListDetail">
		<div class="playlist-info">
			<div class="bg-mask"></div>
			<div class="bg-player" id="backImg" :style="{'background-image':'url(' + detail.coverImgUrl + '?param=300y300)'}"></div>
			<div class="info-wrapper">
				<img :src="detail.coverImgUrl + '?param=300y300'" alt="" class="coverImg">
				<div class="info-title">
					<p class="title">{{detail.name}}</p>
					<p class="author">
						<!-- <mu-avatar slot="left" :src="detail.creator.avatarUrl + '?param=50y50'" :size="30"
						  :iconSize="20" /> -->
						<span>{{detail.name}}</span>
					</p>
				</div>
			</div>

		</div>

		<ul class="list-ul">
			<li class="list-li" v-for="(item,index) in detail.tracks" :key="index" @click="playAudio(item)">
				<div class="list-index">{{index+1}}</div>
				<div class="list-info">
					<div class="song">{{item.name}}</div>
					<div class="name">{{item.ar[0].name}}</div>
				</div>
			</li>
		</ul>

	</div>
</template>
<script>
import api from '../../api';

export default {
	name: 'playerDetail',
	data() {
		return {
			detail: [],
			paramsData: {}, //从router传递来的参数
			fname: '歌单',
			opacity: 0,
		};
	},
	beforeRouteEnter: (to, from, next) => {
		next(vm => {
			this.paramsData = to.query;

			// console.info(22, this.paramsData);

			// window.onscroll = () => {
			// 	var opa = window.pageYOffset / 150;
			// 	if (opa > 0.5) {
			// 		vm.fname = vm.name;
			// 	} else {
			// 		vm.fname = '歌单';
			// 	}
			// 	vm.opacity = window.pageYOffset / 150;
			// };
		});
	},
	created() {
		this.paramsData = this.$route.params;
	},
	methods: {
		back() {
			this.$router.go(-1);
		},
		playAudio(song) {
			//一打开就播放
			document.getElementById('audioPlay').pause();
			this.$store.commit('play');

			var audio = {};
			audio.id = song.id; // id
			audio.singer = song.ar[0].name; // 演唱者
			audio.albumPic = song.al.picUrl;
			audio.name = song.name;
			// 通过Vuex改变状态
			// by id get location（通过id来获取的这个音乐的路径）
			this.$store.dispatch('getSong', audio.id);
			//添加到播放列表
			this.$store.commit('addToList', audio);
			// 当前播放的歌曲
			this.$store.commit('currenSong', song);
		},
		fetData() {
			this.axios
				.get(api.getPlayListDetail(this.$route.params.id))
				.then(res => {
					this.detail = res.data.playlist;
					// console.info('list', this.list);
				})
				.catch(error => {
					console.log('加载歌单信息出错:' + error);
				});
		},
	},
	activated() {
		this.fetData();
	},
};
</script>
<style lang="scss" scoped>
.playListDetail {
	.playlist-info {
		position: relative;
		padding: 0rem 0.5rem;
		height: 5rem;
		overflow: hidden;
		.bg-player {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: bottom right;
			filter: blur(40px);
			-webkit-filter: blur(40px);
			z-index: 1;
		}
		.bg-mask {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #292a2b;
			background-color: rgba(0, 0, 0, 0.35);
			z-index: 2;
		}
		.info-wrapper {
			position: relative;
			z-index: 10;
			color: #fff;
			padding-top: 1.5rem;
			display: flex;
			width: 100%;
			.coverImg {
				width: 3rem;
				height: 3rem;
			}

			.info-title {
				padding-left: 0.3rem;
				flex: 1;
				.title {
					font-size: 0.3rem;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				.author {
					span {
						overflow: hidden;
						display: inline-block;
						height: 30px;
						text-overflow: ellipsis;
						width: 5.4rem;
						white-space: nowrap;
						font-size: 14px;
						vertical-align: top;
						line-height: 30px;
					}
				}
			}
		}
	}
	.list-ul {
		.list-li {
			display: flex;
			padding: 0.3rem;
			position: relative;
			&:after {
				display: block;
				content: '';
				height: 1px;
				transform: scaleY(0.5);
				background-color: #dfdfdf;
				left: 1rem;
				right: 0;
				bottom: 0;
				position: absolute;
			}
			&:last-child {
				&:after {
					display: none;
				}
			}
			.list-index {
				width: 0.4rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 0.32rem;
			}
			.list-info {
				flex: 1;
				padding-left: 0.3rem;
				.song {
					font-size: 0.3rem;
				}
				.name {
					font-size: 0.26rem;
				}
			}
		}
	}
}
</style>


