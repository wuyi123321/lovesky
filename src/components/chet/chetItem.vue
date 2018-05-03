<template>

  <div id="message">
    <!--<yd-navbar slot="navbar" :title="personMes.username">-->
      <!--<router-link to="chet" slot="left">-->
        <!--<yd-navbar-back-icon></yd-navbar-back-icon>-->
      <!--</router-link>-->
    <!--</yd-navbar>-->
    <div class="content" id="centre">
    <div v-for="item in list" >
      <div class="leftMess" v-if="item.status == 1">
        <span> <img :src="item.photo"></span>
        <span></span>
        <span >
          <div class="messleft">{{item.msg}}</div>
        </span>
      </div>
      <div class="rightMess" v-if="item.status == 100">
        <span >
          <div class="messleft">{{item.msg}}</div>
        </span>
        <span><img :src="item.photo"></span>
      </div>
    </div>
    </div>

    <yd-cell-item slot="tabbar" class="botmess">
      <yd-input slot="left"  v-model="sendMess"  placeholder="请输入发送内容"></yd-input>
      <yd-button slot="right" @click.native="send" >回复</yd-button>
    </yd-cell-item>

  </div>
</template>

<script>
export default {
  props:{
    chatData:Array,
  },
  data () {
    return {
      userName:"121",
      sendMess:"",
      list:[],
      chetList:[],
      chetUserNo:"",
      personMes:{}
    }
  },
  watch:{
    list: 'scrollToBottom'
  },
  mounted: function(){
    this.websocket = new WebSocket("ws://appinter.sunwoda.com:9002/springws/websocket?token="+localStorage.getItem('skyUsertoken'));
    console.log(JSON.parse(localStorage.getItem("skychatData")));
    if(JSON.parse(localStorage.getItem("skychatData"))){
      this.chetList = JSON.parse(localStorage.getItem("skychatData"));
    }

    this.chetUserNo=this.$route.query.chetUserNo;
    this.getChetPerson();
    this.websocket.onmessage =this.onMessage;

  },

  methods:{
    scrollToBottom: function () {
      this.$nextTick(() => {
        var div = document.getElementById('centre');
        if(div.scrollHeight){
          div.scrollTop = div.scrollHeight
        }

      })
    },
   getChetPerson:function () {
     var vm =this;
     $.ajax({
       url: vm.path+"findLoveTheSkyUser.json",
       dataType: "json",
       data:{
         token:localStorage.getItem('skyUsertoken'),
         userNo:vm.chetUserNo
       },
       type: "get",
       success: function(data) {
         console.log(data);
         if(data.statusCode==0){
              vm.personMes = data.dataInfo.listData[0];
              vm.setChetList(data.dataInfo.listData[0]);
              document.title = vm.personMes.username
         }
       },
       error: function() {

       }
     });
   },
    onMessage:function (evt) {
     var vm =this;
      console.log("--------------------------");
      if(evt.data == "连接成功"){
        return
      }
      console.log(evt)
      var loChetData = JSON.parse(localStorage.getItem("skychatData"));
      var chatData = JSON.parse(localStorage.getItem("noReadchatData"));
      if(!chatData){
        chatData = []
      }
      if(!loChetData){
        loChetData = [];
      }
      loChetData.push(JSON.parse(evt.data));
      localStorage.setItem("skychatData",JSON.stringify(loChetData));
      this.chetList = JSON.parse(localStorage.getItem("skychatData"));
      vm.list = [];
      vm.setChetList(vm.personMes);
      console.log(this.list);
      if(JSON.parse(evt.data).userNo != this.chetUserNo){
        chatData.push(JSON.parse(evt.data));
        localStorage.setItem("noReadchatData",JSON.stringify(chatData));
      }
    },
    setChetList:function (item) {
         for(var i=0;i<this.chetList.length;i++){
           if(this.chetList[i].userNo== item.userNo && this.chetList[i].status==1){
             this.chetList[i].photo ='http://appinter.sunwoda.com'+ item.photo;
              this.list.push(this.chetList[i]);
           }
           if(this.chetList[i].userNo== item.userNo && this.chetList[i].status==100){
             this.chetList[i].photo ='http://appinter.sunwoda.com'+ JSON.parse(localStorage.getItem('skyUser')).photo;
             this.list.push(this.chetList[i]);
           }
         }
    },
    send:function () {
     var vm =this;
      if (vm.websocket.readyState == (vm.websocket.OPEN == undefined ? 1 : vm.websocket.OPEN)) {
        var socketMsg = {
          status: "1",
          userNo: vm.chetUserNo,//要发送消息的用户的userId,ALL为发送给所有人
          msg: vm.sendMess
        };
        vm.websocket.send(JSON.stringify(socketMsg));//调用后台handleTextMessage方法;
        var loChetData = JSON.parse(localStorage.getItem("skychatData"));
        if(!loChetData){
          loChetData = [];
        }
        var chetmess = {
          status: "100",
          userNo: vm.chetUserNo,//要发送消息的用户的userId,ALL为发送给所有人
          msg: vm.sendMess,
          time:"2017"
        }
        loChetData.push(chetmess);
        localStorage.setItem("skychatData",JSON.stringify(loChetData));
        vm.sendMess = "";
        this.chetList = JSON.parse(localStorage.getItem("skychatData"));
        vm.list = [];
        vm.setChetList(vm.personMes);
      }else {
        vm.websocket = new WebSocket("ws://appinter.sunwoda.com:9002/springws/websocket?token="+localStorage.getItem('skyUsertoken'));
      }
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #message{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content{
    width: 100%;
      flex: 1;
    overflow: scroll;
  }
.botmess{

  background-color: #fff;
  border-top: solid 1px #eee;
}
.leftMess{
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  display: flex;
}
  .leftMess img{
    width: 1rem;
    height: 1rem;

  }
.leftMess span:first-child{
  width: 1rem;
  height: 1rem;
}
  .leftMess span:last-child{
    flex: 1;
    display: flex;
    align-items: center;
  }
  .messleft{
    min-height: 0.65rem;
    background-color: #fff;
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    line-height: 0.65rem;
}
.rightMess {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.rightMess img{
  width: 1rem;
  height: 1rem;

}
.rightMess span:last-child{
  width: 1rem;
  height: 1rem;
}
.rightMess span:first-child{
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

</style>
