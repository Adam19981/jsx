<template>
  <div>
    <universalMap></universalMap>
  </div>

</template>

<script>

import universalMap from "@/components/map/universalMap.vue";
import {getUser} from "../../../api/frontPage";

export default {
  name:'workbench',
  components:{universalMap},
  data() {
    return {

    }
  },
  mounted() {
    getUser().then(res=>{
      console.log(res)
    })
  }

}
</script>
<style lang="less" scoped>

</style>