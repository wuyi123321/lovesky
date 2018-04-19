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
    <yd-flexbox class="friItem" v-for="(item,n) in list" @click.native="goItem(item)">
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
    chatData:Array,
  },
  data () {
    return {
     messphoto:messphoto,
     addNum:0,
     list:[],
     friList:[],
    }
  },
  watch:{
    chatData:function (val,old) {
      var vm = this;
      this.list = [];
      console.log(val);
        for(var i=0;i<this.friList.length;i++){
            this.friList[i].chetLs=[];
            this.friList[i].chetReNum=0;
            vm.addNum = 0
            for(var j=0;j<val.length;j++){
              if( val[j].status==2){
                vm.addNum=vm.addNum+1
                console.log("aaaaaaaaaaaaaa");
              }
              if(this.friList[i].userNo==val[j].userNo && val[j].status==1){
                this.friList[i].chetLs.push(val[j]);
                this.friList[i].chetReNum=this.friList[i].chetReNum+1;
              }

            }
            console.log(vm.addNum);
        }
        console.log(this.friList);
      this.list = this.friList
    }
  },
  mounted: function(){
    console.log(this.chatData);
    this.getFriList();
  },

  methods:{
    goItem:function (item) {
      this.$router.push({ path: 'chetItem',query:{chetUserNo:item.userNo}})
    },
    goadd:function () {
      this.$router.push({ path: 'addFri'})
    },
    getFriList:function () {
      var vm =this;
      $.ajax({
        url: "http://appinter.sunwoda.com/common/lsfriend/friendInfo.json",
        dataType: "json",
        data:{token:localStorage.getItem('skyUsertoken'),userNo:JSON.parse(localStorage.getItem('skyUser')).userNo},
        type: "get",
        success: function(data) {
          console.log(data);
           if(data.statusCode==0){
             vm.friList = data.dataInfo.listData;
             for(var i=0;i<vm.friList.length;i++ ){
               vm.friList[i].chetLs=[];
               vm.friList[i].chetReNum=0;
             }
             vm.list = vm.friList
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
