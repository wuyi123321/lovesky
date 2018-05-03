<template>
  <div class="chet">
    <yd-flexbox class="friItem" @click.native="goadd">
      <div class="avtor"><img :src=" messphoto" width="100%" height="100%"></div>
      <yd-flexbox-item>
      好友请求
      </yd-flexbox-item>

      <yd-flexbox-item style="text-align: right">
        <yd-badge type="danger" v-if="addNum>0">{{addNum}}</yd-badge>
      </yd-flexbox-item>
    </yd-flexbox>
    <yd-flexbox class="friItem" v-for="(item,n) in  friList" @click.native="goItem(item)">
      <div class="avtor"><img :src="'http://appinter.sunwoda.com'+item.headPhoto" width="100%" height="100%"></div>
      <yd-flexbox-item>
        <div class="name">{{item.userName}}</div>
        <div v-if="item.online" style="color: #11b95c;font-size: 0.22rem">在线</div>
        <div v-else style="color: #888;font-size: 0.22rem;margin-top: 5px">离线</div>
      </yd-flexbox-item>
      <yd-flexbox-item>
        <span v-if="item.chetLs.length>0" style="font-size: 0.24rem;color: #888">{{item.chetLs[item.chetLs.length-1].msg.substring(0,4)}}...</span>
      </yd-flexbox-item>
      <yd-flexbox-item style="text-align: right">
        <yd-badge type="danger" v-if="item.chetReNum>0">{{item.chetReNum}}</yd-badge>
      </yd-flexbox-item>
    </yd-flexbox>
  </div>
</template>

<script>

  import messphoto from '@/assets/message.png'
export default {
  props:{
    friList:Array,
    addNum:Number

  },
  data () {
    return {
     messphoto:messphoto,
     chatData:[],
    }
  },
  watch: {
//    chatDataS: {
//      handler(newValue, oldValue) {
//        console.log("sasdasdasda");
//        this.chatData = JSON.parse(localStorage.getItem("noReadchatData"));
//        console.log(this.friList);
//      },
//      deep: true
//    }
  },
  mounted: function(){

    if(localStorage.getItem("noReadchatData")){
      this.chatData = JSON.parse(localStorage.getItem("noReadchatData"));
    }
    console.log( this.chatData);

  },

  methods:{
    goItem:function (item) {
      for (var i = this.chatData.length-1;i >= 0;i--) {
        if(this.chatData[i].status == 1 && this.chatData[i].userNo == item.userNo){
          this.chatData.splice(i,1);
        }
      }
      localStorage.setItem("noReadchatData",JSON.stringify(this.chatData));
      console.log(this.chatData);
      this.$router.push({ path: 'chetItem',query:{chetUserNo:item.userNo}})
    },
    goadd:function () {
      for (var i = this.chatData.length-1;i >= 0;i--) {
        if(this.chatData[i].status == 2){
          this.chatData.splice(i,1);
        }
      }
      localStorage.setItem("noReadchatData",JSON.stringify(this.chatData));
      this.$router.push({ path: 'addFri'})
    },

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  }
 .yd-flexbox-item{
   padding-left: 0.35rem;
 }

</style>
