import Vue from 'vue'

let MyComm = new Vue({
  methods: {
    getImgUploadUrl () {
      return this.$http.adornUrl(`/sys/oss/upload?token=${this.$cookie.get('token')}`)
    },
    async  getVehicleList () {
      let resultData = []
      const res = await this.$http({
        url: this.$http.adornUrl('/generator/vehicle/list'),
        method: 'get',
        params: this.$http.adornParams()
      })
      if (res.data && res.data.code === 0) {
        resultData = res.data.page.list
      }
      return resultData
    },
    data () {
      return {
        pickerOptionsAfter: {
          disabledDate (time) {
            return time.getTime() < Date.now()
          }

        },

        pickerOptionsBefor: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }]
        }
      }
    }
  }
})

export default MyComm
