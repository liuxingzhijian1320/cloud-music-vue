<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					werwer
				</div>
			</div>
		</div>
		</div>
	</transition>
</template>

<script type="text/babel">
export default {
	data() {
		return {};
	},
	mounted() {},
	methods: {},
};
</script>
<style scoped lang="scss">
.modal-mask {
	position: fixed;
	z-index: 99980000;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	/*background-color: rgba(0, 0, 0, .5);*/
	/*display: table;*/
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	/*display: table-cell;*/
	/*vertical-align: middle;*/
}

.modal-container {
	width: 100%;
	height: 6rem;
	margin: 0 auto;
	background-color: #fff;
	/*box-shadow: 0 2px 8px rgba(0, 0, 0, .33);*/
	transition: all 0.3s ease;
	padding: 0 0.1rem 0.4rem 0.22rem;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	transform: translateY(-0.9rem);
	opacity: 0;
}
</style>
