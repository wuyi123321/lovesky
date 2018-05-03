<template>
  <div class="chet">
    <div class="nofri" v-if="list.length==0">
       暂时没有好友请求
    </div>
    <yd-flexbox class="friItem" v-for="(item,n) in list">
      <div class="avtor">
          <yd-icon name="ucenter-outline"></yd-icon>
      </div>
      <yd-flexbox-item>
        <div class="name">{{item.userNo}} 请求</div>
      </yd-flexbox-item>
      <yd-flexbox-item>
        <yd-button type="primary" @click.native="agree(item,n)">同意</yd-button>
        <yd-button type="danger" @click.native="disagree(item,n)">拒绝</yd-button>
      </yd-flexbox-item>

    </yd-flexbox>
  </div>
</template>

<script>

  import messphoto from '@/assets/message.png'
export default {

  data () {
    return {
     messphoto:messphoto,
     addNum:0,
     list:[],
      mlist:[],
     chetlist:[],
    }
  },
  watch:{

  },

  mounted: function(){
    if(JSON.parse(localStorage.getItem("skychatData"))){
      this.chetList = JSON.parse(localStorage.getItem("skychatData"));
    }else {
      this.chetList=[]
    }
    console.log(this.chetList);
    for(var i=0;i<this.chetList.length;i++){
      if(this.chetList[i].status == 2){
        this.list.push(this.chetList[i])
        this.mlist.push(this.chetList[i])
      }
    }
  },

  methods:{
    agree:function (item,n) {
      var vm = this;
      $.ajax({
        url: "http://appinter.sunwoda.com/weixin/common/lsfriend/addFriend.json",
        dataType: "json",
        data:{
          token:localStorage.getItem('skyUsertoken'),
          userNo:JSON.parse(localStorage.getItem('skyUser')).userNo,
          friendNo:item.userNo,
          status:0
        },
        type: "get",
        success: function(data) {
          console.log(data);
          vm.$dialog.toast({
            mes:data.message,
            timeout: 500
          });
          if(data.statusCode==0 || data.statusCode==-1){
            console.log(vm.list);
            vm.list.splice(n,1);
            console.log(vm.list);
            for(var i=vm.chetList.length-1;i>=0;i--){
              if(vm.chetList[i].status == 2 && vm.chetList[i].userNo == item.userNo){
                var loChetData = JSON.parse(localStorage.getItem("skychatData"));
                if(!loChetData){
                  loChetData = [];
                }
                loChetData.splice(i,1);
                localStorage.setItem("skychatData",JSON.stringify(loChetData));
              }
            }
          }

        },
        error: function() {

        }
      });
    },
    disagree:function (item,n) {
      var vm = this;
      vm.list.splice(n,1);
      console.log(vm.list);
      for(var i=vm.chetList.length-1;i>=0;i--){
        if(vm.chetList[i].status == 2 && vm.chetList[i].userNo == item.userNo){
          var loChetData = JSON.parse(localStorage.getItem("skychatData"));
          if(!loChetData){
            loChetData = [];
          }
          loChetData.splice(i,1);
          localStorage.setItem("skychatData",JSON.stringify(loChetData));
        }
    }}
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nofri{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #fff;
  }
 .friItem{
   background-color: #fff;
   padding-top: 0.12rem;
   padding-left: 0.3rem;
   padding-right: 0.3rem;
   padding-bottom: 0.12rem;
   border-bottom: solid 0.01rem #eee;
 }
  .avtor{
    width: 1.1rem;
    height: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
    border: solid 1px #eee;
  }
 .yd-flexbox-item{
   padding-left: 0.35rem;
 }

</style>
