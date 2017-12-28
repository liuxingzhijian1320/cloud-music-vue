import api from '../../api';
import axios from '../../assets/scripts/http';

const state = {
	songList: [], // 播放列表
	currentIndex: -1, // 当前播放的歌曲位置'
	playing: false, // 是否正在播放
	//当前播放的歌曲
	audio: {
		id: 0,
		name: '歌曲名称',
		singer: '演唱者',
		albumPic: 'https://p1.music.126.net/r4OXsQQn_JIvEKklzQBV_w==/2271591023036753.jpg',
		location: '',
		album: '',
	},
	loading: false, // playbar 音乐是否正在加载中
	showDetail: false, //展示详情页
};
const getters = {
	songList: state => state.songList,
	playing: state => state.playing,
	currentIndex: state => state.currentIndex,
	audio: state => state.audio,
	loading: state => state.loading,
	currentIndex: state => state.currentIndex,
};

const mutations = {
	//播放
	play(state) {
		state.playing = true;
	},
	//暂停
	pause(state) {
		state.playing = false;
	},
	//添加到播放列表
	addToList(state, songs) {
		var items = Array.prototype.concat.call(songs);
		items.forEach(item => {
			var flag = false;
			state.songList.forEach(function(element, index) {
				// 检测歌曲重复
				if (element.id === item.id) {
					flag = true;
					state.currentIndex = index + 1;
				}
			});
			if (!flag) {
				state.songList.push(item);
				state.currentIndex = state.songList.length;
			}
		});
	},
	//当前播放的音乐
	currenSong(state, song) {
		// console.info(song);
		state.audio.id = song.id; // id
		state.audio.singer = song.ar[0].name; // 演唱者
		state.audio.albumPic = song.al.picUrl;
		state.audio.name = song.name;
	},
	//接口获取的音乐播放路径
	setLocation(state, location) {
		state.audio.location = location;
	},
	//playbar 加载location的loading
	openLoading(state) {
		state.loading = true;
	},
	//playbar 加载location的loading
	closeLoading(state) {
		state.loading = false;
	},
	//从播放列表中---播放
	setAudioIndex(state, index) {
		state.audio = state.songList[index];
		state.currentIndex = index + 1;
	},
	//从播放列表中---删除
	removeAudio(state, index) {
		state.songList.splice(index, 1);
		if (index === state.songList.length) {
			index--;
		}
		state.audio = state.songList[index];
		state.currentIndex = index + 1;
		//恢复默认
		if (state.songList.length === 0) {
			state.audio = {
				id: 0,
				name: '歌曲名称',
				singer: '演唱者',
				albumPic: 'https://p1.music.126.net/r4OXsQQn_JIvEKklzQBV_w==/2271591023036753.jpg',
				location: '',
				album: '',
			};
			// state.playing = false;
		}
	},
	// 播放下一曲
	playNext(state) {
		state.currentIndex++;
		if (state.currentIndex > state.songList.length) {
			state.currentIndex = 1;
		}
		state.audio = state.songList[state.currentIndex - 1];
	},
	// 播放上一曲
	playPrev(state) {
		state.currentIndex--;
		if (state.currentIndex < 1) {
			state.currentIndex = state.songList.length;
		}
		state.audio = state.songList[state.currentIndex - 1];
	},
};
const actions = {
	getSong({ commit, state }, id) {
		commit('openLoading');
		axios
			.get(api.getSong(id))
			.then(res => {
				// 统一数据模型，方便后台接口的改变
				var url = res.data.data[0].url;
				//设置location
				commit('setLocation', url);
				commit('closeLoading');
			})
			.catch(error => {
				// 错误处理
				console.log(error);
				window.alert('获取歌曲信息出错！');
				commit('closeLoading');
			});
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
