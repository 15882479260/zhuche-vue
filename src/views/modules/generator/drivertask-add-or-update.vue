<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="车型名" prop="vehiclename">
      <el-input v-model="dataForm.vehiclename" placeholder="车型名"></el-input>
    </el-form-item>
    <el-form-item label="送车或收车" prop="type">
      <el-input v-model="dataForm.type" placeholder="送车或收车"></el-input>
    </el-form-item>
    <el-form-item label="日期时间" prop="datetime">
      <el-input v-model="dataForm.datetime" placeholder="日期时间"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="地址"></el-input>
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
          vehiclename: '',
          type: '',
          datetime: '',
          address: ''
        },
        dataRule: {
          vehiclename: [
            { required: true, message: '车型名不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '送车或收车不能为空', trigger: 'blur' }
          ],
          datetime: [
            { required: true, message: '日期时间不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/drivertask/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.vehiclename = data.driverTask.vehiclename
                this.dataForm.type = data.driverTask.type
                this.dataForm.datetime = data.driverTask.datetime
                this.dataForm.address = data.driverTask.address
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
              url: this.$http.adornUrl(`/generator/drivertask/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'vehiclename': this.dataForm.vehiclename,
                'type': this.dataForm.type,
                'datetime': this.dataForm.datetime,
                'address': this.dataForm.address
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
