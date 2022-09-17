<template>
  <div>
    <!--     sort-change 排序未完善 -->
    <!--
      v-loading="tableConfig.isShowTableLoading"
      element-loading-background="rgba(150, 150, 150, 0.2)"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中"
-->
    <el-table
        :max-height="tableConfig.maxHeight"
        id="table"
        ref="table"
        v-loading="tableConfig.isShowTableLoading"
        :data="tableData"
        :default-expand-all="tableConfig.defaultExpandAll"
        :lazy="tableConfig.lazy"
        :load="load"
        :row-class-name="getRowClass"
        :expand-row-keys="expandRowKeys"
        :row-key="tableConfig.rowKey || ''"
        :show-summary="tableConfig.isShowSummary"
        :stripe="tableConfig.stripe"
        :summary-method="getSummaries"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        element-loading-background="rgba(196,196,196,0.4)"
        element-loading-spinne=" "
        element-loading-text="加载中"
        size="medium"
        style="width: 100%"
        :header-cell-style="{background:'rgba(0, 0, 0, 0.02)',color:'#606266'}"
        @expand-change="expandChange"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange">

      <!--      多选-->
      <el-table-column
          v-if="tableConfig.multiSelect"
          align="center"
          fixed="left"
          type="selection"
          width="70"
      ></el-table-column>
      <slot name="customize"></slot>

      <template v-if="tableConfig.isShowTableLoading" slot="empty">
        <span style="color: rgba(241,235,235,0.5);"></span>
      </template>
      <!--      序号-->
      <el-table-column
          v-if="tableConfig.sequence===undefined || tableConfig.sequence"
          align="center"
          fixed="left"
          label="序号"
          type="index"
          width="55">
        <template slot-scope="scope">
          {{ (curPageNum - 1) * pagination.page_size + scope.$index + 1 }}
        </template>
      </el-table-column>

      <!--      数据-->
      <el-table-column
          v-for="(item, index) in tableLabel "
          :key="index"
          :align="item.align"
          :fixed="item.fixed"
          :label="item.label"
          :prop="getProp(index,item)"
          :sortable="item.sortable ? 'custom' : false"
          :style="item.style"
          :min-width="item.minWidth ? item.minWidth : ''"
          :width="item.width ? item.width : ''"
          show-overflow-tooltip
      >
        <template slot-scope="scope">
          <!--          如果是普通数据-->
          <template v-if="!item.render">
            <!--            如果传入数组（时间格式数组）-->
            <!--如果是多层数据-->

            <span v-if="Array.isArray(item.prop)" :style="item.style">
              {{ getLocalDateArea(scope.row, item.prop) }}
            </span>

            <!--       如果是单层数据     -->
            <span v-else :style="item.style">{{
                scope.row[item.prop] ? scope.row[item.prop] : scope.row[item.prop] === 0 ? 0 : '—'
              }}</span>

          </template>

          <!--如果传入render判断数据-->
          <template v-else>
            <!--            <span :style="item.style">-->
            <!--              {{ build(scope.row, item) }}-->
            <!--            </span>-->
            <expandDom :column="item" :index="index" :render="item.render" :row="scope.row"></expandDom>
          </template>
        </template>
        <!--render函数-->

      </el-table-column>
      <!--   尾行按钮   -->
      <el-table-column
          v-if="tableHandle.label && !isHidden(tableHandle)"
          :align="tableHandle.align"
          :fixed="tableHandle.fixed"
          :label="tableHandle.label"
          :width="tableHandle.width"
          class-name="small-padding fixed-width"
      >
        <!-- button 事件-->
        <template slot-scope="scope">
          <template v-for="(item, thIdx) in tableHandle.optBtn">
            <span
                class="noneSelect"
                v-if="item.type === 'btn' && !isHidden(item)"
                :key="thIdx+'A'"
                :disabled="item.disabled"
                :style="item.style"
                style="cursor: pointer;"
                type="text"
            ><span
                v-if="permissionBtn(item,scope.row)"
                style="color:#1890FF"
                @click="item.method(thIdx, scope.row)">{{ item.label }}</span>
              <span v-else style="color: #a7a7a7">{{ item.label }}</span>
            </span>
            <!--下拉按钮事件-->
<!--            <div v-if="item.type === 'dropdown' " :key="thIdx" style="display: inline-block">-->
<!--              <el-dropdown v-if="permissionBtn(item,scope.row)">-->
<!--                <span :style="item.style" class="el-dropdown-link">{{ item.label }}<i-->
<!--                    class="el-icon-arrow-down el-icon&#45;&#45;right"></i> </span>-->
<!--                <el-dropdown-menu slot="dropdown">-->
<!--                  <el-dropdown-item-->
<!--                      v-if="permissionBtn(downItem,scope.row)"-->
<!--                      v-for="(downItem, downIndex) in item.downBtn"-->
<!--                      :key="downIndex"-->
<!--                      :style="downItem.style"-->
<!--                      @click.native.prevent="downItem.method(thIdx, scope.row)">-->
<!--                    <template>{{ downItem.label }}</template>-->
<!--                  </el-dropdown-item>-->
<!--                </el-dropdown-menu>-->
<!--              </el-dropdown>-->

