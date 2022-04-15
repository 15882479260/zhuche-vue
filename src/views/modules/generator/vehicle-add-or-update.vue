<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="auto">
      <el-form-item label="车型排挡" prop="transmissiontype">
        <el-radio-group v-model="dataForm.transmissiontype" >
          <el-radio label="自动"></el-radio>
          <el-radio label="手动"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="车排量" prop="displacement">
        <el-input v-model="dataForm.displacement" placeholder="车排量"></el-input>
      </el-form-item>
      <el-form-item label="乘座数" prop="passengernum" :rules="[
      { required: true, message: '乘座数不能为空'},
      { type: 'number', message: '乘座数必须为数字值'}
    ]">

        <el-input type="passengernum" v-model.number="dataForm.passengernum" placeholder="乘座数"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="车型箱式" prop="carriagedesc">
        <el-radio-group v-model="dataForm.carriagedesc" >
          <el-radio label="三厢"></el-radio>
          <el-radio label="MPV"></el-radio>
          <el-radio label="SUV"></el-radio>
          <el-radio label="两厢"></el-radio>
          <el-radio label="客车"></el-radio>
          <el-radio label="跑车"></el-radio>
          <el-radio label="掀背"></el-radio>
          <el-radio label="房车"></el-radio>
          <el-radio label="皮卡"></el-radio>
          <el-radio label="敞篷"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="车型年款" prop="modelyear">
        <el-select v-model="dataForm.modelyear" >
          <el-option
            v-for="item in modelYearOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车型图片地址" prop="imageurl">
        <el-upload
          class="avatar-uploader"
          :action="uploadImgUrl"
          :show-file-list="false"
          :on-success="handleVehiclenameSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="dataForm.imageurl" :src="dataForm.imageurl"
               class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="车型名称" prop="vehiclename">
        <el-input v-model="dataForm.vehiclename" placeholder="车型名称"></el-input>
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
      uploadImgUrl: '',
      modelYearOptions: ['2022款', '2021款', '2020款', '2019款', '2018款', '2017款', '2016款', '2015款', '2014款', '2013款', '2012款',
        '2011款', '2010款', '2009款', '2008款', '2007款', '2006款', '2005前款'],
      visible: false,
      dataForm: {
        id: 0,
        vehiclename: '',
        displacement: '',
        modelyear: '',
        imageurl: '',
        carriagedesc: '',
        transmissiontype: '',
        passengernum: ''
      },
      dataRule: {
        displacement: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        modelyear: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        imageurl: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        carriagedesc: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        transmissiontype: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        vehiclename: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {

    // 上传图片
    handleVehiclenameSuccess (res, file) {
      this.dataForm.imageurl = URL.createObjectURL(file.raw)
    },
    // 上传图片
    beforeAvatarUpload (file) {
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
      }
      return isLt3M
    },
    init (id) {
      this.uploadImgUrl = this.$MyComm.getImgUploadUrl()
      this.dataForm.id = id || 0

      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/generator/vehicle/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.displacement = data.vehicle.displacement
              this.dataForm.modelyear = data.vehicle.modelyear
              this.dataForm.imageurl = data.vehicle.imageurl
              this.dataForm.carriagedesc = data.vehicle.carriagedesc
              this.dataForm.transmissiontype = data.vehicle.transmissiontype
              this.dataForm.passengernum = data.vehicle.passengernum
              this.dataForm.vehiclename = data.vehicle.vehiclename
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
            url: this.$http.adornUrl(`/generator/vehicle/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'vehiclename': this.dataForm.vehiclename,
              'displacement': this.dataForm.displacement,
              'modelyear': this.dataForm.modelyear,
              'imageurl': this.dataForm.imageurl,
              'carriagedesc': this.dataForm.carriagedesc,
              'transmissiontype': this.dataForm.transmissiontype,
              'passengernum': this.dataForm.passengernum

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
<style>


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
</style>
