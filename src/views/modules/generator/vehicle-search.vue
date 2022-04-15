<template>

  <el-row>
    <el-col :span="7">
      <el-col :span="2">
        <el-scrollbar style="height:500px">
        <el-table class="characters" :data="characters" :show-header=false @current-change="handScrollTo" :highlight-current-row=true >
          <el-table-column
            prop="item"
            >
          </el-table-column>
        </el-table>
        </el-scrollbar>
      </el-col>

      <el-col :span="22">
        <el-scrollbar style="height:500px">
          <el-tree :data="carBrandList" :accordion=true ref="carBrand" @node-click="handleNodeClick"></el-tree>
        </el-scrollbar>
      </el-col>
    </el-col>
    <el-col :span="17">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="auto">
        <el-form-item label="排挡" prop="transmissiontype">
          <el-checkbox :indeterminate="istransmissiontypesIndeterminate" v-model="transmissiontypesCheckAll"
                       @change="handleCheckAllTransmissiontypeChange">全选
          </el-checkbox>
          <el-checkbox-group v-model="dataForm.transmissiontype" @change="handleCheckedTransmissiontypesChange">
            <el-checkbox v-for="item in transmissiontypes" :label="item" :key="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="排量" prop="displacement">
          <el-checkbox :indeterminate="isDisplacementIndeterminate" v-model="displacementsCheckAll"
                       @change="handleCheckAlldisplacementChange">全选
          </el-checkbox>
          <el-checkbox-group v-model="dataForm.displacement" @change="handleCheckeddisplacementChange">
            <el-checkbox v-for="item in displacements" :label="item" :key="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="乘座数" prop="passengernum">
          <el-checkbox :indeterminate="isPassengerIndeterminate" v-model="passengersCheckAll"
                       @change="handleCheckAllPassengerChange">全选
          </el-checkbox>
          <el-checkbox-group v-model="dataForm.passengernum" @change="handleCheckedPassengersChange">
            <el-checkbox v-for="item in passengers" :label="item" :key="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="车型箱式" prop="carriagedesc">

          <el-checkbox :indeterminate="isCarriagedescsIndeterminate" v-model="carriagedescsCheckAll"
                       @change="handleCheckAllcarriagedescChange">全选
          </el-checkbox>
          <el-checkbox-group v-model="dataForm.carriagedesc" @change="handleCheckedcarriagedescChange">
            <el-checkbox v-for="item in carriagedescs" :label="item" :key="item">{{ item }}</el-checkbox>
          </el-checkbox-group>

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
          <el-button @click="getDataList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">

      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="车型ID">
      </el-table-column>
      <el-table-column
        prop="vehiclename"
        header-align="center"
        align="center"
        label="车型名">
      </el-table-column>
      <el-table-column
        prop="displacement"
        header-align="center"
        align="center"
        label="车型排量">
      </el-table-column>
      <el-table-column
        prop="modelyear"
        header-align="center"
        align="center"
        label="车型年款">
      </el-table-column>

      <el-table-column
        prop="carriagedesc"
        header-align="center"
        align="center"
        label="车型箱式">
      </el-table-column>
      <el-table-column
        prop="transmissiontype"
        header-align="center"
        align="center"
        label="车型排挡">
      </el-table-column>
      <el-table-column
        prop="passengernum"
        header-align="center"
        align="center"
        label="乘客座位数">
      </el-table-column>
      <el-table-column
        prop="imageurl"
        header-align="center"
        align="center"
        label="车型图片">
        <template slot-scope="scope">
          <img :src="scope.row.imageurl" style="width:100px;height:100px;"/>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作" >
        <template slot-scope="scope"  >
          <el-button v-if="visible" type="text" size="small" @click="chooseVehicleHandle(scope.row)">使用此车型</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </el-row>


</template>

