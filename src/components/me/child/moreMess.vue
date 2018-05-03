<template>
  <div class="me">
    <div style="height: 0.3rem"></div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">籍贯</span>
        <span slot="right">{{meMess.nativePlace}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">爱好</span>
        <span slot="right">{{meMess.hobbies}}</span>
      </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group>
      <yd-cell-item>
        <span slot="left">微信</span>
        <span slot="right">{{meMess.wechatNumber}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">qq</span>
        <span slot="right">{{meMess.qq}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">电话</span>
        <span slot="right">{{meMess.tel}}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">购房情况</span>
        <span slot="right">{{meMess.purchaseSituation}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">购车情况</span>
        <span slot="right">{{meMess.carSituation}}</span>
      </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group>
      <yd-cell-item>
        <span slot="left">毕业学校</span>
        <span slot="right">{{meMess.graduateShcool}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">工作</span>
        <span slot="right">{{meMess.work}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">所学专业</span>
        <span slot="right">{{meMess.major}}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-item v-show="!imgable">
      <yd-button slot="right" size="large" type="primary" @click.native="updataMess">修改个人信息</yd-button>
    </yd-cell-item>
     <div style="height: 50px;width: 100%"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      meMess:{},
      imgable:true
    }
  },
  mounted: function(){
    console.log(this.meMess);
    if(JSON.parse(this.$route.query.userMe).userNo == JSON.parse(localStorage.getItem("skyUser")).userNo){
      this.meMess = JSON.parse(localStorage.getItem("skyUser"))
      this.imgable = false
    }else {
      this.meMess = JSON.parse(this.$route.query.userMe);
    }
  },
  methods:{
    updataMess:function () {
      this.$router.push({path:"updatamMess"});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.me{
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