<!--              <div v-else :key="thIdx" style="display: inline-block;margin-left: 15px">-->
<!--                <span class="el-dropdown-link" style="color: #a7a7a7">{{ item.label }}<i-->
<!--                    class="el-icon-arrow-down el-icon&#45;&#45;right"></i> </span>-->
<!--              </div>-->
<!--            </div>-->

          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件-->
    <el-pagination
        v-if="!tableConfig.isShowPagination"
        :current-page="curPageNum"
        :layout="tableConfig.isChangeSize?tableConfig.isChangeSize:'prev, pager, next,total, jumper'"
        :page-size="pagination.page_size"
        :page-sizes="[10,15,30]"
        :total="pageTotal"
        background
        class="table-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
// import { dateFormat } from '@/utils/date'
import { Loading } from 'element-ui'

export default {
  data() {
    return {}
  },
  props: {
    // 配置
    tableConfig: {
      type: Object,
      default: () => ({
        rowKey: '',
        rowClass: null,
        isShowTableLoading: false,
        lazy: false, // 是否懒加载
        sequence: false, // 是否显示序号
        isShowSummary: false, // 是否在表尾显示合计行
        stripe: false, // 是否为斑马纹 table
        highlightCurrentRow: false, // 是否要高亮当前行
        border: false, // 是否带有纵向边框
        defaultExpandAll: false
      })
    },

    // 数据
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 数据标签
    tableLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    expandRowKeys: {
      type: Array,
      default: () => {
        return null
      }
    },
    isShowPagination: {
      type: Boolean,
      default: true
    },

    pagination: {
      type: Object,
      default: () => {
        return {
          isChangeSize: null,
          page_num: 1,
          page_size: 5,
          total: 0
        }
      }
    },

    tableHandle: {
      type: Object,
      default: () => {
        return {}
      }
    }

  },
  components: {
    /**
     * render函数渲染组件
     * */
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        }
        if (ctx.props.column) params.column = ctx.props.column
        return ctx.props.render(h, params)
      }
    }
  },
  watch: {},
  computed: {
    curPageNum() {
      return this.pagination.page_num ? this.pagination.page_num : 1
    },
    pageTotal() {
      return this.pagination.total ? this.pagination.total : 0
    }
  },
  mounted() {
  },
  methods: {
    load(tree, treeNode, resolve) {
      this.$emit('loader', { tree, treeNode, resolve })
    },
    loadingStyle() {
      this.loading && this.loading.close() // 这里是为了防止还没有请求结束（loading未关闭）再次连续触发
      // Loading.service(options); 是直接调用了
      this.loading = Loading.service({
        // background: 'rgba(196,196,196,0.4)', // 背景色
        // spinner: ' ', // 加载图标
        // 可以直接使用选择器名称，当然也可以用ref获取DOM结构，可以提前把DOM结构缓存起来，
        // 这样频繁被触发的时候是不是就不会重新获取DOM了呢？好像可以提升一丢丢性能吧（个人理解）
        target: document.querySelector('.el-table__body-wrapper') // loading需要覆盖的DOM节点，默认为body
        // lock: true, //锁定屏幕的滚动
        // text: '拼命加载中' // 加载文案
        //
      })
    },
    isHidden(item) {
      if (typeof (item.isHidden) !== 'function') {
        return false
      }
      return item.isHidden()
    },
    /**
     * 判断是否为数组，否则为string，number,boolean
     * @param btnItem 按钮列表
     * @param tableRow 表格当行数据
     * @returns {boolean}
     */
    permissionBtn(btnItem, tableRow) {
      // console.log(btnItem.permissionConfig)
      let result = true
      for (const permissionConfigKey in btnItem.permissionConfig) {
        const permissionData = btnItem.permissionConfig[permissionConfigKey]
        if (permissionData) {
          if (Array.isArray(permissionData)) {
            if (permissionData.indexOf(tableRow[permissionConfigKey]) === -1) {
              result = false
              break
            }
          } else if (typeof permissionData === 'string' || typeof permissionData === 'number' || typeof permissionData === 'boolean') {
            console.log(tableRow)
            console.log(permissionConfigKey)
            console.log(tableRow[permissionConfigKey])

            if (tableRow[permissionConfigKey].toString() !== btnItem.permissionConfig[permissionConfigKey].toString()) {
              result = false
              break
            }
          } else {
            console.log(btnItem.permissionConfig)
          }
        }
      }
      if (btnItem.permissionReverse) {
        return !result
      }
      return result
    },

    // 获取prop参数
    getProp(index, item) {
      if (!item.prop) {
        return ''
      }
      if (typeof item.prop === 'string') {
        return item.prop
      } else if (item.prop[0] === 'stitchingDataList') {
        return item.prop[1]
      } else if (item.prop[0] === 'time') {
        if (item.prop[0] === 'time') {
          if (item.prop.length === 3) {
            return item.prop[item.prop.length - 1]
          }
        }
      }
    },
// 判断是否需要展示下拉按钮
    filterBtn(item, row) {
      let condition
      let display
      if (item.condition.length === 0 && item.display.length === 0) {
        return true
      } else {
        for (let i = 0; i < item.condition.length; i++) {
          condition = item.condition[i]

          for (let j = 0; j < item.display.length; j++) {
            display = item.display[j]

            if (display === row[condition]) {
              return display === row[condition]
            }
          }
        }
      }
    },
    filDrop(downItem, item, thIdx, row) {
      // 操作下拉框权限
      if (downItem.optAllow.length === 0) {
        return downItem.label
      } else {
        for (var s = 0; s < downItem.optAllow.length; s++) {
          if (downItem.optAllow[s] === row.status) {
            return downItem.label
          }
        }
      }
    },
    // 判断表格是否有子项，无子项不显示展开按钮
    getRowClass(row) {
      // children 是你子项的数组 key
      if (this.tableConfig.rowClass && row.row[this.tableConfig.rowClass].length === 0) {
        return 'row-expand-cover'
      }
    },
    // 合计算法
    getSummaries(val) {
      let data = []
      this.$emit('getSummaries', val, sss => {
        data = sss
      })
      return data
    },
    // 多行选中
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.$emit('handleSizeChange', Number(val))
    },
    // 当表格的当前行发生变化的时候会触发该事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.$emit('handleCurrentChange', Number(val))
    },
    // 展开行
    expandChange(row, expandedRows) {
      this.$emit('expandChange', { row, expandedRows })
    },
    // 当表格的排序条件发生变化的时候会触发该事件
    sortChange(column) {
      this.$emit('sortChange', column)
    },
    closeSortChange() {
      this.$refs.table.clearSort()
    },

    /****
     * 获取时间 time
     * @param row   数据
     * @param item   传入的字段
     * @returns {string|*}
     * item：1、格式；2、开始时间；3、结束时间；4、时间连接符号
     * prop: ['time', 'YYYY-mm-dd', 'start_at'],
     * prop: ['time', 'YYYY/mm/dd', 'start_at', 'end_at', '-'],
     *
     * 获取对象 obj
     * @param row   数据
     * @param item   传入的字段
     * @returns {string|*}
     * prop: ['obj', 'ys_company', 'name'],
     *
     *  拼接数据 1 ： stitchingData
     *  prop: ['stitchingData', 'related_driver', 'name'],

     *
     *  拼接数据 2 ： stitchingDataList
     *  prop: ['stitchingDataList', 'measures'],
     */
    getLocalDateArea(row, item) {
      // 判断是否传入结束时间
      if (item[0] === 'time') {
        if (item.length === 3) {
          if (row[item[2]] === 0 || row[item[2]] === null || row[item[2]] === undefined) {
            // 当日期时间戳为0
            return '—'
          } else {
            // 输出当个时间格式
            return this.getLocalDate(item[1], row[item[2]])
          }
        } else if (row[item[2]] === 0 || row[item[2]] === null || row[item[2]] === undefined || row[item[3]] === 0 || row[item[3]] === null || row[item[3]] === undefined) {
          // 当日期范围时间戳为0
          return '—'
        } else {
          // 输出日期范围
          return this.getLocalDate(item[1], row[item[2]]) + item[4] + this.getLocalDate(item[1], row[item[3]])
        }
      } else if (item[0] === 'obj') {
        // 多层数据
        let res = row[item[1]]
        for (let index = 2; index < item.length; index++) {
          // 当设置字段无
          if (res === undefined || res === null) {
            return '—'
          } else {
            // 拼接层数
            res = res[item[index]]
          }
        }
        // 当输出字段为空或无
        if (res === '' || res === undefined || res === null) {
          return '—'
        } else {
          return res
        }
      } else if (item[0] === 'stitchingData') {
        // stitchingData
        // 拼接数据
        const stitchingList = row[item[1]]
        let stitchingDataStr
        for (let sd = 0; sd < stitchingList.length; sd++) {
          stitchingDataStr = stitchingList.map(p => p[item[2]]).join(';')
        }
        if (stitchingDataStr === '' || stitchingDataStr === undefined || stitchingDataStr === null) {
          return '—'
        } else {
          return stitchingDataStr
        }
      } else if (item[0] === 'stitchingDataList') {
        // stitchingDataList
        // 拼接数据
        const stitchingList = row[item[1]]
        let stitchingDataStr = ''
        for (let sd = 0; sd < stitchingList.length; sd++) {
          stitchingDataStr = stitchingDataStr + stitchingList[sd] + ';'
        }
        if (stitchingDataStr === '' || stitchingDataStr === undefined || stitchingDataStr === null) {
          return '—'
        } else {
          return stitchingDataStr
        }
      }
    },
    // getLocalDate(format, timestamp) {
    //   if (timestamp) {
    //     return dateFormat(format, new Date(parseInt(timestamp) * 1000))
    //   }
    //   return '—'
    // }
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
