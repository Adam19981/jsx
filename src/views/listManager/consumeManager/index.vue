<template>
  <div>
    <el-form :model="params" inline @submit.native.prevent>
      <el-form-item prop="title">
        <el-input v-model="params.title" placeholder="请输入标题" style="width: 200px"
                  @change="handleSearch"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button style="margin-bottom: 20px" @click="handleAdd" type="primary">新增</el-button>
    </div>
    <m-table ref="tableEl" :table-label="tableLabel" :max-height="height" :request-api="getConsumeList"
             :params="params">
      <template #operation="scope">
        <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
        <el-button type="text" style="color: crimson" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </m-table>

    <m-dialog v-model="active" :handle-submit="handleSubmit" @close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
               label-position="top">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="message">
          <el-input v-model="ruleForm.message"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createdAt">
          <el-date-picker
              v-model="ruleForm.createdAt"
              type="datetime"
              value-format="timestamp"
              style="width: 100%"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </m-dialog>
  </div>
</template>

<script>
import tableLabel from "./config";

import axios from "axios";
import MDialog from "@/components/dialog";
import qs from "qs";

export default {
  name: "consumeManager",
  components: {MDialog},
  data() {
    return {
      tableLabel,
      ruleForm: {
        title: "",
        message: "",
        age: undefined,
        createdAt: undefined
      },
      mode: "add",
      rules: {
        title: {required: true, message: "请输入标题", trigger: "blur"},
        message: {required: true, message: "请输入描述", trigger: "blur"},
        age: [
          {required: true, message: "请输入年龄", trigger: "blur"},
          {type: "number", message: "年龄必须为数字值"}
        ],
        createdAt: {required: true, message: "请选择创建时间", trigger: "blur"}
      },
      active: false,
      params: {
        title: ""
      },
      id: "",
      height: window.innerHeight - 330
    };
  },
  mounted() {
    window.addEventListener("resize", this.$modal.debounceFun(this.watchWindowHeight, 500));
  },
  methods: {
    async handleClick(row) {
      this.mode = "edit";
      this.id = row.id;
      const response = await axios.get("http://localhost:5000/table/get", {params: {id: row.id}});
      console.log(response);
      response.data.data.createdAt = response.data.data.createdAt * 1000
      this.ruleForm = response.data.data;
      this.active = true;
    },
    handleSearch() {
      this.$refs.tableEl.getQuery();
    },
    async handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(async () => {
            await axios.get("http://localhost:5000/table/delete", {params: {id: row.id}});
            this.$message.success("删除成功");
            this.$refs.tableEl.getQuery();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
    },
    async getConsumeList(req) {
      return await axios.get("http://localhost:5000/table/list", {params: req});
    },
    watchWindowHeight() {
      this.height = window.innerHeight - 330;
    },
    handleAdd() {
      this.mode = "add";
      this.active = true;
    },
    async handleSubmit() {
      await this.$refs.ruleForm.validate();
      this.ruleForm.age = Number(this.ruleForm.age);
      const req = {...this.ruleForm}
      req.createdAt = Math.round(req.createdAt / 1000)
      if (this.mode === "add") {
        await axios.post("http://localhost:5000/table/add", qs.stringify(req));
      } else {
        await axios.post("http://localhost:5000/table/update", qs.stringify({...req, id: this.id}));
      }
      this.$message.success("保存成功");
      this.$refs.tableEl.getQuery();
      this.active = false;
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style scoped></style>
