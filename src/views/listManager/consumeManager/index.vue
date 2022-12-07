<template>
	<div>
		<el-form :model="params" inline @submit.native.prevent>
			<el-form-item prop="title">
				<el-input v-model="params.title" placeholder="请输入标题" style="width: 200px" @change="handleSearch"></el-input>
			</el-form-item>
		</el-form>
		<div>
			<el-button style="margin-bottom: 20px" @click="handleAdd" type="primary">新增</el-button>
		</div>
		<m-table ref="tableEl" :table-label="tableLabel" :max-height="height" :request-api="getConsumeList" :params="params">
			<template #operation="scope">
				<el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
				<el-button type="text" style="color: crimson" @click="handleDelete(scope.row)">删除</el-button>
			</template>
		</m-table>

		<m-dialog v-model="active"></m-dialog>
	</div>
</template>

<script>
import tableLabel from "./config";

import axios from "axios";
import MDialog from "@/components/dialog";
// import { getConsumeList } from "@/api/consumeList";

export default {
	name: "consumeManager",
	components: { MDialog },
	data() {
		return {
			tableLabel,
			active: false,
			params: {
				title: ""
			},
			height: window.innerHeight - 330
		};
	},
	mounted() {
		window.addEventListener("resize", this.$modal.debounceFun(this.watchWindowHeight, 500));
	},
	methods: {
		handleClick(row) {},
		handleSearch() {
			this.$refs.tableEl.getQuery();
		},
		handleDelete() {},
		async getConsumeList(req) {
			return await axios.get("http://localhost:5000/table/list", { params: req });
		},
		watchWindowHeight() {
			this.height = window.innerHeight - 330;
		},
		handleAdd() {
			this.active = true;
		}
	}
};
</script>

<style scoped></style>
