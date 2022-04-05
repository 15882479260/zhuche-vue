<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :modal-append-to-body="false"

  >
    <el-form :model="dataForm" :rules="dataRule"  ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="auto">

      <el-form-item label="归属门店" prop="store">

        <el-select v-model="dataForm.store" placeholder="请填写门店名称">
          <el-option label="成都" value="成都"></el-option>
          <el-option label="辽宁" value="辽宁"></el-option>
          <el-option label="陕西" value="陕西"></el-option>
        </el-select>

      </el-form-item>


      <el-form-item label="车辆颜色" prop="color">
        <el-radio-group v-model="dataForm.color">

          <el-radio label="银色"></el-radio>
          <span class="spanColor" style="background-color:#EAE9EF;"></span>
          <el-radio label="黑色"></el-radio>
          <span class="spanColor" style="background-color:#000000;"></span>
          <el-radio label="白色"></el-radio>
          <span class="spanColor" style="background-color:#FFFFFF;"></span>
          <el-radio label="红色"></el-radio>
          <span class="spanColor" style="background-color:#ff0000;"></span>
          <el-radio label="太灰色"></el-radio>
          <span class="spanColor" style="background-color:#d8d8d8;"></span>
          <el-radio label="黄色"></el-radio>
          <span class="spanColor" style="background-color:#ffe24d;"></span>
          <el-radio label="蓝色"></el-radio>
          <span class="spanColor" style="background-color:#1557ff;"></span>
          <el-radio label="紫色"></el-radio>
          <span class="spanColor" style="background-color:#7a00ff;"></span>
          <el-radio label="金色"></el-radio>
          <span class="spanColor" style="background-color:#ffc700;"></span>
          <el-radio label="灰色"></el-radio>
          <span class="spanColor" style="background-color:#9c9c9c;"></span>
          <el-radio label="咖啡色"></el-radio>
          <span class="spanColor" style="background-color:#7b550f;"></span>
          <el-radio label="绿色"></el-radio>
          <span class="spanColor" style="background-color:#06a440;"></span>
          <el-radio label="棕色"></el-radio>
          <span class="spanColor" style="background-color:#684402; "></span>
          <el-radio label="香槟色"></el-radio>
          <span class="spanColor" style="background-color:#f1be91; "></span>
          <el-radio label="藏青色"></el-radio>
          <span class="spanColor" style="background-color:#1f48af; "></span>
          <el-radio label="其他颜色"></el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item label="当前里程" prop="currentmileage">
        <el-col :span="7">
          <el-input v-model="dataForm.currentmileage" placeholder="当前车辆里程数"></el-input>
        </el-col>
        <el-col :span="2">
          <span style="margin-left: 10px">公里</span>
        </el-col>
      </el-form-item>

      <el-form-item label="车辆来源" prop="source">

        <el-radio-group v-model="dataForm.source" placeholder="车辆来源">

          <el-radio label="全资购买"></el-radio>
          <el-radio label="融资租赁"></el-radio>
          <el-radio label="租赁"></el-radio>
        </el-radio-group>
      </el-form-item>

      <p style="font-size:24px;font-weight:bold">证件上传</p>
      <p>请录入真实有效的车辆信息，例如“已售卖”、“已退保”、“保险未过户”的车辆不能录入。保险单请确保未退保、未过期或临近15天过期</p>
      <p>上传图片要求：1.图片完整清晰，未P图伪造；2.单张图片不超过3M；3.上传文件格式为JPG或PNG</p>

      <el-card>
        <el-form-item label="行驶证" prop="drivinglicense.imgUrl">
          <el-col :span="9">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgUrl"
              :show-file-list="false"
              :on-success="handleDrivingSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="dataForm.drivinglicense.imgUrl" :src="dataForm.drivinglicense.imgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col :span="15">
            <el-form-item label="车架号" prop="framenum">

              <el-input v-model="dataForm.framenum" placeholder="车架号"></el-input>

            </el-form-item>

            <el-form-item label="车型" prop="vehicle">
              <el-select v-model="dataForm.vehicle"  value-key="vehiclename" placeholder="请选择车型" >
                <el-option
                  v-for="item in vehicleList"
                  :key="item.id"
                  :label="item.vehiclename"
                  :value="{
                      id: item.id,
                      vehiclename: item.vehiclename,
                    }">
                </el-option>
                <el-button type="text"  @click="searchVehicle">查找更多车型</el-button>
              </el-select>

            </el-form-item>

            <el-form-item label="车牌号" prop="drivinglicense.carlicencenum_0">
              <el-col :span="5">
                <el-select v-model="dataForm.drivinglicense.carlicencenum_0" placeholder=""
                           @change="setCarlicenceNum()">
                  <el-option label="川" value="川"></el-option>
                  <el-option label="辽" value="辽"></el-option>
                  <el-option label="陕" value="陕"></el-option>
                </el-select>
              </el-col>
              <el-col :span="19">
                <el-form-item prop="drivinglicense.carlicencenum_1">
                  <el-input v-model="dataForm.drivinglicense.carlicencenum_1" placeholder="车牌号"
                            @change="setCarlicenceNum()"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>


            <el-form-item label="发动机号" prop="enginenum">
              <el-input v-model="dataForm.enginenum" placeholder="发动机号"></el-input>
            </el-form-item>


            <el-form-item label="注册时间" prop="drivinglicense.registerTime">
              <el-date-picker v-model="dataForm.drivinglicense.registerTime"
                              type="date"
                              placeholder="请选择注册时间"
                              value-format="yyyy-MM-dd"
                              :picker-options="this.$MyComm.pickerOptionsBefor">
              </el-date-picker>
            </el-form-item>


            <el-form-item label="使用性质" prop="drivinglicense.useNature">
              <el-input v-model="dataForm.drivinglicense.useNature" placeholder="请输入使用性质"></el-input>
            </el-form-item>


            <el-form-item label="所有人" prop="drivinglicense.owner">
              <el-input v-model="dataForm.drivinglicense.owner" placeholder="请输入所有人"></el-input>
            </el-form-item>

          </el-col>
        </el-form-item>


      </el-card>

      <el-card>
        <p style="font-size:18px; color:orangered;font-weight: bold">
          请上传年检合格且加盖印章的年检证，并确保未过期或临近15天过期
        </p>
        <el-form-item label="年检证" prop="annualinspectioncertificate.imgUrl">
          <el-col :span="9">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgUrl"
              :show-file-list="false"
              :on-success="handleAnnualinspectionSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="dataForm.annualinspectioncertificate.imgUrl" :src="dataForm.annualinspectioncertificate.imgUrl"
                   class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>

          <el-col :span="15">
            <el-form-item label="年检到期日期" prop="annualinspectioncertificate.dueDate" >
              <el-date-picker v-model="dataForm.annualinspectioncertificate.dueDate"
                              type="date"
                              placeholder="请选择年检到期日期"
                              value-format="yyyy-MM-dd"
                              :picker-options="this.$MyComm.pickerOptionsAfter">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-card>


      <el-card>
        <el-form-item label="商业险保单" prop="commercialinsurancepolicy.imgUrl">
          <el-col :span="9">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgUrl"
              :show-file-list="false"
              :on-success="handleCommercialinsurancepolicySuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="dataForm.commercialinsurancepolicy.imgUrl" :src="dataForm.commercialinsurancepolicy.imgUrl"
                   class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>

          <el-col :span="15">
            <el-form-item label="保险公司名称" prop="commercialinsurancepolicy.companyName">
              <el-select v-model="dataForm.commercialinsurancepolicy.companyName" placeholder="请输入保险公司名称">
                <el-option label="保险公司一" value="保险公司一"></el-option>
                <el-option label="保险公司二" value="保险公司二"></el-option>
                <el-option label="保险公司三" value="保险公司三"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保险保单号" prop="commercialinsurancepolicy.number">
              <el-input v-model="dataForm.commercialinsurancepolicy.number" placeholder="请输入保险保单号"></el-input>
            </el-form-item>
            <el-form-item label="投保使用证件号" prop="commercialinsurancepolicy.useLicenceNumber">
              <el-input v-model="dataForm.commercialinsurancepolicy.useLicenceNumber"
                        placeholder="请输入投保使用证件号"></el-input>
            </el-form-item>
            <el-form-item label="商业险到期日期" prop="commercialinsurancepolicy.dueDate">
              <el-date-picker v-model="dataForm.commercialinsurancepolicy.dueDate"
                              type="date"
                              placeholder="请选择商业险到期日期"
                              value-format="yyyy-MM-dd"
                              :picker-options="this.$MyComm.pickerOptionsAfter">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="第三者保险额度" prop="commercialinsurancepolicy.thirdQuota">
              <el-select v-model="dataForm.commercialinsurancepolicy.thirdQuota" placeholder="请输入第三者保险额度">
                <el-option label="20万" value="20万"></el-option>
                <el-option label="30万" value="30万"></el-option>
                <el-option label="50万" value="50万"></el-option>
                <el-option label="100万" value="100万"></el-option>
                <el-option label="200万以上" value="200万以上"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="车损保险起赔额" prop="commercialinsurancepolicy.initialCompensation">
              <el-input v-model="dataForm.commercialinsurancepolicy.initialCompensation"
                        placeholder="请输入车损保险起赔额"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-card>


      <!-- 交强险保单  -->
      <el-card>
        <el-form-item label="交强险保单" prop="compulsoryinsurancepolicy.imgUrl">
          <el-col :span="9">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgUrl"
              :show-file-list="false"
              :on-success="handleCompulsoryinsurancepolicySuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="dataForm.compulsoryinsurancepolicy.imgUrl" :src="dataForm.compulsoryinsurancepolicy.imgUrl"
                   class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>

          <el-col :span="15">
            <el-form-item label="保险公司名称" prop="compulsoryinsurancepolicy.companyName">
              <el-select v-model="dataForm.compulsoryinsurancepolicy.companyName" placeholder="请输入保险公司名称">
                <el-option label="保险公司一" value="保险公司一"></el-option>
                <el-option label="保险公司二" value="保险公司二"></el-option>
                <el-option label="保险公司三" value="保险公司三"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保险保单号" prop="compulsoryinsurancepolicy.number">
              <el-input v-model="dataForm.compulsoryinsurancepolicy.number" placeholder="请输入保险保单号"></el-input>
            </el-form-item>
            <el-form-item label="投保使用证件号" prop="compulsoryinsurancepolicy.useLicenceNumber">
              <el-input v-model="dataForm.compulsoryinsurancepolicy.useLicenceNumber"
                        placeholder="请输入投保使用证件号"></el-input>
            </el-form-item>
            <el-form-item label="交强险到期日期" prop="compulsoryinsurancepolicy.dueDate">
              <el-date-picker v-model="dataForm.compulsoryinsurancepolicy.dueDate"
                              type="date"
                              placeholder="请选择交强险到期日期"
                              value-format="yyyy-MM-dd"
                              :picker-options="this.$MyComm.pickerOptionsAfter">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-card>


      <el-form-item label="配置信息" prop="collocation" >

        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="dataForm.collocation" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
