<template>
	<div>
		<button ref="btn" class="settings-btn">
      <svg class="iconfont" aria-hidden="true">
        <use xlink:href="#icon-shezhi"></use>
      </svg>
		</button>
		<div v-show="visible" class="settings">
			<div>
				<label>
					<span>httpUrl</span>
					<input v-model="httpUrl" type="text" placeholder="">
				</label>
				<label>
					<span>httpPort</span>
					<input v-model="httpPort" type="text" placeholder="">
				</label>
			</div>
			<div>
				<label>
					<span>websocketUrl</span>
					<input v-model="websocketUrl" type="text" placeholder="">
				</label>
				<label>
					<span>websocketPort</span>
					<input v-model="websocketPort" type="text" placeholder="">
				</label>
			</div>
			<div class="confirm">
				<button ref="confirm">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Settings",
	data() {
		return {
			httpUrl: window.localStorage.getItem('httpUrl') || '127.0.0.1',
			httpPort: window.localStorage.getItem('httpPort') || 8000,
			websocketUrl: window.localStorage.getItem('websocketUrl') || '127.0.0.1',
			websocketPort: window.localStorage.getItem('websocketPort') || '8000',
			visible: false,
		}
	},
	mounted() {
		this.$refs.btn.addEventListener('click', () => {
			if (!this.visible) {
				this.visible = true;
			}
		}, false)
		this.$refs.confirm.addEventListener('click', () => {
			window.localStorage.setItem('httpUrl', this.httpUrl);
			window.localStorage.setItem('httpPort', this.httpPort);
			window.localStorage.setItem('websocketUrl', this.websocketUrl);
			window.localStorage.setItem('websocketPort', this.websocketPort);
			this.visible = false;
		})
	}
}
</script>

<style scoped>
.settings-btn {
	background: transparent;
	position: absolute;
	right: 0;
	top: 0;
	outline: none;
	border: 0;
	opacity: 0.5;
  width: 40px;
  height: 36px;
  padding: 0;
  cursor: pointer;
}

.settings-btn:hover {
	opacity: 1;
}

.settings-btn svg {
  width: 40px;
  height: 36px;
}

.settings {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background: #ffffff;
	width: 600px;
	height: 144px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.settings > div {
	display: flex;
	padding: 0.5rem;
	width: 100%;
	box-sizing: border-box;
}

.settings label {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 50%;
	padding: 0 0.5rem;
	box-sizing: border-box;
}

.settings label input {
	padding: 0.25rem;
}

.confirm {
	display: flex;
	justify-content: center;
}

.confirm button {
	background: #4CACED;
	border: none;
	padding: 0.25rem 0.5rem;
	cursor: pointer;
}

.confirm button:active {
	background: #1AA3FF;
}
</style>