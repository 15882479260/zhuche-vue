<template>
  <el-dialog
    title="排司机"
    center
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-tabs v-model="group" type="card" @tab-click="handleTaskListByTab">
      <el-tab-pane label="排送车司机"></el-tab-pane>
      <el-tab-pane label="排收车司机"></el-tab-pane>
      <span v-if="group==='0'" style="color: #aa00aa">送车司机：</span>
      <el-select v-if="group==='0'" v-model="order.pickupdriverinfo" value-key="name" @change="handleTaskList">
        <el-option
          v-for="item in driverList"
          :key="item.id"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
      <P v-if="group==='0'">当前订单送车时间：<span style="color: #aa00aa">{{ order.baseorder.PickupTime }}</span>&nbsp;&nbsp;&nbsp;&nbsp;送车地址：<span
        style="color: #aa00aa">{{ order.baseorder.PickupStore.shopaddress }}</span></P>

      <span v-if="group==='1'" style="color: #aa00aa">收车司机：</span>
      <el-select v-if="group==='1'" v-model="order.pickoffdriverinfo" value-key="name" @change="handleTaskList">
        <el-option
          v-for="item in driverList"
          :key="item.id"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
      <P v-if="group==='1'">当前订单收车时间：<span style="color: #aa00aa">{{ order.baseorder.PickoffTime }}</span>&nbsp;&nbsp;&nbsp;&nbsp;收车地址：<span
        style="color: #aa00aa">{{ order.baseorder.PickoffStore.shopaddress }}</span></P>
      <p style="color: #aa00aa;font-size: large">任务列表：</p>
      <ol>
        <li
          v-for='item in taskList'
          :key=item.index>
          {{ item.id }}&nbsp;&nbsp;&nbsp;&nbsp;{{item.vehiclename }}&nbsp;&nbsp;<span style="color: #aa00aa">{{ '(' +item.type+')'}}</span> &nbsp;&nbsp; {{item.datetime}}&nbsp;&nbsp;{{item.address}}
        </li>
      </ol>

    </el-tabs>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      order: {},
      group: '',
      driverList: [],
      taskList: []
    }
  },
  methods: {
    async handleTaskListByTab () {
      this.taskList = []
      if (this.group === '0') {
        await this.handleTaskList(this.order.pickupdriverinfo)
      } else {
        await this.handleTaskList(this.order.pickoffdriverinfo)
      }
    },
    async setOrder (order) {
      this.visible = true
      this.group = '0'
      this.order = JSON.parse(JSON.stringify(order)) // 深拷贝对象属性
      await this.getDriverList()
      await this.handleTaskListByTab()
    },

    async handleTaskList (driver) {
      this.taskList = await this.$MyComm.getTaskListByDriver(driver.id)
    },
    async getDriverList () {
      this.driverList = await this.$MyComm.getDriverList()
    },

    addDriverTask () {
      this.$http({
        url: this.$http.adornUrl(`/generator/drivertask/save`),
        method: 'post',
        data: this.$http.adornData({
          'vehiclename': this.order.cardetail.vehicle.vehiclename,
          'type': this.group === '0' ? '送车' : '收车',
          'datetime': this.group === '0' ? this.order.baseorder.PickupTime : this.order.baseorder.PickoffTime,
          'address': this.group === '0' ? this.order.baseorder.PickupStore.shopaddress : this.order.baseorder.PickoffStore.shopaddress,
          'driverid': this.group === '0' ? this.order.pickupdriverinfo.id : this.order.pickoffdriverinfo.id
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$http({
        url: this.$http.adornUrl(`/generator/order/update`),
        method: 'post',
        data: this.$http.adornData({
          'id': this.order.id,
          'pickupdriverinfo': this.order.pickupdriverinfo,
          'pickoffdriverinfo': this.order.pickoffdriverinfo
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.addDriverTask()
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>

