<template>
	<header>
		<div class="l-content">
			<el-button @click="changeIsCollapse" icon="el-icon-menu" size="mini"></el-button>
			<el-button @click="handlePush" icon="el-icon-data-line" size="mini" plain type="primary">数据可视化</el-button>
		</div>
		<div class="r-content">
			<el-dropdown trigger="click" szie="mini">
				<span class="el-dropdown-link">
					{{ userName }}
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="logout">安全退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</header>
</template>

<script>
export default {
	name: "menuHeader",
	data() {
		return {};
	},
	computed: {
		userName() {
			return this.$store.getters.info.name;
		}
	},

	methods: {
		changeIsCollapse() {
			this.$store.commit("changeIsCollapse");
		},
		handlePush() {
			this.$router.push({ name: "visualization" });
		},
		logout() {
			localStorage.removeItem("token");
			this.$store.state.userStore.menu = [];
			this.$store.state.userStore.info = [];
			this.$router.push({ name: "login" });
		}
	}
};
</script>

<style lang="scss" scoped>
header {
	display: flex;
	height: 100%;
	justify-content: space-between;
	align-items: center;
}

.l-content {
	display: flex;
	align-items: center;

	.el-button {
		margin-right: 20px;
	}
}

.r-content {
	cursor: pointer;

	.user {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: skyblue;
	}
}
</style>
