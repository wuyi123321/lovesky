<template>
  <yd-layout>

    <router-view :chatData="chatData"></router-view>

    <yd-tabbar slot="tabbar" active-color="#888">
      <yd-tabbar-item title="首页" link="zhuye" :active="true">
        <yd-icon name="home" slot="icon" size="0.4rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="发现" link="tolk" :active="true">
        <yd-icon name="discover" slot="icon" size="0.4rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="消息" link="chet"  :active="true">
        <yd-badge slot="badge" type="danger">99+</yd-badge>
        <yd-icon name="weixin" slot="icon" size="0.4rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="我" link="me" :active="true">
        <yd-icon name="ucenter" slot="icon" size="0.4rem"></yd-icon>

      </yd-tabbar-item>
    </yd-tabbar>

  </yd-layout>
</template>

<script>
export default {

  data () {
    return {
     chatData:[]
    }
  },
  mounted: function(){
    this.getMessage();
  },

  methods:{
    getMessage:function () {
      this.websocket = new WebSocket("ws://appinter.sunwoda.com:9002/springws/websocket?token="+localStorage.getItem('skyUsertoken'));
      console.log(this.websocket)
      this.websocket.onopen =this.onOpen;
      this.websocket.onmessage =this.onMessage;
      this.websocket.onerror = this.onError;
      this.websocket.onclose = this.onClose;
    },
    onMessage:function (evt) {
      console.log(evt);
      if(evt.data == "连接成功"){
        return
      }
      this.chatData.push(JSON.parse(evt.data));
      var loChetData = JSON.parse(localStorage.getItem("skychatData"));
      if(!loChetData){
        loChetData = [];
      }
      loChetData.push(JSON.parse(evt.data));
      localStorage.setItem("skychatData",JSON.stringify(loChetData));

    },
    onOpen: function(openEvt) {
      console.log(openEvt);
    },
    onError:function()  {
      alert("AAAA");
      this.$message({type: 'error', message: '通信系统异常，聊天系统无法使用'});

    },
    onClose:function() {
      this.$message({type: 'error', message: '通信系统异常，聊天系统无法使用'});
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .router-link-active{
    color: hotpink;
  }
</style>
