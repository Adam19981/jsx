<template>
<div>
    <el-tag
  v-for="(tag,index) in tags"
  :key="tag.name"
  size="small"
  closable
  @click="changmunu(tag)"
  @close="closemunu(tag,index)">
  {{tag.label}}
    </el-tag>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'tagger',
    computed:{
      ...mapState({
        tags: state => state.islist
      })
    },
    methods: {
      changmunu(tag){
         this.$router.push({
              name:tag.name
          })
      },
      closemunu(tag,index){
        const length = this.tags.length-1
        if(length === index&&this.tags.length!==1){
          this.$router.push({
            name:this.tags[index-1].name
          })
        }else if(length === index&&this.tags.length===1){
          this.$router.push({
            name:'shouye'
          })
        }else{
          this.$router.push({
            name:this.tags[index].name
          })
        }
        this.$store.commit('closetag',tag)
      }
    }
}
</script>

<style>

</style>