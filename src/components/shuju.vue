<template>
<div>
    <el-table :data='tablelist' height="700">
        <el-table-column v-for="item in tableform" :key="item.prop" :prop='item.prop' :label="item.label" :width="item.width?item.width:100">
        </el-table-column>
        <el-table-column label='操作' width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="chakan(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteitem(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
  :page-size="12"
  :pager-count="11"
  layout="prev, pager, next"
  :total="tablelist.length">
</el-pagination>
</div>
</template>

<script>
export default {
    name:'shuju',
    props:{
        tablelist:Array,
        tableform:Array
    },
    methods: {
        chakan(row){
            this.$emit('edituser',row)
        },
        deleteitem(row){
            this.$emit('delteuser',row)
            console.log(row);
        }
    },
}
</script>

<style>
.el-pagination{
    float:right;
}
</style>