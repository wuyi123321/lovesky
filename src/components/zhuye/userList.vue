<template>
  <div class="center">
    <div class="item" v-for="item in userList">
      <div class="item_left">
        <!--<div class="userName">{{item.username}}</div>-->
        <div class="photo"><img :src="'https://appinter.sunwoda.com/'+item.photo" width="100%" height="100%" style="border-radius: 5px "></div>
        <!--<div style="text-align: center;color:#ffc000;margin-top: 5px" v-if="isAdmin == true">{{item.sumVote?item.sumVote:0}}票</div>-->
      </div>

      <div class="item_right">

        <div style="margin-top: 10px;white-space:nowrap;"><span>姓名:</span>
          <span style="color:#888;padding-left: 8px;white-space:nowrap; text-overflow: clip">{{item.username}}</span></div>
        <div style="margin-top: 10px"><span>性格:</span><span style="color:#888;padding-left: 8px">{{item.lTypes}}</span></div>
        <div style="margin-top: 10px"><span>户籍:</span><span style="color:#888;padding-left: 8px">{{item.area}}</span></div>
        <div style="margin-top: 10px"><span>部门:</span><span style="color:#888;padding-left: 8px">{{item.department}}</span></div>
        <div style="margin-top: 10px"><span>简介:</span>
          <span style="color:#888;padding-left: 8px" v-if="item.pLanguage &&　item.pLanguage.length>10">{{item.pLanguage.substring(0,18)}}...</span>
          <span v-else >{{item.pLanguage}}</span>
        </div>
        <div class="bot_but">
          <!--<span class="but" v-if="item.isvote == 0" @click="addVote(item)">投Ta一票</span>-->
          <!--<span class="butReady" v-else="">已投票</span>-->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import img1 from '@/assets/1.png'
  import img2 from '@/assets/2.png'
  import img3 from '@/assets/3.png'
  import img4 from '@/assets/4.png'
export default {
props:{
  userList:Array,
},
  data () {
    return {

    }
  },
  mounted: function(){
 console.log(this.userList)
  },
  methods:{

//    getFriList:function () {
//      var vm =this;
//      $.ajax({
//        url: vm.path+"findUserBytypes.json",
//        dataType: "json",
//        data:{token:vm.token,
//          userNo:JSON.parse(localStorage.getItem('skyUser')).userNo,
//          pageSize:10,
//          page:1
//        },
//        type: "get",
//        success: function(data) {
//          console.log(data);
//          if(data.statusCode==0){
//            vm.userList = data.dataInfo.listData;
//          }
//
//        },
//        error: function() {
//
//        }
//      });
//    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .center{
    padding-bottom:12px;
    background-color: #fffbe2;
    /*background-color:#fff7d3;*/
  }
  .center .item{
    background-color: #fff;
    margin-top: 10px;
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 8px;
    display: flex;
    /*height: 25vh;*/
    border-bottom: solid 1px #ddd;
    box-shadow: 0 1px 10px 0 rgba(0,0,0,.3);
  }
  .item_left{
    width: 40vw;
    display: flex;
    flex-direction: column;
  }
  .item_right{
    flex: 1;
    font-size: 0.22rem;
  }
  .userName{
    width: 36vw;
    height: 30px;
    background-image:url("./bg_name.png") ;
    background-size: 100% 100%;
    text-align: center;
    line-height:26px;
    color: #fff;
  }
  .photo{
    width: 36vw;
    height: 36vw;
    margin-top: 5px;
    border-radius: 8px;
  }
  .but {
    display: block;
    width: 50%;
    text-align: center;
    line-height: 27px;
    /*background-color: #cc1917;*/
    background-image: linear-gradient(to top, #b70005, #ec9d9c);
    margin-top: 10px;
    height: 27px;
    border-radius: 20px;
    color: #fff;
  }
  .butReady{
    display: block;
    width: 50%;
    text-align: center;
    line-height: 27px;
    background-color: #e4e4e4;
    margin-top: 10px;
    height: 27px;
    border-radius: 20px;
    color: #fff;
  }
  .box_top{
    display: flex;
    justify-content: center;
  }

</style>
