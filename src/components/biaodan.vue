<template>
<div>
    <el-form ref="form" :model="form" label-width="100px" :inline='inline'>
        <el-form-item v-for="item in formlist" :key="item.label" :label="item.label">
            <el-input v-if="item.type==='input'" placeholder="请输入" v-model='form[item.model]'></el-input>
            <el-date-picker v-if="item.type==='date'" v-model='form[item.model]' value-format="yyyy-mm-dd" type="date"></el-date-picker>
            <el-switch v-if="item.type==='switch'" v-model='form[item.model]'></el-switch>
            <el-select v-if="item.type==='select'" v-model='form[item.model]'>
                <el-option v-for=' item in item.option' :key='item.value' :value="item.label" :label="item.label"></el-option>
            </el-select>    
        </el-form-item>
        <el-form-item><slot></slot></el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    name:'biaodan',
    props:{
        formlist:Array,
        form:Object,
        inline:Boolean
                }
}
</script>

<style>

</style>