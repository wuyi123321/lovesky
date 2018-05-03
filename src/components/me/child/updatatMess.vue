<template>
  <div class="me" v-title data-title="修改择偶信息">
    <div style="height: 0.3rem"></div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">择偶身高：</span>
        <yd-input slot="right" v-model="userMess.tHeight" type="number" max="3" placeholder="请输入择偶身高"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">择偶年龄：</span>
        <yd-input slot="right" v-model="userMess.tYear"  placeholder="请输入择偶年龄"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">择偶性格：</span>
        <yd-input slot="right" v-model="userMess.tTypes" placeholder="请输入择偶性格"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">择偶学历：</span>
        <select slot="right" v-model="userMess.tEducation">
          <option value="大专以下">大专以下</option>
          <option value="专科">专科</option>
          <option value="本科">本科</option>
          <option value="研究生">研究生</option>
          <option value="博士">博士</option>
          <option value="博士以上">博士以上</option>
        </select>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">择偶户籍：</span>
        <yd-input slot="right" v-model="userMess.tArea" placeholder="请填写择偶户籍"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>

    <yd-cell-item>
      <span slot="left">择偶购房情况：</span>
      <yd-input slot="right" v-model="userMess.tPurchaseSituation" placeholder="请输入择偶购房情况"></yd-input>
    </yd-cell-item>
      <yd-cell-item>
      <span slot="left">择偶购车情况：</span>
      <yd-input slot="right" v-model="userMess.tCarSituation" placeholder="请输入购车情况"></yd-input>
    </yd-cell-item>

      <!--<yd-cell-item>-->
        <!--<span slot="left">择偶月收入：</span>-->
        <!--<select slot="right" v-model="userMess.tMonthlyIncome">-->
          <!--<option value="3000以下">3000以下</option>-->
          <!--<option value="3000-5000">3000-5000</option>-->
          <!--<option value="5000-8000">5000-8000</option>-->
          <!--<option value="8000-10000">8000-10000</option>-->
          <!--<option value="10000以上">10000以上</option>-->
        <!--</select>-->
      <!--</yd-cell-item>-->
      <yd-cell-item>
        <span slot="left">求偶宣言：</span>
        <yd-textarea slot="right" placeholder="请输入您的求偶宣言" maxlength="80" v-model="userMess.pLanguage"></yd-textarea>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-item >
      <yd-button slot="right" size="large" type="primary" @click.native="updataMess">确认修改</yd-button>
    </yd-cell-item>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      birthdayStr:"",
      userMess:JSON.parse(localStorage.getItem('skyUser')),
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function(){
    console.log(this.userMess);
    this.birthdayStr=this.dateFns.format(new Date(this.userMess.birthday), 'YYYY-MM-DD');
  },
  methods:{
    updataMess:function () {
      var vm =this;
      var pram ={
        token:localStorage.getItem('skyUsertoken'),
        userNo:vm.userMess.userNo,
        tEducation:vm.userMess.tEducation,
        tYear:vm.userMess.tYear,
        tTypes:vm.userMess.tTypes,
        tArea:vm.userMess.tArea,
        tMonthlyIncome:vm.userMess.tMonthlyIncome,
        tPurchaseSituation:vm.userMess. tPurchaseSituation,
        tHeight:vm.userMess.tHeight,
        tCarSituation:vm.userMess.tCarSituation,
        pLanguage:vm.userMess.pLanguage
      };
      $.ajax({
        url: vm.path+"updateLoveTheSkyUserByUserNo.json",
        dataType: "json",
        data:pram,
        type: "get",
        success: function(data) {
          console.log(data);
          if(data.statusCode==0){
            vm.userMess.birthday = new Date(vm.birthdayStr).valueOf();
            localStorage.setItem("skyUser", JSON.stringify(vm.userMess));
            vm.$router.go(-1)
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
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    width: 1.2rem;
    height: 1.2rem;
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
