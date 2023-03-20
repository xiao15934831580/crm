<template>
<div>
  <div class="hello">
    <h1 @click="getdata">{{ msg }}</h1>
    <p @click = "postdata">
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <router-link to="/demo">Go to Home</router-link>
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
  </div>
  <!-- <DemoTest></DemoTest> -->
  <EchartsTest :titleText = titlename  @changedata = change></EchartsTest>
  
</div>

</template>
<script>
// import DemoTest from "./demo/DemoTest";
import EchartsTest from './charts/charts.vue';
import { GetData, GetList } from './pubilc/api/api';
export default {
  name: "HelloWorld",
  components: { EchartsTest },
  setup(){
    let titlename ='导出数据统计';
    function change(data){
      console.log(data);
    }
    function getdata(){
      GetData().then(res=>{
        console.log(res)
      })
    }
    function postdata(){
      GetList({
        name:'',
        address:'',
        title:''
      }).then(res=>{
        console.log(res)
      })
    }
    return{
      titlename,change,getdata,postdata
    }
  },
  props: {
    msg: String,
  },
  // created() {
  //   this.mostNew();
  // },
  // methods:{
  //   change(data){
  //     console.log(data);
  //   },
  //   getdata(){
  //     GetData().then(res=>{

  //     })
  //   },
  //   postdata(){
  //     GetList({
  //       name:'',
  //       address:'',
  //       title:''
  //     }).then(res=>{

  //     })
  //   }
    // mostNew([a,a,a]]).then((res)=>{

    // })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
