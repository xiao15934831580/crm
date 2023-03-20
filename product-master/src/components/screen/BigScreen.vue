
<template>
  <div class="bigbox">
      <div class="bigimg"></div>
      <BarChart class="barchartStyle"></BarChart>
  </div>
</template>
 
<script>
import BarChart from './src/bar.vue';
export default {
  name: 'BigScreen',
  components: {
    BarChart
  },
  // provide () {
  //   return {
  //     reload: this.reload
  //   }
  // },
  // data () {
  //   return {
  //     idBig: false,
  //     isRouterAlive: true
  //   }
  // },
  created () {
 
  },
  methods: {
 
    // reload () {
    //   this.isRouterAlive = false
    //   this.$nextTick(function () {
    //     this.isRouterAlive = true
    //   })
    // },
 
  },
  watch: {
    // $route (to, from) {
    //   if (to.name == 'Dashboard') {
    //     this.idBig = true
    //   } else {
    //     this.idBig = false
    //   }
    //   console.log(from);
    // }
  },
 
 
 
}

</script>
<style scoped>
    .bigbox{
      position: relative;
    }
    .bigimg{
        background-image: url(D:\test\product\src\assets\bgimg.png);
        background-size: 100% 100%;
        background-repeat:no-repeat;
        background-position: top left;
        width: 100%;
        height: calc(100vh);
    }
    .barchartStyle{
      position: absolute;
      top: 40px ;
      left: 32px;
    }
</style>