const cityOptions = ['倒车雷达', '倒车影像', '车载GPS', '车载Wifi', '行车记录仪', '雪地胎', '真皮座椅', '车载加湿器', '制氧机', '小冰箱']
export default {
  data () {
    return {
      checkAll: false,
      cities: cityOptions,
      isIndeterminate: true,
      uploadImgUrl: '',
      vehicleList: [],
      visible: false,
      dataForm: {
        id: 0,
        carlicencenum: '',
        vehicle: {},
        framenum: '',
        enginenum: '',
        store: '',
        carModelImg: '',
        carcurrentstatus: '',
        insuranceday: '',
        currentmileage: '',
        remainmileage: '',
        reviewstate: '',
        color: '',
        source: '',
        drivinglicense: {
          useNature: '',
          owner: '',
          registerTime: '',
          carlicencenum_0: '',
          carlicencenum_1: '',
          imgUrl: ''

        },
        annualinspectioncertificate: {
          dueDate: '',
          imgUrl: ''

        },
        commercialinsurancepolicy: {
          companyName: '',
          number: '',
          useLicenceNumber: '',
          dueDate: '',
          thirdQuota: '',
          initialCompensation: '',
          imgUrl: ''
        },
        compulsoryinsurancepolicy: {
          companyName: '',
          number: '',
          useLicenceNumber: '',
          dueDate: '',
          imgUrl: ''
        },
        collocation: []
      },

      dataRule: {
        'compulsoryinsurancepolicy.companyName': [
          {required: true, message: '商业公司不能为空', trigger: 'blur'}
        ],
        'compulsoryinsurancepolicy.number': [
          {required: true, message: '商业公司保单号不能为空', trigger: 'blur'}
        ],
        'compulsoryinsurancepolicy.useLicenceNumber': [
          {required: true, message: '投保使用证件号不能为空', trigger: 'blur'}
        ],
        'compulsoryinsurancepolicy.dueDate': [
          {required: true, message: '交强险保单到期时间不能为空', trigger: 'blur'}
        ],

        'compulsoryinsurancepolicy.imgUrl': [
          {required: true, message: '交强险图片不能为空', trigger: 'blur'}
        ],
        'commercialinsurancepolicy.companyName': [
          {required: true, message: '商业公司不能为空', trigger: 'blur'}
        ],
        'commercialinsurancepolicy.number': [
          {required: true, message: '商业公司保单号不能为空', trigger: 'blur'}
        ],
        'commercialinsurancepolicy.useLicenceNumber': [
          {required: true, message: '投保使用证件号不能为空', trigger: 'blur'}
        ],
        'commercialinsurancepolicy.dueDate': [
          {required: true, message: '商业保单到期时间不能为空', trigger: 'blur'}
        ],
        'commercialinsurancepolicy.thirdQuota': [
          {required: true, message: '第三方赔付额不能为空', trigger: 'blur'}
        ],

        'commercialinsurancepolicy.initialCompensation': [
          {required: true, message: '车损起陪不能为空', trigger: 'blur'}
        ],

        'commercialinsurancepolicy.imgUrl': [
          {required: true, message: '商业险图片不能为空', trigger: 'blur'}
        ],

        'annualinspectioncertificate.dueDate': [
          {required: true, message: '年检时间不能为空', trigger: 'blur'}
        ],
        'annualinspectioncertificate.imgUrl': [
          {required: true, message: '年检图片不能为空', trigger: 'blur'}
        ],
        'drivinglicense.imgUrl': [
          {required: true, message: '行驶证图片不能为空', trigger: 'blur'}
        ],
        'drivinglicense.useNature': [
          {required: true, message: '使用性质不能为空', trigger: 'blur'}
        ],
        'drivinglicense.owner': [
          {required: true, message: '所有人不能为空', trigger: 'blur'}
        ],
        'drivinglicense.registerTime': [
          {required: true, message: '注册时间不能为空', trigger: 'blur'}
        ],
        'drivinglicense.carlicencenum_0': [
          {required: true, message: '车牌不能为空', trigger: 'blur'}
        ],
        'drivinglicense.carlicencenum_1': [
          {required: true, message: '车牌号码不能为空', trigger: 'blur'}
        ],
        store: [
          {required: true, message: '门店名称不能为空', trigger: 'blur'}
        ],
        color: [
          {required: true, message: '车辆颜色不能为空', trigger: 'blur'}
        ],
        currentmileage: [
          {required: true, message: '当前车辆里程数不能为空', trigger: 'blur'}
        ],
        source: [
          {required: true, message: '车辆来源不能为空', trigger: 'blur'}
        ],
        framenum: [
          {required: true, message: '车架号不能为空', trigger: 'blur'}
        ],
        vehicle: [
          {required: true, message: '车型不能为空', trigger: 'blur'}
        ],

        enginenum: [
          {required: true, message: '发动机号不能为空', trigger: 'blur'}
        ],
        collocation: [
          {required: true, message: '配置信息不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  activated () {
    let vehicle = JSON.parse(localStorage.getItem('vehicle-search'))
    if (vehicle && this.visible) {
      this.dataForm.vehicle = vehicle
      this.addVehicleToSelect(vehicle)
      localStorage.removeItem('vehicle-search')
    }
  },
  methods: {
  // 如果对象数组不包含该对象，就添加该对象.....是因为数组没有这个对象时，el-select不会显示这个对象
    addVehicleToSelect (vehicle) {
      let result = this.vehicleList.some(item => {
        if (item.vehiclename === vehicle.vehiclename) {
          return true
        }
      })
      if (!result) {
        this.vehicleList.push(vehicle)
      }
    },

    searchVehicle () {
      this.$router.push({ name: 'generator-vehicle-search' })
    },
    handleCheckAllChange (val) {
      this.dataForm.collocation = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    async init (id) {
      this.uploadImgUrl = this.$MyComm.getImgUploadUrl()
      this.vehicleList = await this.$MyComm.getVehicleList()
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/generator/car/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.carlicencenum = data.car.carlicencenum
              this.dataForm.vehicle = data.car.vehicle
              this.addVehicleToSelect(data.car.vehicle)
              this.dataForm.framenum = data.car.framenum
              this.dataForm.enginenum = data.car.enginenum
              this.dataForm.store = data.car.store
              this.dataForm.carcurrentstatus = data.car.carcurrentstatus
              this.dataForm.insuranceday = data.car.insuranceday
              this.dataForm.currentmileage = data.car.currentmileage
              this.dataForm.remainmileage = data.car.remainmileage
              this.dataForm.carModelImg = data.car.carModelImg
              this.dataForm.reviewstate = data.car.reviewstate
              this.dataForm.color = data.car.color
              this.dataForm.source = data.car.source
              this.dataForm.drivinglicense = data.car.drivinglicense
              this.dataForm.annualinspectioncertificate = data.car.annualinspectioncertificate
              this.dataForm.commercialinsurancepolicy = data.car.commercialinsurancepolicy
              this.dataForm.compulsoryinsurancepolicy = data.car.compulsoryinsurancepolicy
              this.dataForm.collocation = data.car.collocation
            }
          })
        }
      })
    },

    // 上传图片
    handleDrivingSuccess (res, file) {
      this.dataForm.drivinglicense.imgUrl = URL.createObjectURL(file.raw)
    },

    // 上传图片
    handleAnnualinspectionSuccess (res, file) {
      this.dataForm.annualinspectioncertificate.imgUrl = URL.createObjectURL(file.raw)
    },

    // 上传图片
    handleCommercialinsurancepolicySuccess (res, file) {
      this.dataForm.commercialinsurancepolicy.imgUrl = URL.createObjectURL(file.raw)
    },

    // 上传图片
    handleCompulsoryinsurancepolicySuccess (res, file) {
      this.dataForm.compulsoryinsurancepolicy.imgUrl = URL.createObjectURL(file.raw)
    },

    // 上传图片
    beforeAvatarUpload (file) {
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
      }
      return isLt3M
    },

    // 添加修改车牌号
    setCarlicenceNum () {
      this.dataForm.carlicencenum = this.dataForm.drivinglicense.carlicencenum_0 + this.dataForm.drivinglicense.carlicencenum_1
    },

    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // 设置保养公里
          this.dataForm.remainmileage = parseInt(this.dataForm.currentmileage) + 5000
          this.$http({
            url: this.$http.adornUrl(`/generator/car/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'carlicencenum': this.dataForm.carlicencenum,
              'vehicle': this.dataForm.vehicle,
              'framenum': this.dataForm.framenum,
              'enginenum': this.dataForm.enginenum,
              'store': this.dataForm.store,
              'carcurrentstatus': this.dataForm.carcurrentstatus,
              'insuranceday': this.dataForm.insuranceday,
              'currentmileage': this.dataForm.currentmileage,
              'remainmileage': this.dataForm.remainmileage,
              'carModelImg': this.dataForm.carModelImg,
              'reviewstate': this.dataForm.reviewstate,
              'color': this.dataForm.color,
              'source': this.dataForm.source,
              'drivinglicense': this.dataForm.drivinglicense,
              'annualinspectioncertificate': this.dataForm.annualinspectioncertificate,
              'commercialinsurancepolicy': this.dataForm.commercialinsurancepolicy,
              'compulsoryinsurancepolicy': this.dataForm.compulsoryinsurancepolicy,
              'collocation': this.dataForm.collocation // 数组转字符串,逗号间隔传给后端
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

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-radio .el-radio__label {

  margin-left: -8px;
}

el-form-item__content{
  margin-bottom: 22px;

}

.spanColor {
  width: 16px;
  height: 10px;
  margin-right: 12px;
  display: inline-block;

}

</style>
