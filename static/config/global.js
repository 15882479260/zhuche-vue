import Vue from 'vue'

let MyComm = new Vue({
  methods: {
    getImgUploadUrl () {
      return this.$http.adornUrl(`/sys/oss/upload?token=${this.$cookie.get('token')}`)
    },

    async  getVehiclelistByStore (storeId) {
      let resultData = []
      const res = await this.$http({
        url: this.$http.adornUrl('/generator/car/grouplist'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 5000,
          'storeId': storeId
        })
      })
      if (res.data && res.data.code === 0) {
        resultData = res.data.page.list
      }
      return resultData
    },

    async  getDriverList () {
      let resultData = []
      const res = await this.$http({
        url: this.$http.adornUrl('/generator/driver/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 500
        })
      })
      if (res.data && res.data.code === 0) {
        resultData = res.data.page.list
      }
      return resultData
    },
    async  getTaskListByDriver (driverId) {
      let resultData = []
      const res = await this.$http({
        url: this.$http.adornUrl('/generator/drivertask/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 50,
          'driverId': driverId
        })
      })
      if (res.data && res.data.code === 0) {
        resultData = res.data.page.list
      }
      return resultData
    },
    async  getCarlistByVehicle (vehiclefullname) {
      let resultData = []
      const res = await this.$http({
        url: this.$http.adornUrl('/generator/car/groupcarlist'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 500,
          'vehiclefullname': vehiclefullname
        })
      })
      if (res.data && res.data.code === 0) {
        resultData = res.data.page.list
      }
      return resultData
    },

    async  getCarBrandList () {
      let resultData = []
      const res = await this.$http({
        url: this.$http.adornUrl('/generator/carbrand/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 500
        })
      })
      if (res.data && res.data.code === 0) {
        resultData = res.data.page.list
      }
      return resultData
    },
    async  getShopList () {
      let resultData = []
      const res = await this.$http({
        url: this.$http.adornUrl('/generator/shop/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 100
        })
      })
      if (res.data && res.data.code === 0) {
        resultData = res.data.page.list
      }
      return resultData
    },
    async  getVehicleList () {
      let resultData = []
      const res = await this.$http({
        url: this.$http.adornUrl('/generator/vehicle/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 10
        })
      })
      if (res.data && res.data.code === 0) {
        resultData = res.data.page.list
      }
      return resultData
    }
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
})

export default MyComm
