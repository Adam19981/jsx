import otherSideStyle from "./index.module.scss";

const otherSide = {
	name: "otherSide",
	data() {
		return {};
	},
	computed: {
		isCollapse() {
			return this.$store.getters.isCollapse;
		},
		getMenu() {
			return this.$store.getters.menu;
		}
	},
	methods: {
		clickMenu(menu) {
			this.$router.push({ name: menu.name });
			this.$store.commit("addBreadcrumb", menu);
		},
		setChildrenMenu(menu) {
			return (
				<el-submenu index={menu.path} style={{ textAlign: "left" }}>
					<template slot="title">
						<i class={menu.meta.icon} />
						<span>{menu.meta.title}</span>
					</template>
					<el-menu-item-group>
						{menu.children.map(item => {
							return this.setMenu(item);
						})}
					</el-menu-item-group>
				</el-submenu>
			);
		},
		setNoChildrenMenu(menu) {
			return (
				<el-menu-item
					style={{ textAlign: "left" }}
					index={menu.path}
					onClick={() => {
						this.clickMenu(menu);
					}}
				>
					<i class={menu.meta.icon} />
					<span>{menu.meta.title}</span>
				</el-menu-item>
			);
		},
		setMenu(menu) {
			return menu.meta.hidden ? null : menu.meta.showChildren ? this.setChildrenMenu(menu) : this.setNoChildrenMenu(menu);
		}
	},
	render() {
		return (
			<el-menu
				style={{ height: "100%", textAlign: "center", width: "200px" }}
				class={otherSideStyle.menuDiv}
				textColor="#fff"
				activeTextColor="#6495ED"
				collapse={this.isCollapse}
			>
				<h3 class={otherSideStyle.title}>{this.isCollapse ? "后台" : "通用后台管理系统"}</h3>
				{this.getMenu.map(menu => {
					return this.setMenu(menu);
				})}
			</el-menu>
		);
	}
};
export default otherSide;
