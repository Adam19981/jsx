<template>
	<m-table :table-label="tableLabel" :max-height="height" :request-api="getConsumeList">
		<template #operation="scope">
			<el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
			<el-button type="text" style="color: crimson" @click="handleDelete(scope.row)">删除</el-button>
		</template>
	</m-table>
</template>

<script>
import tableLabel from "./config";
import { getConsumeList } from "@/api/consumeList";

export default {
	name: "consumeManager",
	data() {
		return {
			tableLabel,
			height: window.innerHeight - 210
		};
	},
	mounted() {
		window.addEventListener("resize", this.$modal.debounceFun(this.watchWindowHeight, 500));
	},
	methods: {
		handleClick(row) {
			console.log(row);
		},
		handleDelete() {},
		getConsumeList,
		watchWindowHeight() {
			this.height = window.innerHeight - 210;
		}
	}
};
</script>

<style scoped></style>
