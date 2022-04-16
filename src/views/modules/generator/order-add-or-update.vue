<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="150px">
      <el-form-item label="租聘类型" prop="contactdetail.type">
        <el-radio-group v-model="dataForm.contactdetail.type">
          <el-radio label="个人租车"></el-radio>
          <el-radio label="企业租车"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="dataForm.contactdetail.type==='企业租车'" label="企业名称" prop="contactdetail.Company" :rules="[
      { required: dataForm.contactdetail.type==='企业租车', message: '企业名称不能为空'}
    ]">
            <el-input v-model="dataForm.contactdetail.Company" placeholder="企业名字"></el-input>
          </el-form-item>
          <el-form-item label="承租人" prop="contactdetail.CustomerName">
            <el-input v-model="dataForm.contactdetail.CustomerName" placeholder="租车人姓名"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="contactdetail.LicenseType">
            <el-select v-model="dataForm.contactdetail.LicenseType">
              <el-option label="身份证" value="身份证"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="统一社会信用代码" v-if="dataForm.contactdetail.type==='企业租车'" prop="contactdetail.CreditCode"
                        :rules="[
      { required: dataForm.contactdetail.type==='企业租车', message: '统一社会信用代码不能为空'}
    ]">
            <el-input v-model="dataForm.contactdetail.CreditCode" placeholder="统一社会信用代码"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="contactdetail.TelePhone">
            <el-input v-model="dataForm.contactdetail.TelePhone" placeholder="租车人电话"></el-input>
          </el-form-item>

          <el-form-item label="证件号" prop="contactdetail.LicenseNum">
            <el-input v-model="dataForm.contactdetail.LicenseNum" placeholder="证件号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="订单来源" prop="baseorder.VbkChannal">
        <el-radio-group v-model="dataForm.baseorder.VbkChannal">
          <el-radio label="门店下单"></el-radio>
          <el-radio label="电话预定"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="取车门店" prop="baseorder.PickupStore">
            <el-select v-model="dataForm.baseorder.PickupStore" value-key="shopname" @change="getVehiclelistByStore($event,false)">
                <el-option
                  v-for="item in shopList"
                  :key="item.id"
                  :label="item.shopname"
                  :value="item">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预定车型" prop="cardetail">
            <el-select v-model="dataForm.vehicledetail" value-key="vehiclefullname" @change="getCarlistByVehicle($event,false)">
              <el-option
                v-for="item in vehicleList"
                :key="item.id"
                :label="item.vehiclefullname"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="取车时间" prop="baseorder.BookingPickupTime">
            <el-date-picker v-model="dataForm.baseorder.BookingPickupTime"
                            type="datetime"
                            placeholder="请选择取车时间"
                            value-format="yyyy-MM-dd HH:mm"
                            :picker-options="this.$MyComm.pickerOptionsAfter">
            </el-date-picker>
          </el-form-item>


        </el-col>
        <el-col :span="12">
          <el-form-item label="还车门店" prop="baseorder.PickoffStore">
            <el-select v-model="dataForm.baseorder.PickoffStore" value-key="shopname" >
              <el-option
                v-for="item in shopList"
                :key="item.id"
                :label="item.shopname"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号" prop="cardetail">
            <el-select v-model="dataForm.cardetail" value-key="carlicencenum">
              <el-option
                v-for="item in carList"
                :key="item.id"
                :label="item.carlicencenum"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="还车时间" prop="baseorder.BookingPickoffTime">
            <el-date-picker v-model="dataForm.baseorder.BookingPickoffTime"
                            type="datetime"
                            placeholder="请选择还车时间"
                            value-format="yyyy-MM-dd HH:mm"
                            :picker-options="this.$MyComm.pickerOptionsAfter">
            </el-date-picker>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="取车类型" prop="baseorder.PickUpType">
            <el-select v-model="dataForm.baseorder.PickUpType">
              <el-option label="门店取还" value="门店取还"></el-option>
              <el-option label="免费接送" value="免费接送"></el-option>
              <el-option label="上门取还" value="上门取还"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="还车类型" prop="baseorder.PickOffType">
            <el-select v-model="dataForm.baseorder.PickOffType">
              <el-option label="门店取还" value="门店取还"></el-option>
              <el-option label="免费接送" value="免费接送"></el-option>
              <el-option label="上门取还" value="上门取还"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="取车地址" prop="baseorder.PickupStore.shopaddress">
            <el-input v-model="dataForm.baseorder.PickupStore.shopaddress" placeholder="取车地址"></el-input>
          </el-form-item>
          <el-form-item label="还车地址" prop="baseorder.PickoffStore.shopaddress">
            <el-input v-model="dataForm.baseorder.PickoffStore.shopaddress" placeholder="还车地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
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
      vehicleList: [],
      shopList: [],
      carList: [],
      dataForm: {
        id: 0,
        baseorder: {
          'PickupStore': {
          },
          'PickoffStore': {
          },
          'BookingPickupTime': '2022-04-13 00:44',
          'BookingPickoffTime': '2022-04-20 23:59',
          'PickUpType': '上门取还',
          'PickOffType': '上门取还',
          'VbkChannal': '门店下单',
          'status': '已排车'
        },
        contactdetail: {
          'type': '个人租车',
          'Company': '租车公司',
          'CreditCode': '241515335',
          'CustomerName': '测试',
          'TelePhone': '18328490833',
          'LicenseType': '身份证',  // 类型身份证
          'LicenseNum': '511526198501060916'
        },
        amountdetail: [],

        carList: [],

        vehicledetail: {},

        cardetail: {},

        pickupdriverinfo: {},
        pickoffdriverinfo: {},

        paystatusinfos: [],
        payinfolist: []
      },
      dataRule: {
        'baseorder.PickupStore': [
          {required: true, message: '租车门店不能为空', trigger: 'blur'}
        ],
        'baseorder.BookingPickupTime': [
          {required: true, message: '租车时间不能为空', trigger: 'blur'}
        ],
        'baseorder.PickUpType': [
          {required: true, message: '取车类型不能为空', trigger: 'blur'}
        ],
        'baseorder.PickupStore.shopaddress': [
          {required: true, message: '取车地址不能为空', trigger: 'blur'}
        ],

        'baseorder.PickoffStore': [
          {required: true, message: '还车门店不能为空', trigger: 'blur'}
        ],
        'baseorder.BookingPickoffTime': [
          {required: true, message: '还车时间不能为空', trigger: 'blur'}
        ],
        'baseorder.PickOffType': [
          {required: true, message: '还车类型不能为空', trigger: 'blur'}
        ],

        'baseorder.PickoffStore.shopaddress': [
          {required: true, message: '还车地址不能为空', trigger: 'blur'}
        ],

        'baseorder.VbkChannal': [
          {required: true, message: '渠道信息不能为空', trigger: 'blur'}
        ],
        'contactdetail.type': [
          {required: true, message: '租聘类型不能为空', trigger: 'blur'}
        ],

        'contactdetail.CustomerName': [
          {required: true, message: '租车人姓名不能为空', trigger: 'blur'}
        ],
        'contactdetail.TelePhone': [
          {required: true, message: '租车人电话不能为空', trigger: 'blur'}
        ],
        'contactdetail.LicenseType': [
          {required: true, message: '证件类型不能为空', trigger: 'blur'}
        ],
        'contactdetail.LicenseNum': [
          {required: true, message: '证件号码不能为空', trigger: 'blur'}
        ],
        cardetail: [
          {required: true, message: '车辆信息不能为空', trigger: 'blur'}
        ],

        vehicledetail: [
          {required: true, message: '车型信息不能为空', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    async getCarlistByVehicle (vehicle, val2) {
      this.carList = await this.$MyComm.getCarlistByVehicle(vehicle.vehiclefullname)
      if (!val2) {
        if (this.carList.length > 0) {
          this.dataForm.cardetail = this.carList[0] // 新增订单时默认选中第一个
        } else {
          this.dataForm.cardetail = {}
        }
      }
    },
    async getVehiclelistByStore (shop, val2) {
      this.vehicleList = await this.$MyComm.getVehiclelistByStore(shop.id)
      if (!val2) {
        if (this.vehicleList.length > 0) {
          this.dataForm.vehicledetail = this.vehicleList[0] // 新增订单时默认选中第一
        } else {
          this.dataForm.vehicledetail = {}
          this.dataForm.cardetail = {}
        }
      }
      await this.getCarlistByVehicle(this.dataForm.vehicledetail, val2)
    },
    async getShopList () {
      this.shopList = await this.$MyComm.getShopList()
      this.dataForm.baseorder.PickupStore = this.shopList[0]
      this.dataForm.baseorder.PickoffStore = this.shopList[0]
    },
    async init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(async () => {
        this.$refs['dataForm'].resetFields()
        await this.getShopList()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/generator/order/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(async ({data}) => {
            if (data && data.code === 0) {
              this.dataForm.baseorder = data.order.baseorder
              this.dataForm.contactdetail = data.order.contactdetail
              this.dataForm.cardetail = data.order.cardetail
              this.dataForm.vehicledetail = data.order.vehicledetail
              await this.getVehiclelistByStore(data.order.baseorder.PickupStore, true)
            }
          })
        } else {
          await this.getVehiclelistByStore(this.shopList[0], false)
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/generator/order/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'baseorder': this.dataForm.baseorder,
              'contactdetail': this.dataForm.contactdetail,
              'cardetail': this.dataForm.cardetail,
              'vehicledetail': this.dataForm.vehicledetail
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
        }
      })
    }
  }
}
</script>

