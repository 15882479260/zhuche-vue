<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="车牌号" prop="carlicencenum">
      <el-input v-model="dataForm.carlicencenum" placeholder="车牌号"></el-input>
    </el-form-item>
    <el-form-item label="车型ID" prop="vehicleid">
      <el-input v-model="dataForm.vehicleid" placeholder="车型ID"></el-input>
    </el-form-item>
    <el-form-item label="车架号" prop="framenum">
      <el-input v-model="dataForm.framenum" placeholder="车架号"></el-input>
    </el-form-item>
    <el-form-item label="发动机号" prop="enginenum">
      <el-input v-model="dataForm.enginenum" placeholder="发动机号"></el-input>
    </el-form-item>
    <el-form-item label="城市ID" prop="cityid">
      <el-input v-model="dataForm.cityid" placeholder="城市ID"></el-input>
    </el-form-item>
    <el-form-item label="门店ID" prop="storeid">
      <el-input v-model="dataForm.storeid" placeholder="门店ID"></el-input>
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
    <el-form-item label="车辆来源" prop="source">
      <el-input v-model="dataForm.source" placeholder="车辆来源"></el-input>
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
          vehicleid: '',
          framenum: '',
          enginenum: '',
          cityid: '',
          storeid: '',
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
          vehicleid: [
            { required: true, message: '车型ID不能为空', trigger: 'blur' }
          ],
          framenum: [
            { required: true, message: '车架号不能为空', trigger: 'blur' }
          ],
          enginenum: [
            { required: true, message: '发动机号不能为空', trigger: 'blur' }
          ],
          cityid: [
            { required: true, message: '城市ID不能为空', trigger: 'blur' }
          ],
          storeid: [
            { required: true, message: '门店ID不能为空', trigger: 'blur' }
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
                this.dataForm.vehicleid = data.car.vehicleid
                this.dataForm.framenum = data.car.framenum
                this.dataForm.enginenum = data.car.enginenum
                this.dataForm.cityid = data.car.cityid
                this.dataForm.storeid = data.car.storeid
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
                'vehicleid': this.dataForm.vehicleid,
                'framenum': this.dataForm.framenum,
                'enginenum': this.dataForm.enginenum,
                'cityid': this.dataForm.cityid,
                'storeid': this.dataForm.storeid,
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
