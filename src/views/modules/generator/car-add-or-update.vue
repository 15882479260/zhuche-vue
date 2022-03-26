<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

        <el-form-item label="门店名称" prop="store">
          <el-col :span="11">
          <el-select v-model="dataForm.store" placeholder="门店一">
            <el-option label="门店一" value="shanghai"></el-option>
            <el-option label="门店二" value="beijing"></el-option>
          </el-select>
          </el-col>
          <el-col :span="11">
          <el-form-item label="车型" prop="vehicle">
            <el-input v-model="dataForm.vehicle" placeholder="车型"></el-input>
          </el-form-item>
          </el-col>
        </el-form-item>
      <el-form-item label="车辆来源" prop="source">

        <el-select v-model="dataForm.source" placeholder="车辆来源">
          <el-option label="门店一" value="1"></el-option>
          <el-option label="门店二" value="2"></el-option>
        </el-select>
      </el-form-item>


    <el-form-item label="车架号" prop="framenum">
      <el-col :span="11">
      <el-input v-model="dataForm.framenum" placeholder="车架号"></el-input>
      </el-col>
      <el-col :span="11">
      <el-form-item label="发动机号" prop="enginenum">

        <el-input v-model="dataForm.enginenum" placeholder="发动机号"></el-input>

      </el-form-item>
      </el-col>
    </el-form-item>


      <el-form-item label="车牌号" prop="carlicencenum">
        <el-select v-model="dataForm.carlicencenum" placeholder="车牌号">
          <el-option label="京" value="1"></el-option>
          <el-option label="川" value="2"></el-option>
        </el-select>

      </el-form-item>


    <el-form-item label="运营状态" prop="carcurrentstatus">
      <el-input v-model="dataForm.carcurrentstatus" placeholder="运营状态"></el-input>
    </el-form-item>
    <el-form-item label="到期提醒天数" prop="insurancedays">
      <el-input v-model="dataForm.insurancedays" placeholder="到期提醒天数"></el-input>
    </el-form-item>
    <el-form-item label="当前车辆里程数" prop="currentmileage">
      <el-input v-model="dataForm.currentmileage" placeholder="当前车辆里程数"></el-input>
    </el-form-item>
    <el-form-item label="下次保养公里数" prop="remainmileage">
      <el-input v-model="dataForm.remainmileage" placeholder="下次保养公里数"></el-input>
    </el-form-item>
    <el-form-item label="车辆图片" prop="imageurl">
      <el-input v-model="dataForm.imageurl" placeholder="车辆图片"></el-input>
    </el-form-item>
    <el-form-item label="审核状态" prop="reviewstate">
      <el-input v-model="dataForm.reviewstate" placeholder="审核状态"></el-input>
    </el-form-item>
    <el-form-item label="车辆颜色" prop="color">
      <el-input v-model="dataForm.color" placeholder="车辆颜色"></el-input>
    </el-form-item>

    <el-form-item label="行驶证" prop="drivinglicense">
      <el-input v-model="dataForm.drivinglicense" placeholder="行驶证"></el-input>
    </el-form-item>
    <el-form-item label="年检证" prop="annualinspectioncertificate">
      <el-input v-model="dataForm.annualinspectioncertificate" placeholder="年检证"></el-input>
    </el-form-item>
    <el-form-item label="商业险保单" prop="commercialinsurancepolicy">
      <el-input v-model="dataForm.commercialinsurancepolicy" placeholder="商业险保单"></el-input>
    </el-form-item>
    <el-form-item label="交强险保单" prop="compulsoryinsurancepolicy">
      <el-input v-model="dataForm.compulsoryinsurancepolicy" placeholder="交强险保单"></el-input>
    </el-form-item>
    <el-form-item label="配置信息" prop="collocation">
      <el-input v-model="dataForm.collocation" placeholder="配置信息"></el-input>
    </el-form-item>
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
        dataForm: {
          id: 0,
          carlicencenum: '',
          vehicle: '',
          framenum: '',
          enginenum: '',
          store: '',
          carcurrentstatus: '',
          insurancedays: '',
          currentmileage: '',
          remainmileage: '',
          imageurl: '',
          reviewstate: '',
          color: '',
          source: '',
          drivinglicense: '',
          annualinspectioncertificate: '',
          commercialinsurancepolicy: '',
          compulsoryinsurancepolicy: '',
          collocation: ''
        },
        dataRule: {
          carlicencenum: [
            { required: true, message: '车牌号不能为空', trigger: 'blur' }
          ],
          vehicle: [
            { required: true, message: '车型不能为空', trigger: 'blur' }
          ],
          framenum: [
            { required: true, message: '车架号不能为空', trigger: 'blur' }
          ],
          enginenum: [
            { required: true, message: '发动机号不能为空', trigger: 'blur' }
          ],

          store: [
            { required: true, message: '门店名称不能为空', trigger: 'blur' }
          ],
          carcurrentstatus: [
            { required: true, message: '运营状态不能为空', trigger: 'blur' }
          ],
          insurancedays: [
            { required: true, message: '到期提醒天数不能为空', trigger: 'blur' }
          ],
          currentmileage: [
            { required: true, message: '当前车辆里程数不能为空', trigger: 'blur' }
          ],
          remainmileage: [
            { required: true, message: '下次保养公里数不能为空', trigger: 'blur' }
          ],
          imageurl: [
            { required: true, message: '车辆图片不能为空', trigger: 'blur' }
          ],
          reviewstate: [
            { required: true, message: '审核状态不能为空', trigger: 'blur' }
          ],
          color: [
            { required: true, message: '车辆颜色不能为空', trigger: 'blur' }
          ],
          source: [
            { required: true, message: '车辆来源不能为空', trigger: 'blur' }
          ],
          drivinglicense: [
            { required: true, message: '行驶证不能为空', trigger: 'blur' }
          ],
          annualinspectioncertificate: [
            { required: true, message: '年检证不能为空', trigger: 'blur' }
          ],
          commercialinsurancepolicy: [
            { required: true, message: '商业险保单不能为空', trigger: 'blur' }
          ],
          compulsoryinsurancepolicy: [
            { required: true, message: '交强险保单不能为空', trigger: 'blur' }
          ],
          collocation: [
            { required: true, message: '配置信息不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
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
                this.dataForm.framenum = data.car.framenum
                this.dataForm.enginenum = data.car.enginenum
                this.dataForm.store = data.car.store
                this.dataForm.carcurrentstatus = data.car.carcurrentstatus
                this.dataForm.insurancedays = data.car.insurancedays
                this.dataForm.currentmileage = data.car.currentmileage
                this.dataForm.remainmileage = data.car.remainmileage
                this.dataForm.imageurl = data.car.imageurl
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
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
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
                'insurancedays': this.dataForm.insurancedays,
                'currentmileage': this.dataForm.currentmileage,
                'remainmileage': this.dataForm.remainmileage,
                'imageurl': this.dataForm.imageurl,
                'reviewstate': this.dataForm.reviewstate,
                'color': this.dataForm.color,
                'source': this.dataForm.source,
                'drivinglicense': this.dataForm.drivinglicense,
                'annualinspectioncertificate': this.dataForm.annualinspectioncertificate,
                'commercialinsurancepolicy': this.dataForm.commercialinsurancepolicy,
                'compulsoryinsurancepolicy': this.dataForm.compulsoryinsurancepolicy,
                'collocation': this.dataForm.collocation
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
