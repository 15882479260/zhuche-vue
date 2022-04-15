<template>
  <el-dialog
    title="确认取车"
    center
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="auto">
      <el-form-item label="取车油量" prop="oilcount">
        <el-col span="6">
          <el-input   v-model="dataForm.oilcount" placeholder="请输入还车时车油量"></el-input>
        </el-col>
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
        oilcount: ''
      },
      dataRule: {
        'oilcount': [
          {required: true, message: '还车油量不能为空', trigger: 'blur'}
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
      this.order.baseorder.giveoilcount = this.dataForm.oilcount
      this.order.baseorder.status = '已取车'
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/generator/order/update`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.order.id,
              'baseorder': this.order.baseorder
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

