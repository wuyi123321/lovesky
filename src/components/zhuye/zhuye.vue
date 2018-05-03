<template>
  <div id="zhuye">
  <yd-slider autoplay="3000">
    <yd-slider-item v-for="i in imgs">
        <img :src="i">
    </yd-slider-item>
  </yd-slider>
    <yd-tab  v-model="tab2">
      <yd-tab-panel label="所有">
         <div style="height:2px;width: 100%;display:none" >1</div>
      </yd-tab-panel >
      <yd-tab-panel label="性格">
        <yd-checkbox-group v-model="lTypes">
          <yd-checkbox v-for="item in types" :val="item"  >
            <span>{{item}}</span>
          </yd-checkbox>
        </yd-checkbox-group>
      </yd-tab-panel>
      <yd-tab-panel label="学历">
        <yd-checkbox-group v-model="education">
          <yd-checkbox v-for="item in educationselect" :val="item"  >
            <span>{{item}}</span>
          </yd-checkbox>
        </yd-checkbox-group>
      </yd-tab-panel>
      <!--<yd-tab-panel label="收入" >-->
        <!--<yd-checkbox-group v-model="monthlyIncome">-->
          <!--<yd-checkbox v-for="item in monthlyIncomeselect" :val="item"  >-->
            <!--<span>{{item}}</span>-->
          <!--</yd-checkbox>-->
        <!--</yd-checkbox-group>-->
      <!--</yd-tab-panel>-->

      <yd-tab-panel label="姓名" >
      <yd-cell-group>
        <yd-cell-item>
          <input type="text" slot="right" placeholder="请输入姓名进行查询" v-model="username">

          <!-- ↓↓关键代码是这里↓↓ -->
          <yd-sendcode slot="right"
                       @click.native="selectName"
                       type="warning"
                       init-str="查询"
          ></yd-sendcode>
          <!-- ↑↑关键代码是这里↑↑ -->

        </yd-cell-item>
        </yd-cell-group>
      </yd-tab-panel>
    </yd-tab>

    <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">

      <userList slot="list" :userList="userLists"></userList>
      <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
      <!-- 加载中提示，不指定，将显示默认加载中图标 -->
      <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
    </yd-infinitescroll>


  </div>

</template>

<script>
  import img1 from '@/assets/1.png'
  import img2 from '@/assets/2.png'
  import img3 from '@/assets/3.png'
  import img4 from '@/assets/4.png'
  import userList from './userList.vue'

export default {

  data () {
    return {
      imgs:[img1,img2,img3,img4],
      userLists:[],
      starPage:1,
      totalPage:0,
      tab2: 0,
      types:[],
      educationselect:["大专以下","专科","本科","研究生","博士","博士以上"],
      monthlyIncomeselect:["3000以下","3000-5000","5000-8000","8000-10000","10000以上"],
      lTypes:[],
      education:[],
      monthlyIncome:[],
      username:"",
      endpram:{
        token:localStorage.getItem('skyUsertoken'),
        userNo:JSON.parse(localStorage.getItem('skyUser')).userNo,
        pageSize:10,
      }
    }
  },
  watch:{
    tab2:function (val,old) {
      console.log(val);
      if(val == 0){
        this.userLists=[]
        this.endpram={
          token:localStorage.getItem('skyUsertoken'),
          userNo:JSON.parse(localStorage.getItem('skyUser')).userNo,
          pageSize:10,
        };
        this.starPage = 1;
        this.getFriList(this.starPage)
      }
    },
    lTypes:function (val,old) {
      this.userLists=[];
      this.endpram={
        token:localStorage.getItem('skyUsertoken'),
        userNo:JSON.parse(localStorage.getItem('skyUser')).userNo,
        pageSize:10,
        lTypes:val.join(",")
      };
      this.starPage = 1;
      this.getFriList(this.starPage)
    },
    monthlyIncome:function (val,old) {
      if(val.length>1){
        this.monthlyIncome = val.slice(1)
      }
      if(val.length == 1){
        this.userLists=[];
        this.endpram={
          token:localStorage.getItem('skyUsertoken'),
          userNo:JSON.parse(localStorage.getItem('skyUser')).userNo,
          pageSize:10,
          monthlyIncome:this.monthlyIncome.join('')
        };
        this.starPage = 1;
        this.getFriList(this.starPage)
      }

    },
    education:function (val,old) {
      if(val.length>1){
        this.education = val.slice(1)
      }
      if(val.length == 1){
        this.userLists=[];
        this.endpram={
          token:localStorage.getItem('skyUsertoken'),
          userNo:JSON.parse(localStorage.getItem('skyUser')).userNo,
          pageSize:10,
          education:this.education.join('')
        };
        this.starPage = 1;
        this.getFriList(this.starPage)
      }

    }
  },
  mounted: function(){
    console.log(JSON.parse(localStorage.getItem('skyUser')).gender);
    if(JSON.parse(localStorage.getItem('skyUser')).gender==1){
      this.types = ["善解人意","活波开朗","甜美清新","工作达人","知性女神"]
    }else {
      this.types = ["阳光帅气","成熟稳重","幽默风趣","运动达人","文艺青年"]
    }
    this.getFriList(1);
  },
  components: {
    userList
  },
  methods:{
    selectName:function () {
      this.userLists=[];
      this.endpram={
        token:localStorage.getItem('skyUsertoken'),
        userNo:JSON.parse(localStorage.getItem('skyUser')).userNo,
        pageSize:10,
        username:this.username
      };
      this.starPage = 1;
      this.getFriList(this.starPage)
    },
    loadMore:function () {
      this.starPage++
      if(this.starPage>this.totalPage){
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
        return 0
      }
      this.getFriList(this.starPage)
    },
    getFriList:function (page) {
      var vm =this;
      vm.endpram.page=page;
      $.ajax({
        url: vm.path+"findUserBytypes.json",
        dataType: "json",
        data:vm.endpram,
        type: "get",
        success: function(data) {
          console.log(data);
          if(data.statusCode==0){
            vm.userLists = vm.userLists.concat(data.dataInfo.listData);
            vm.totalPage = data.dataInfo.pageInfo.totalPage;
            vm.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
          }

        },
        error: function() {

        }
      });
    }
  }
}
</script>

<style scoped>
  .yd-checkbox{
    min-width: 33vw;
    padding-top: 0.3rem;
    padding-left: 0.2rem;
    padding-right: 0;
  }
  .yd-checkbox:last-child{
    padding-bottom: 0.3rem;
  }
</style>
