<template>
  <div class="me">
    <yd-flexbox class="metop" @click.native="goitem('myMess')">
      <div class="avtor"><img :src="'http://appinter.sunwoda.com'+meMess.photo" width="100%" height="100%"></div>
      <yd-flexbox-item>
        <div class="name">
          <span style="padding-right: 10px">{{meMess.username}}</span>
          <yd-icon name="ucenter" size="0.33rem" color="#0082e6" v-if="meMess.gender == 1"></yd-icon>
          <yd-icon name="ucenter" size="0.33rem" color="#ff4d51" v-else></yd-icon></div>
        <div class="depart">{{meMess.department}}</div>
      </yd-flexbox-item>
    </yd-flexbox>
    <div style="height: 15px"></div>
    <yd-cell-group>
      <yd-cell-item @click.native="goitem('loveMess')">
        <yd-icon slot="icon" name="order" size=".42rem"></yd-icon>
        <span slot="left">

           <span style="height: 100%">择偶标准</span>
        </span>
        <span slot="right"></span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">说说</span>
        <span slot="right"></span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">居住地</span>
        <span slot="right">{{meMess.area}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身高</span>
        <span slot="right">{{meMess.height}}cm</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">性格</span>
        <span slot="right">{{meMess.lTypes}}</span>
      </yd-cell-item>
    </yd-cell-group>
    <div class="plange">
      <p >{{meMess.pLanguage}}</p>
    </div>
    <div v-if="meMess.isFri == 1">
      <yd-cell-item >
        <yd-button slot="right" size="large" type="primary" @click.native="gochet">发消息</yd-button>
        </yd-cell-item >
         <yd-cell-item >
        <yd-button slot="right" size="large" type="primary" @click.native="deletF">删除好友</yd-button>
      </yd-cell-item>
    </div>

     <yd-cell-item v-if="meMess.isFri == 0">
        <yd-button slot="right" size="large" type="primary" @click.native="doSendfunction">加好友</yd-button>
      </yd-cell-item>
    <div style="height: 50px"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      meMess:{},
      friNo:"",
      friList:[]
    }
  },
  mounted: function(){
    console.log(this.meMess);

    this.websocket = new WebSocket("ws://appinter.sunwoda.com:9002/springws/websocket?token="+localStorage.getItem('skyUsertoken'));
    this.friNo=this.$route.query.friNo;
    this.getFriList();
    this.websocket.onmessage =this.onMessage;
  },
  methods:{
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
       chatData.push(JSON.parse(evt.data));
       localStorage.setItem("noReadchatData",JSON.stringify(chatData));
    },
    goitem:function (path) {
      this.$router.push({path: path,query:{userMe:JSON.stringify(this.meMess)}});
    },
    getfridata:function () {
      var vm =this;
      $.ajax({
        url: vm.path+"findLoveTheSkyUser.json",
        dataType: "json",
        data:{token:localStorage.getItem('skyUsertoken'),userNo:vm.friNo},
        type: "get",
        success: function(data) {
          console.log(data);
          if(data.statusCode==0){
            data.dataInfo.listData[0].isFri = 0;
            vm.meMess = data.dataInfo.listData[0];
            for(var i = 0;i<vm.friList.length;i++){
              if(vm.friList[i].userNo == vm.friNo){
                vm.meMess.isFri = 1;
                return
              }
            }
          }

        },
        error: function() {

        }
      });
    },
    gochet:function () {
      this.$router.push({ path: 'chetItem',query:{chetUserNo:this.friNo}})
    },
    deletF:function () {
      var vm = this;
      $.ajax({
        url: "http://appinter.sunwoda.com/weixin/common/lsfriend/delFriend.json",
        dataType: "json",
        data:{
          token:localStorage.getItem('skyUsertoken'),
          userNo:JSON.parse(localStorage.getItem('skyUser')).userNo,
          friendNo:this.friNo,
        },
        type: "get",
        success: function(data) {
          console.log(data);
          vm.$dialog.toast({
            mes:data.message,
            timeout: 500
          });
          if(data.statusCode==0){
           vm.$router.go(0)
          }

        },
        error: function() {

        }
      });
    },
    getFriList:function () {
      var vm =this;
      $.ajax({
        url: "http://appinter.sunwoda.com/weixin/common/lsfriend/friendInfo.json",
        dataType: "json",
        data:{token:localStorage.getItem('skyUsertoken'),userNo:JSON.parse(localStorage.getItem('skyUser')).userNo},
        type: "get",
        success: function(data) {
          console.log(data);
          if(data.statusCode==0){
            vm.friList = data.dataInfo.listData;
            vm.getfridata();
            console.log(vm.friList);
          }

        },
        error: function() {

        }
      });
    },
    doSendfunction () {
      if (this.websocket.readyState == (this.websocket.OPEN==undefined?1:this.websocket.OPEN)) {
        var socketMsg={
          status:2,
          userNo:this.friNo,//要发送消息的用户的userId,ALL为发送给所有人
          msg:"请求加为好友"
        };
        this.websocket.send(JSON.stringify(socketMsg));//调用后台handleTextMessage方法
        this.$dialog.toast({
          mes: "申请消息已经发出，等待对方回应",
          timeout: 1000
        });
      } else {

        this.websocket = new WebSocket("ws://appinter.sunwoda.com:9002/springws/websocket?token="+localStorage.getItem('skyUsertoken'));
        this.$dialog.toast({
          mes: "消息发送失败，请重新发送",
          timeout:1000
        });
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.me{
  margin-top: 0.3rem;
}
.plange{
 background-color: #fff;
  padding: 15px;
  font-size: 0.3rem;
  color: #555;

}
  .yd-flexbox-horizontal{
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    background-color: #fff;
  }
  .metop{
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
  }
  .avtor{
    width: 1.3rem;
    height: 1.3rem;
  }
  .yd-flexbox-item{
    padding-left: 0.35rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
.name{
  font-size: 0.3rem;
}
.itemName{
  font-size: 0.25rem;
}
  .depart{
    margin-top: 5px;
    font-size: 0.25rem;
    color: #888;
  }
</style>
