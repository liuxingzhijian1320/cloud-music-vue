<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item,index) in swiper" :key="index" :style="{backgroundImage:`url(${item})`}">
			</div>
		</div>
		<div class="swiper-pagination"></div>
	</div>
</template>
<script>
// import Swiper from 'swiper';

export default {
	name: 'swiper',
	data() {
		return {
			mySwiper: null,
		};
	},
	props: ['swiper'], //swiper的就是test这个数据传递来的
	methods: {
		_initSwiper() {
			this.mySwiper = new Swiper('.swiper-container', {
				paginationClickable: true,
				speed: 500,
				loop: true,
				observer: true,
				observeParents: true,
				autoplayDisableOnInteraction: false,
				autoplay: 2000,
				pagination: '.swiper-pagination',
			});
		},
		_updateSwiper() {
			this.$nextTick(() => {
				this.mySwiper.update(true); //swiper update的方法
			});
		},
		swiperUpdate() {
			if (this.mySwiper) {
				//节点存在
				this._updateSwiper(); //更新
			} else {
				this._initSwiper(); //创建
			}
		},
	},

	watch: {
		//通过props传来的数据 和 组件一加载节点就创建成功 二者不是同步，实时监听的swiper(传递的值)的变化
		swiper() {
			this.swiperUpdate();
		},
	},
	mounted() {
		this.swiperUpdate(); //页面一加载拉去数据创建节点
	},
};
</script>
<style lang="scss" scoped>
.swiper-container {
	width: 100%;
	height: 3.4rem;
	.swiper-wrapper {
		width: 100%;
		height: 100%;
		.swiper-slide {
			background-size: cover;
			width: 100%;
			height: 100%;
			background-size: 100%;
			background-repeat: no-repeat;
		}
	}
}
</style>
