<template>

  <div
      id="map"
      class="m-map"
  >
    <div class="form">
      <el-select
          style="width: 30%"
          v-model="place_id"
          remote
          filterable
          clearable
          placeholder="请输入搜索的内容"
          :remote-method="handleFilterable"
          @change="handleSelect"
      >
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.location.toString()"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>

import {mapManager} from "./mapPublic";

export default {
  name: 'universalMap',
  data() {
    return {
      id: 'map',
      keyword: '',
      options: [],
      place_id: '',

    }
  },
  mounted() {
    mapManager.createMap(this.id)
  },
  methods: {
    addMarker(e) {
      mapManager.map.clearMap()
      const marker = new mapManager.mapExample.Marker({
        position: [e.lnglat.lng, e.lnglat.lat],
        offset: new window.AMap.Pixel(0, 0)
      })
      marker.setMap(mapManager.map)

    },
    handleFilterable(row) { // 高德api带的查询功能，配合select方法一起使用
      let MSearch
      mapManager.map.plugin(['AMap.PlaceSearch'], function () {
        MSearch = {
          // city 限定城市，默认全国
          city: '330326',
          citylimit: true
        }
      })

      // 实例化AutoComplete
      const autoComplete = new mapManager.mapExample.PlaceSearch(MSearch)
      autoComplete.search(row, (status, result) => {
        // 搜索成功时，result即是对应的匹配数据
        if (result !== 'INVALID_PARAMS' && result.poiList) {
          this.options = result.poiList.pois.filter(item => {
            return item.location !== ''
          })
        }
      })
    },
    handleSelect(row) {
      if (row !== '') {
        const point = row.split(',')
        mapManager.map.setCenter([point[0], point[1]])
        mapManager.map.setZoom(18)
      } else {
        mapManager.map.setCenter([120.562225, 27.671372])
        mapManager.map.setZoom(15)
      }
    },
    editClick() {
      if (this.map) {
        mapManager.map.clearMap()
        const marker = new mapManager.mapExample.Marker({
          position: [],
          offset: new mapManager.mapExample(-19.5, -19)
        })
        marker.setMap(this.map)
        mapManager.map.setCenter([])
        mapManager.map.setZoom()
      }
    }
  },
  // beforeDestroy() {
  //   this.map.destroy()
  // }
}
</script>
<style scoped>
.m-map {
  height: calc(100vh - 144px);
  width: 100%;
  position: relative;
}

.form {
  width: 50%;
  position: absolute;
  top: 2%;
  left: 1%;
  z-index: 10;
}
</style>
