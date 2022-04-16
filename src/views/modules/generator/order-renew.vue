<template>
  <el-dialog
    title="确认续租到期时间"
    center
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="auto">
      <el-form-item label="续租到期时间" prop="dueDateTime">
        <el-date-picker v-model="dataForm.dueDateTime"
                        type="datetime"
                        placeholder="请选择续租到期时间"
                        value-format="yyyy-MM-dd HH:mm"
                        :picker-options="this.$MyComm.pickerOptionsAfter">
        </el-date-picker>
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
      dataForm: {
        dueDateTime: ''
      },
      dataRule: {
        'dueDateTime': [
          {required: true, message: '续租到期时间不能为空', trigger: 'blur'}
        ]
      },
      visible: false,
      order: {}
    }
  },
  methods: {
    async setOrder (order) {
      this.visible = true
      this.order = JSON.parse(JSON.stringify(order)) // 深拷贝对象属性
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.order.baseorder.PickoffTime = this.dataForm.dueDateTime
      this.order.baseorder.status = '已续租'
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/generator/order/renew`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.order.id,
              'baseorder': this.order.baseorder,
              'cardetail': this.order.cardetail
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

