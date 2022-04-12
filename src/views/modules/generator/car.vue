<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-lable>车牌号：</el-lable>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="请输入车牌号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('generator:car:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('generator:car:delete')" type="danger" @click="deleteHandle()"
                   :disabled="dataListSelections.length <= 0">批量删除
        </el-button>
      </el-form-item>
    </el-form>

    <el-tabs type="border-card" v-model="dataForm.group" @tab-click="handleCarTabsClick">
      <el-tab-pane label="全部">车辆总数{{ dataList.length }}辆</el-tab-pane>
      <el-tab-pane label="待年检">待年检车{{ dataList.length }}辆</el-tab-pane>
      <el-tab-pane label="待续保">待续保车{{ dataList.length }}辆</el-tab-pane>
      <el-tab-pane label="待保养">待保养车{{ dataList.length }}辆</el-tab-pane>
    </el-tabs>

    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>

      <el-table-column
        prop="carlicencenum"
        header-align="center"
        align="center"
        label="车牌/车型">
        <template slot-scope="scope">

          <el-tag>{{ scope.row.carlicencenum }}</el-tag>
          <p style="font-size:18px;font-weight:bold">{{ scope.row.vehicle.vehiclename }}</p>
          <p>车架号{{ scope.row.framenum }}</p>
          <p>发动机号{{ scope.row.enginenum }}</p>

        </template>

      </el-table-column>

      <el-table-column
        prop="store"
        header-align="center"
        align="center"
        label="门店">
      </el-table-column>
      <el-table-column
        prop="carcurrentstatus"
        header-align="center"
        align="center"
        label="运营状态">

        <template slot-scope="scope">
          <el-tag type="danger">{{ scope.row.carcurrentstatus }}</el-tag>
          <p>{{ scope.row.reviewstate }}</p>
        </template>

      </el-table-column>


      <el-table-column
        prop="insurancedays"
        header-align="center"
        align="center"
        label="到期提醒天数">
        <template slot-scope="scope">
          <p v-if="scope.row.insuranceday!=''" style="font-size:20px;font-weight:bold;color:orange">
            剩余{{ scope.row.insuranceday }}天续保</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="currentmileage"
        header-align="center"
        align="center"
        label="当前车辆里程数">
      </el-table-column>
      <el-table-column
        prop="remainmileage"
        header-align="center"
        align="center"
        label="下次保养公里数">
      </el-table-column>
      <el-table-column
        prop="vehicle"
        header-align="center"
        align="center"
        label="车型图片">
        <template slot-scope="scope">
          <img :src="scope.row.vehicle.imageurl" style="width:100px;height:100px;"/>
        </template>

      </el-table-column>

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './car-add-or-update'

export default {
  data () {
    return {
      dataForm: {
        key: '',
        group: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  activated () {
    this.getDataList()
  },
  methods: {

    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/generator/car/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'key': this.dataForm.key,
          'group': this.dataForm.group
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },

    handleCarTabsClick () {
      this.getDataList()
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/generator/car/delete'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    }
  }
}
</script>

