<template>
  <div class="me" v-title data-title="择偶信息">
    <div style="height: 0.3rem"></div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">择偶年龄</span>
        <span slot="right">{{meMess.tYear}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">择偶学历</span>
        <span slot="right">{{meMess.tEducation}}</span>
      </yd-cell-item>

      <yd-cell-item>
        <span slot="left">择偶身高</span>
        <span slot="right">{{meMess.tHeight}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">择偶性格</span>
        <span slot="right">{{meMess.tTypes}}</span>
      </yd-cell-item>

    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">择偶居住地</span>
        <span slot="right">{{meMess.tArea}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">择偶购房情况</span>
        <span slot="right">{{meMess.tPurchaseSituation}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">择偶购车情况</span>
        <span slot="right">{{meMess.tCarSituation}}</span>
      </yd-cell-item>
      <!--<yd-cell-item>-->
        <!--<span slot="left">择偶月收入</span>-->
        <!--<span slot="right">{{meMess.tMonthlyIncome}}</span>-->
      <!--</yd-cell-item>-->
    </yd-cell-group>
    <yd-cell-item v-show="!imgable">
      <yd-button slot="right" size="large" type="primary" @click.native="updataMess">修改择偶信息</yd-button>
    </yd-cell-item>

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
      this.$router.push({path:"updatatMess"});
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
