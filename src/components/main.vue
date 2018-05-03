<template>
  <yd-layout>

    <router-view :friList="friList" :addNum="addNum"></router-view>

    <yd-tabbar slot="tabbar" active-color="#888">
      <yd-tabbar-item title="首页" link="zhuye" :active="true">
        <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="发现" link="tolk" :active="true">
        <yd-icon name="discover" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="消息" link="chet"  :active="true" @click.native="totleNum=0">
        <yd-badge slot="badge" type="danger" v-if="totleNum>0">{{totleNum}}</yd-badge>
        <yd-icon name="weixin" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="我" link="me" :active="true">
        <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>

      </yd-tabbar-item>
    </yd-tabbar>

  </yd-layout>
</template>

<script>
export default {

  data () {
    return {
     chatData:[],
     friList:[],
     totleNum:0,
     addNum:0
    }
  },
  mounted: function(){
    if(JSON.parse(localStorage.getItem("noReadchatData"))){
      this.chatData = JSON.parse(localStorage.getItem("noReadchatData"));
    }
    this.getFriList();
    this.getMessage();
  },
  watch:{
    chatData:function (val,old) {
      console.log(val);
      console.log("+++++++++++++++---------------+++++++++");
      for(var i=0;i<this.friList.length;i++){
        this.friList[i].chetLs=[];
        this.friList[i].chetReNum=0;
        this.addNum = 0
        for(var j=0;j<val.length;j++){
          if(this.friList[i].userNo==val[j].userNo && val[j].status==1){
            this.friList[i].chetLs.push(val[j]);
            this.friList[i].chetReNum=this.friList[i].chetReNum+1;
          }
          if( val[j].status==2){
            this.addNum++
          }
        }

        this.$set(this.friList,i,this.friList[i]);

      }
      console.log(this.$route);
      if(this.$route.path != '/chet' & val.length>0){
        this.totleNum++;
      }

    }
  },
  methods:{
    getMessage:function () {
      this.websocket = new WebSocket("ws://appinter.sunwoda.com:9002/springws/websocket?token="+localStorage.getItem('skyUsertoken'));
//      this.websocket = new WebSocket("ws://172.30.128.39:8080/swdAPP/springws/websocket?token="+localStorage.getItem('skyUsertoken'));
      this.websocket.onopen =this.onOpen;
      this.websocket.onmessage =this.onMessage;
      this.websocket.onerror = this.onError;
      this.websocket.onclose = this.onClose;
    },

    onMessage:function (evt) {
      console.log(evt);
      if(evt.data == "连接成功" || JSON.parse(evt.data).status == 3 ){
        return
      }
      this.chatData.push(JSON.parse(evt.data));
      var loChetData = JSON.parse(localStorage.getItem("skychatData"));
      if(!loChetData){
        loChetData = [];
      }
      loChetData.push(JSON.parse(evt.data));
      localStorage.setItem("noReadchatData",JSON.stringify(this.chatData));
      localStorage.setItem("skychatData",JSON.stringify(loChetData));
    },
    onOpen: function(openEvt) {
      console.log(openEvt);
    },
    onError:function()  {

    },
    onClose:function() {
    },
    getFriList:function () {
      var vm =this;
      $.ajax({
        url: "http://appinter.sunwoda.com/weixin/common/lsfriend/friendInfo.json",

        dataType: "json",
        data:{token:localStorage.getItem('skyUsertoken'),userNo:JSON.parse(localStorage.getItem('skyUser')).userNo},
//        data:{token:"40ca34050d075798194bffd87d971f38",userNo:JSON.parse(localStorage.getItem('skyUser')).userNo},
        type: "get",
        success: function(data) {
          console.log(data);
          if(data.statusCode==0){
            vm.friList = data.dataInfo.listData;
            for(var i=0;i<vm.friList.length;i++ ){
              vm.friList[i].chetLs=[];
              vm.friList[i].chetReNum=0;
              for(var j=0;j<vm.chatData.length;j++){
                if(vm.friList[i].userNo==vm.chatData[j].userNo && vm.chatData[j].status==1){
                   vm.friList[i].chetLs.push(vm.chatData[j]);
                   vm.friList[i].chetReNum=vm.friList[i].chetReNum+1;
                }
              }
            }
            console.log(vm.friList);
          }

        },
        error: function() {

        }
      });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .router-link-active{
    color: hotpink;
  }
</style>
