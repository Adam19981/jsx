<template>
  <div>
    <el-table
        :max-height="maxHeight"
        id="table"
        ref="table"
        v-loading="isLoading"
        :data="tableData"
        :default-expand-all="defaultExpandAll"
        :lazy="lazy"
        :row-key="rowKey"
        :show-summary="isShowSummary"
        :stripe="stripe"
        :tree-props="treeProps"
        element-loading-background="rgba(196,196,196,0.4)"
        element-loading-spinne=" "
        element-loading-text="加载中"
        size="medium"
        style="width: 100%"
        :header-cell-style="{background:'rgba(0, 0, 0, 0.02)',color:'#606266'}"
        @selection-change="handleSelectionChange"
        >

      <div  v-for="(item, index) in tableLabel" :key="index">

        <el-table-column
            v-if="item.type==='index'"
            align="center"
            fixed="left"
            label="序号"
            type="index"
            width="55">
        </el-table-column>

        <el-table-column
            v-if="item.type==='selection'"
            align="center"
            fixed="left"
            type="selection"
            width="70"
        ></el-table-column>

        <!--      数据-->
        <el-table-column
            :key="index"
            :align="item.align"
            :fixed="item.fixed"
            :label="item.label"
            :prop="item.prop"
            :sortable="item.sortable ? 'custom' : false"
            :style="item.style"
            :min-width="item.minWidth ? item.minWidth : ''"
            :width="item.width ? item.width : ''"
            show-overflow-tooltip
        >
          <template v-slot="scope">
            <!--如果是函数组件-->
            <component v-if="item.render" :is="item.render(h,scope.row)"></component>

            <!--时间格式-->
            <span v-else-if="item.dateFormat">{{$modal.getLocalDate(item.dateFormat,scope.row[item.prop])}}</span>

            <!--普通数据-->
            <span v-else>{{scope.row[item.prop]}}</span>
          </template>

        </el-table-column>
      </div>

    </el-table>

    <!-- 分页组件-->
    <el-pagination
        v-if="isShowPagination"
        :current-page="pagination.pageNum"
        :layout="pageLayout"
        :page-size="pagination.pageSize"
        :page-sizes="[10,15,30]"
        :total="total"
        background
        class="table-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import h from 'vue'
import {createProp} from "@/utlis/propsDefault";

export default {
  name:'MTable',
  data() {
    return {
      h,
      tableData:[],
      isLoading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      selectList:[],
      deepCopy:{...this.params}
    }
  },
  props: {
    maxHeight:createProp.createNumber(),//最大高度
    defaultExpandAll:createProp.createBoolean(),//是否展开全部
    rowKey:createProp.createString(),//唯一标识
    lazy:createProp.createBoolean(),// 是否懒加载
    isShowSummary:createProp.createBoolean(), // 是否在表尾显示合计行
    stripe:createProp.createBoolean(),// 是否为斑马纹 table
    highlightCurrentRow:createProp.createBoolean(),// 是否要高亮当前行
    border: createProp.createBoolean(), // 是否带有纵向边框
    tableLabel:createProp.createArray(),    // 列数据
    isShowPagination: createProp.createBoolean(true), //是否展示分页器
    pageLayout: createProp.createString('prev, pager, next,total, jumper'),//分页器配置
    treeProps:createProp.createObject({children: 'children', hasChildren: 'hasChildren'}),//树结构的配置
    params:createProp.createObject(), //请求接口参数
    requestApi:createProp.createFunction(), //请求接口
  },
  components: {},
  mounted() {
    this.getQuery()
  },
  methods: {
    // 多行选中
    handleSelectionChange(val) {
      this.selectList = val
    },
    // 分页
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getQuery()
    },
    // 当表格的当前页发生变化的时候会触发该事件
    handleCurrentChange(val) {
      this.pagination.pageNum = val
      this.getQuery()
    },
    async getQuery() {
      const allParams =  Object.assign({},this.params,this.pagination)
      this.isLoading = true
      const response =  await this.requestApi(allParams)
      this.isLoading = false
      this.tableData = response.data
      this.total = response.total
    }
  }
}
</script>

<style lang='less' scoped>

.table-pagination {
  margin-top: 20px;
  text-align: center;
}

/* 单行table颜色*/
.el-table .select-color {
  background: #f0f1f9;
}

/deep/ .el-table:before {
  height: 0;
}

/deep/ .el-loading-spinner .circular {
  width: 0;
}

/deep/ .customer-table .el-table__fixed-right:before,
/deep/ .el-table__fixed:before {
  width: 0;
}

/deep/ .el-table .row-expand-cover .cell .el-table__expand-icon {
  display: none;
}

/deep/ .el-loading-spinner {
  width: 50px;
  height: 50px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

}

/deep/ .el-loading-spinner:before {
  content: '';
  width: 50px;
  height: 5px;
  background: #fff;
  opacity: 0.7;
  position: absolute;
  top: 59px;
  left: 0;
  border-radius: 50%;
  animation: shadow .5s linear infinite;
}

/deep/ .el-loading-spinner:after {
  content: '';
  width: 50px;
  height: 50px;
  background: #49c9e0;
  animation: animate .5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
}

@keyframes animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow {
  0%, 100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
}

/deep/ .el-loading-text {
  margin-top: 30px;
  width: 5em;
  transform: translateX(-15%);
}

/deep/ .el-table__header,
/deep/ .el-table__body,
/deep/ .el-table__footer {
  width: 100% !important;
  table-layout: fixed !important;

  .cell.el-tooltip {
    width: auto !important;
  }
}

/deep/ .el-table--scrollable-x .el-table__body-wrapper {
  z-index: 1;
}

</style>
