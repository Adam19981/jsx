<template>
  <div style="margin-bottom: 20px">
    <el-tag
        style="cursor: pointer"
        v-for="(tag,index) in tags"
        :key="tag.name"
        size="small"
        :closable="index!==0"
        @click="handleClick(tag)"
        @close="handleClose(tag,index)">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'tagger',
  computed: {
    tags() {
      return this.$store.getters.breadcrumbList
    }
  },
  methods: {
    handleClick(tag) {
      this.$router.push({name: tag.name})
    },
    handleClose() {
    }
    //   const length = this.tags.length-1
    //   if(length === index&&this.tags.length!==1){
    //     this.$router.push({
    //       name:this.tags[index-1].name
    //     })
    //   }else if(length === index&&this.tags.length===1){
    //     this.$router.push({
    //       name:'shouye'
    //     })
    //   }else{
    //     this.$router.push({
    //       name:this.tags[index].name
    //     })
    //   }
    //   this.$store.commit('closetag',tag)
    // }
  }
}
</script>

<style>

</style>