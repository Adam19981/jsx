<template>
  <el-form
      :model="model"
      :rules="rules"
      :inline="inline"
      :disabled="disabled"
      :label-position="labelPosition"
      :hide-required-asterisk="hideRequiredAsterisk"
      :size="size"
      @submit.native.prevent
  >
    <el-form-item
        v-for="(item,index) in formList"
        :key="index"
        :prop="item.prop">
      <template #label v-if="isShowLabel">
        <span>{{item.label}}</span>
      </template>


     <!--多选框-->
      <el-radio-group
          v-if="item.type==='radio'"
          v-model="item.prop"
          :disabled="item.disabled">
        <el-radio
            v-for="(radio,index) in item.enum"
            :label="radio.value"
            :border="item.border"
            :key="index">
          {{radio.label}}
        </el-radio>
      </el-radio-group>

      <!--输入框-->
      <el-input
          v-if="item.type==='input'"
          v-model="item.prop"
          :placeholder="'请输入'+item.label"
          :clearable="item.clearable"
          :show-password="item.showPassword"
          :type="item.textarea"
          :maxlength="item.maxLength"
          :disabled="item.disabled"/>


      <!--数字输入框-->
      <el-input-number
          v-if="item.type==='inputNumber'"
          v-model="item.prop"
          :min="item.min"
          :max="item.max"
          :step="item.step"
          :disabled="item.disabled"
          :controls-position="item.controlsPosition"/>

       <!--选择器-->
      <el-select
          v-if="item.type==='select'"
          v-model="item.prop"
          :disabled="item.disabled"
          :placeholder="'请选择'+item.label"
          :clearable="item.clearable"
          :filterable="item.filterable"
      >
        <el-option
            v-for="(option,index) in item.enum"
            :key="index"
            :disabled="option.disabled"
            :label="option.label"
            :value="option.value"
        />
      </el-select>


       <!--开关-->
      <el-switch
          v-model="item.prop"
          :disabled="item.disabled"
          :active-color="item.activeColor"
          :inactive-color="item.inactiveColor"/>

       <!--多选框-->
      <el-checkbox-group
          v-model="item.prop"
          :disabled="item.disabled"
          :min="item.min"
          :max="item.max"
          :text-color="item.textColor"
      >
        <el-checkbox
            v-for="(checkbox,index) in item.enum"
            :key="index"
            :border="checkbox.border"
            :label="checkbox.value"
            >
          {{checkbox.name}}
        </el-checkbox>
      </el-checkbox-group>

      <el-cascader
          v-model="item.prop"
          :options="item.enum"
          :props="item.props"
          :placeholder="'请选择'+item.label"
          :disabled="item.disabled"
          :clearable="item.clearable"
          :separator="item.separator"
          :filterable="item.filterable"
      >

      </el-cascader>

    </el-form-item>
  </el-form>
</template>

<script>
import {createProp} from "@/utlis/propsDefault";
export default {
  name: "mForm",
  props:{
    model:createProp.createObject(),
    rules:createProp.createObject(),
    inline:createProp.createBoolean(),
    labelPosition:createProp.createString('right'),
    hideRequiredAsterisk:createProp.createBoolean(),
    size:createProp.createString('medium'),
    disabled:createProp.createBoolean(),
    formList:createProp.createArray(),
    isShowLabel:createProp.createBoolean(true)
  }
}
</script>

<style scoped>

</style>