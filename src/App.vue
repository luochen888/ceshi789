<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import { mapGetters, mapState } from "vuex";
export default  {
  name:  'App',
  computed:{
    ...mapGetters([
      'renderList'
    ]),
  },
  watch: {
    $route(route) { //全局监听路由变化  为了及时重新渲染高亮系统
      let routerName = route.path.split('/')[1]
      if(this.renderList.find(item => item.path == routerName)){
        let nowactive = this.renderList.find(item => item.path == routerName).system
        this.$store.dispatch('ToggleSystem',nowactive)
      }
      if(route.path == '/index'){
        this.$store.dispatch('settings/toggleBread',false)
      }else{
        this.$store.dispatch('settings/toggleBread',true)
      }
    }
  },
}
</script>
