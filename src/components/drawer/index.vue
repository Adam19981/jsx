<template>
	<el-drawer
		:title="title"
		:visible="drawerVisible"
		:with-header="withHeader"
		:show-close="showClose"
		:direction="direction"
		:modal-append-to-body="modalAppendToBody"
		:modal="modal"
		:append-to-body="appendToBody"
		:close-on-press-escape="closeOnPressEscape"
		:before-close="handleBeforeClose"
	>
		<slot name="default"></slot>
		<slot class="demo-drawer__footer" v-if="isShowFooter">
			<el-button @click="handleClose">{{ closeText }}</el-button>
			<el-button type="primary" @click="handleSubmit">{{ submitText }}</el-button>
		</slot>
	</el-drawer>
</template>

<script>
import { createProp } from "@/utlis/propsDefault";

export default {
	name: "mDrawer",
	props: {
		title: createProp.createString("标题"),
		isShowFooter: createProp.createBoolean(true),
		modal: createProp.createBoolean(true), //是否需要遮罩层
		modalAppendToBody: createProp.createBoolean(true), //遮罩层是否插入至 body 元素上
		withHeader: createProp.createBoolean(true), //控制是否显示 header 栏
		direction: createProp.createString("rtl"), //Drawer 打开的方向 rtl / ltr / ttb / btt
		showClose: createProp.createBoolean(true), //是否显示关闭按钮
		appendToBody: createProp.createBoolean(), //嵌套的 drawer 必须指定该属性并赋值为 true
		closeOnPressEscape: createProp.createBoolean(true), //是否可以通过按下 ESC 关闭 drawer
		handleSubmit: createProp.createFunction(), //确认按钮方法
		submitText: createProp.createString("确认"),
		closeText: createProp.createString("取消")
	},
	data() {
		return {
			drawerVisible: false
		};
	},
	methods: {
		handleBeforeClose(done) {
			if (this.isShowFooter) {
				this.$confirm("此操作将不会保存内容, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						done();
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消"
						});
					});
			} else {
				done();
			}
		},
		handleClose() {
			this.drawerVisible = false;
		},
		handleOpen() {
			this.drawerVisible = true;
		}
	}
};
</script>

<style scoped></style>
