<template>
	<div class="range">
		<swiper :swiper="swiper"></swiper>
		<div class="wrapper">
			<div class="song-list">
				<div class="title-img"></div>
				<span class="title">推荐歌单</span>
				<router-link :to="{path: '/index/songList'}" class="more">更多</router-link>
			</div>

			<ul class="range-box">
				<router-link tag="li" class="box" v-for="(item,index) in playList" :key="index" :to="{name: 'playListDetail',params: { id: item.id}}">
					<img class="item-img" :src="item.coverImgUrl + '?param=230y230'">
					<div class="bar">
						<div class="headset"></div>
						<div class="playCount">{{item.playCount | formatCount}}</div>
					</div>
					<div class="item-name">{{item.name}}</div>
				</router-link>
			</ul>

		</div>
	</div>
</template>
<script>
import api from '../../api';
import swiper from 'components/swiper/swiper';
export default {
	name: 'rage',
	data() {
		return {
			//没有现成的接口调取，暂且用假的数据来
			swiper: [
				'http://p4.music.126.net/kYXE3h0MMRT0nngbT2WR4g==/18556457744087424.jpg',
				'http://p4.music.126.net/HKtVKuJcuhC-H9Gk_TzyOw==/18862121974954100.jpg',
				'http://p4.music.126.net/0S3Jf5J8fYNOXw_r4QIjTg==/18637821604526296.jpg',
				'http://p3.music.126.net/YMBOJMG8EyeGKLzQkJF7_w==/19164487672576936.jpg',
				'http://p3.music.126.net/_GK_ESTyoHu4XrrN80eaCQ==/18561955302207284.jpg',
			],
			playList: [],
		};
	},
	methods: {
		fetchData() {
			this.axios.get(api.getPlayListByWhere('全部', 'hot', 0, true, 20)).then(res => {
				this.playList = res.data.playlists;
			});
		},
	},
	activated() {
		this.fetchData();
	},
	components: {
		swiper,
	},
	filters: {
		formatCount(v) {
			if (v < 9999) {
				return v;
			} else {
				return (v / 10000).toFixed(0) + '万';
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.range {
	.wrapper {
		.song-list {
			display: flex;
			font-size: 0.24rem;
			padding: 0 0.3rem;
			.title-img {
				width: 0.54rem;
				height: 0.54rem;
				background: url('../../../static/aei.png') no-repeat;
				background-size: 0.4rem 0.4rem;
			}
			.title {
				flex: 1;
				line-height: 0.45rem;
			}
			.more {
				color: #333;
			}
		}
	}
	.range-box {
		display: flex;
		flex-wrap: wrap;
		padding: 0 0.3rem;
		justify-content: space-between;
		.box {
			width: 3.3rem;
			margin-bottom: 0.5rem;
			position: relative;
			.item-img {
				width: 100%;
				height: 100%;
			}
			.bar {
				position: absolute;
				bottom: 0;
				right: 0;
				left: 0;
				height: 0.4rem;
				background-color: rgba(#000, 0.3);
				text-align: right;
				line-height: 0.4rem;
				color: #ffffff;
				padding-right: 0.3rem;
				font-weight: 900;
				display: flex;
				.headset {
					width: 0.32rem;
					height: 0.32rem;
					background: url('./images/headset.png') no-repeat;
					background-size: 0.32rem 0.32rem;
					margin: 0 0.1rem;
					margin-top: 0.03rem;
				}
				.playCount {
				}
			}
			.item-name {
				line-height: 1.4;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 100%;
				font-size: 0.24rem;
				margin: 0.1rem 0;
			}
		}
	}
}
</style>
