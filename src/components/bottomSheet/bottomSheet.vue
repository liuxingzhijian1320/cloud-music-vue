<template>
  <div>
    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet ">
      <div class="title-wrapper">
        播放列表（{{songList.length}}）
      </div>
      <hr class="mu-divider">
      <div class="list-wrapper">
        <div class="list-item" :class="{on: item.id == audio.id}" v-for="(item, index) in songList"
          :key="index">
          <div class="info" @click="play(item,index)">
            <div class="name">{{item.name}}</div>
            <div class="spot">------</div>
            <div class="singer">{{item.singer}}</div>
          </div>
          <div class="del" @click="remove(index)">x</div>

        </div>
        <hr class="mu-divider">

      </div>
    </mu-bottom-sheet>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	name: 'bottomSheet',
	data() {
		return {
			bottomSheet: false,
		};
	},
	methods: {
		closeBottomSheet() {
			this.bottomSheet = false;
			// if (document.querySelector('.playList')) {
			// 	document.querySelector('.playList').style.position = 'static';
			// }
		},
		show() {
			this.bottomSheet = true;
			// if (document.querySelector('.playList')) {
			// 	document.querySelector('.playList').style.position = 'fixed';
			// }
		},
		play(item, index) {
			//从播放列表中打开音乐
			this.$store.commit('setAudioIndex', index);
			// by id get location（通过id来获取的这个音乐的路径）
			this.$store.dispatch('getSong', item.id);
			this.bottomSheet = false;
		},
		remove(index) {
			//删除音乐
			this.$store.commit('removeAudio', index);
		},
	},
	computed: {
		...mapGetters(['songList', 'audio']),
	},
	watch: {
		//监听songlist的长度，当为0时候，直接关闭
		songList(val, oldVal) {
			if (val.length == 0) {
				this.bottomSheet = false;
			}
		},
	},
};
</script>
<style lang="scss" scoped>
// html,
// body {
// 	height: 100%;
// 	overflow: hidden;
// }

.title-wrapper {
	font-size: 0.32rem;
	height: 1rem;
	line-height: 1rem;
	color: rgba(0, 0, 0, 0.87);
	text-align: center;
}

.list-wrapper {
	/*min-height: 1.5rem;*/
	max-height: 6rem;
	width: 100%;
	padding: 0 0.2rem;
	overflow: auto;

	.list-item {
		display: flex;
		height: 1rem;
		padding: 0 0.3rem;
		line-height: 1rem;
		font-size: 0.3rem;
		&.on {
			color: red;
		}
		.info {
			flex: 1;
			display: flex;

			.spot {
				margin: 0 0.1rem;
			}
		}
		.del {
			width: 0.4rem;
		}
	}
}
</style>

