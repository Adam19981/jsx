<template>
  <el-dialog
      :title="title"
      :visible="dialogVisible"
      :modal="modal"
      :modal-append-to-body="modalAppendToBody"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      :append-to-body="appendToBody"
      :before-close="handleBeforeClose">
    <slot name="default"></slot>
    <slot name="footer" class="dialog-footer" v-if="isShowFooter">
     <el-button @click="handleClose">{{closeText}}</el-button>
     <el-button type="primary" @click="handleSubmit">{{submitText}}</el-button>
  </slot>
  </el-dialog>
</template>

<script>
import {createProp} from "@/utlis/propsDefault";

export default {
  name: "mDialog",
  props: {
    isShowFooter: createProp.createBoolean(true),
    title:createProp.createString('标题'),
    modal: createProp.createBoolean(true),//是否需要遮罩层
    modalAppendToBody: createProp.createBoolean(true),//遮罩层是否插入至 body 元素上
    appendToBody:createProp.createBoolean(),//嵌套的 Dialog 必须指定该属性并赋值为 true
    closeOnClickModal:createProp.createBoolean(true),//是否可以通过点击 modal 关闭 Dialog
    closeOnPressEscape:createProp.createBoolean(true),//是否可以通过按下 ESC 关闭 Dialog
    showClose:createProp.createBoolean(true),//是否显示关闭按钮
    handleSubmit:createProp.createFunction(),//确认按钮方法
    submitText:createProp.createString('确认'),
    closeText:createProp.createString('取消'),
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleBeforeClose(done){
      if (this.isShowFooter){
        this.$confirm('此操作将不会保存内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          done()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }else{
        done()
      }
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleOpen(){
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>