<script>
const transmissiontypeOptins = ['自动', '手动']
const passengerOptins = ['2座及以下', '3座', '4座', '5座', '6座以上']
const displacementOptins = ['1.0L及以下', '1.1L~2.0L', '2.1L~3.0L', '3.1L~4.0L', '4.0L以上']
const carriagedescOptins = ['三厢', 'MPV', 'SUV', '两厢', '客车', '跑车', '掀背', '房车', '皮卡', '敞篷', '其他']
export default {

  data () {
    return {
      visible: false,
      characters: [{'item': 'A'}, {'item': 'B'}, {'item': 'C'}, {'item': 'D'}, {'item': 'E'}, {'item': 'F'}, {'item': 'G'}, {'item': 'H'}, {'item': 'I'}, {'item': 'J'},
        {'item': 'K'}, {'item': 'L'}, {'item': 'M'}, {'item': 'N'}, {'item': 'O'}, {'item': 'P'}, {'item': 'Q'}, {'item': 'R'}, {'item': 'S'}, {'item': 'T'}, {'item': 'U'},
      {'item': 'V'}, {'item': 'W'}, {'item': 'X'}, {'item': 'Y'}, {'item': 'Z'}],
      carBrandList: [],
      passengersCheckAll: false,
      isPassengerIndeterminate: true,
      carriagedescsCheckAll: false,
      isCarriagedescsIndeterminate: true,
      displacementsCheckAll: false,
      isDisplacementIndeterminate: true,
      transmissiontypesCheckAll: false,
      istransmissiontypesIndeterminate: true,
      // 数据
      transmissiontypes: transmissiontypeOptins,
      displacements: displacementOptins,
      passengers: passengerOptins,
      carriagedescs: carriagedescOptins,
      //
      modelYearOptions: ['全部', '2022款', '2021款', '2020款', '2019款', '2018款', '2017款', '2016款', '2015款', '2014款', '2013款', '2012款',
        '2011款', '2010款', '2009款', '2008款', '2007款', '2006款', '2005前款'],
      dataForm: {
        vehiclename: '',
        displacement: [],
        modelyear: '',
        carriagedesc: [],
        transmissiontype: [],
        passengernum: []
      },
      dataRule: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  methods: {
    handleNodeClick (data) {
      if (data.seriesName) {
        this.dataForm.vehiclename = data.seriesName
      }
    },
    chooseVehicleHandle (val) {
      this.visible = false
      localStorage.setItem('vehicle-search', JSON.stringify(val))
      this.$router.go(-1)
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/generator/vehicle/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'dataform': this.dataForm
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    handScrollTo (arg) {
      let oldTop = document.documentElement.scrollTop
      for (let i = 0; i < this.carBrandList.length; i++) {
        let carBrand = this.carBrandList[i]
        if (carBrand.brandnamefirstletter === arg.item) {
          let nodelabels = this.$refs['carBrand'].$el.getElementsByClassName('el-tree-node__label')
          Array.prototype.forEach.call(nodelabels, function (element) {
            if (carBrand.label === element.innerHTML) {
              element.scrollIntoView({block: 'start'}, {behavior: 'smooth'})
            }
          })
          document.documentElement.scrollTop = oldTop  // 解决外部页面会滚动，还原位置
          break
        }
      }
    },
    handleCheckAllPassengerChange (val) {
      this.dataForm.passengernum = val ? passengerOptins : []
      this.isPassengerIndeterminate = false
    },
    handleCheckedPassengersChange (value) {
      let checkedCount = value.length
      this.passengersCheckAll = checkedCount === this.passengers.length
      this.isPassengerIndeterminate = checkedCount > 0 && checkedCount < this.passengers.length
    },

    handleCheckAllTransmissiontypeChange (val) {
      this.dataForm.transmissiontype = val ? transmissiontypeOptins : []
      this.istransmissiontypesIndeterminate = false
    },
    handleCheckedTransmissiontypesChange (value) {
      let checkedCount = value.length
      this.transmissiontypesCheckAll = checkedCount === this.transmissiontypes.length
      this.istransmissiontypesIndeterminate = checkedCount > 0 && checkedCount < this.transmissiontypes.length
    },

    handleCheckAllcarriagedescChange (val) {
      this.dataForm.carriagedesc = val ? carriagedescOptins : []
      this.isCarriagedescsIndeterminate = false
    },
    handleCheckedcarriagedescChange (value) {
      let checkedCount = value.length
      this.carriagedescsCheckAll = checkedCount === this.carriagedescs.length
      this.isCarriagedescsIndeterminate = checkedCount > 0 && checkedCount < this.carriagedescs.length
    },

    handleCheckAlldisplacementChange (val) {
      this.dataForm.displacement = val ? displacementOptins : []
      this.isDisplacementIndeterminate = false
    },
    handleCheckeddisplacementChange (value) {
      let checkedCount = value.length
      this.displacementsCheckAll = checkedCount === this.displacements.length
      this.isDisplacementIndeterminate = checkedCount > 0 && checkedCount < this.displacements.length
    }
  },
  mounted: async function () {
    this.getDataList()
    this.visible = this.$route.params.disabled
    // 获取车型列表
    let array = await this.$MyComm.getCarBrandList()
    array.forEach((item) => {
      item.label = item.brandname
      item.series.forEach((child) => {
        child.label = child.seriesName
      })
      item.children = item.series
      this.carBrandList.push(item)
    })
  }
}
</script>
<style>
.characters .cell {
  line-height: 13px
}

</style>
