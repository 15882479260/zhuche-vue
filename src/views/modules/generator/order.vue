<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="订单号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('generator:order:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('generator:order:delete')" type="danger" @click="deleteHandle()"
                   :disabled="dataListSelections.length <= 0">批量删除
        </el-button>
      </el-form-item>
    </el-form>
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
        prop="createtime"
        header-align="center"
        align="left"
        label="创建时间">
        <template slot-scope="scope">
          <p style="font-size:18px;font-weight:bold">
            {{ scope.row.createtime.substring(0, scope.row.createtime.length - 3) }}</p>
          <p>订单号:{{ scope.row.id }}</p>
        </template>
      </el-table-column>


      <el-table-column
        prop="contactdetail"
        header-align="center"
        align="left"
        label="承租人">
        <template slot-scope="scope">
          <p style="font-size:18px;font-weight:bold">{{ scope.row.contactdetail.CustomerName }}</p>
          <p>{{ scope.row.contactdetail.TelePhone }}</p>
        </template>
      </el-table-column>

      <el-table-column
        prop="baseorder"
        header-align="center"
        align="center"
        label="预计取还车时间">
        <template slot-scope="scope">
          <el-tag size="mini">预取</el-tag>
          <span style="font-size:18px;font-weight:bold">{{ scope.row.baseorder.BookingPickupTime }}</span><br/>
          <el-tag size="mini">预还</el-tag>
          <span style="font-size:18px;font-weight:bold">{{ scope.row.baseorder.PickoffTime ? scope.row.baseorder.PickoffTime :scope.row.baseorder.BookingPickoffTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="baseorder"
        header-align="center"
        align="center"
        label="续租取还车时间">
        <template slot-scope="scope">
          <el-row v-if="scope.row.baseorder.PickoffTime">
            <el-tag size="mini">续租起始时间</el-tag>
            <span style="font-size:18px;font-weight:bold">{{ scope.row.baseorder.PickupTime }}</span><br/>
            <el-tag size="mini">续租预还时间</el-tag>
            <span style="font-size:18px;font-weight:bold">{{ scope.row.baseorder.PickoffTime }}</span>
          </el-row>
          <el-row v-else>
            <span style="font-size:18px;font-weight:bold">未续租</span><br/>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        prop="baseorder"
        header-align="center"
        align="center"
        label="租期">
        <template slot-scope="scope">

          <span>{{ dueDate(scope.row.baseorder) }}</span>

        </template>
      </el-table-column>
      <el-table-column
        prop="vehicledetail.vehiclefullname"
        header-align="center"
        align="center"
        label="预定车型">
      </el-table-column>
      <el-table-column
        prop="baseorder"
        header-align="center"
        align="left"
        label="取车门店/取车地址">
        <template slot-scope="scope">
          <p style="font-weight:bold">{{ scope.row.baseorder.PickupStore.shopname }}</p>
          <el-tag size="mini">{{ scope.row.baseorder.PickUpType === '上门取还' ? '送车上门' : '门店取车' }}</el-tag>
          <p style="font-weight:bold">{{ scope.row.baseorder.PickupStore.shopaddress }}</p>
        </template>
      </el-table-column>

      <el-table-column
        prop="baseorder"
        header-align="center"
        align="left"
        label="还车门店/还车地址">
        <template slot-scope="scope">
          <p style="font-weight:bold">{{ scope.row.baseorder.PickoffStore.shopname }}</p>
          <el-tag size="mini">{{ scope.row.baseorder.PickUpType === '上门取还' ? '上门取车' : '门店还车' }}</el-tag>
          <p style="font-weight:bold">{{ scope.row.baseorder.PickoffStore.shopaddress }}</p>
        </template>
      </el-table-column>

      <el-table-column
        prop="baseorder.status"
        header-align="center"
        align="center"
        label="订单状态">

      </el-table-column>

      <el-table-column
        fixed="right"
        header-align="center"
        align="left"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <!--  <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
              <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>-->
          <el-row>
            <el-button type="warning" style="margin-bottom: 10px" size="small" @click="addDriver(scope.row)">排司机</el-button>
          </el-row>

          <el-row>
            <el-button v-if="scope.row.baseorder.status==='已排车'"   type="warning" style="margin-bottom: 10px" size="small" @click="giveCar(scope.row)">取车</el-button>
          </el-row>
          <el-row>
            <el-button v-if="scope.row.baseorder.status==='已取车'||scope.row.baseorder.status==='已续租'" type="warning" style="margin-bottom: 10px" size="small" @click="returnCar(scope.row)">还车</el-button>
          </el-row>
          <el-row>
            <el-button v-if="scope.row.baseorder.status==='已取车'||scope.row.baseorder.status==='已续租'||scope.row.baseorder.status==='已还车'" type="warning" style="margin-bottom: 10px" size="small" @click="renewCar(scope.row)">续租</el-button>
          </el-row>
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
    <add-driver v-if="addDriverVisible" ref="addDriver" @refreshDataList="getDataList"></add-driver>
    <give-car v-if="giveCarVisible" ref="giveCar" @refreshDataList="getDataList"></give-car>
    <return-car v-if="returnCarVisible" ref="returnCar" @refreshDataList="getDataList"></return-car>
    <renew  v-if="renewVisible" ref="renewCar" @refreshDataList="getDataList"></renew>
  </div>
</template>

<script>
import AddOrUpdate from './order-add-or-update'
import AddDriver from './order-add-driver'
import GiveCar from './order-give-car'
import ReturnCar from './order-return-car'
import Renew from './order-renew'

export default {
  data () {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      addDriverVisible: false,
      giveCarVisible: false,
      returnCarVisible: false,
      renewVisible: false
    }
  },
  components: {
    AddOrUpdate,
    AddDriver,
    GiveCar,
    ReturnCar,
    Renew
  },
  activated () {
    this.getDataList()
  },

  methods: {
    addDriver (order) {
      this.addDriverVisible = true
      this.$nextTick(() => {
        this.$refs.addDriver.setOrder(order)
      })
    },
    giveCar (order) {
      this.giveCarVisible = true
      this.$nextTick(() => {
        this.$refs.giveCar.setOrder(order)
      })
    },
    returnCar (order) {
      this.returnCarVisible = true
      this.$nextTick(() => {
        this.$refs.returnCar.setOrder(order)
      })
    },
    renewCar (order) {
      this.renewVisible = true
      this.$nextTick(() => {
        this.$refs.renewCar.setOrder(order)
      })
    },
    dueDate (value) {
      let date1 = new Date(value.BookingPickupTime)
      let date2 = new Date(value.BookingPickoffTime)
      let time1 = date1.getTime()
      let time2 = date2.getTime()
      let dueDay = Math.floor((time2 - time1) / (24 * 60 * 60 * 1000))
      let dueHour = (((time2 - time1) % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)).toFixed(1)
      return dueDay + '天' + dueHour + '时'
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/generator/order/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'key': this.dataForm.key
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
          url: this.$http.adornUrl('/generator/order/delete'),
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
