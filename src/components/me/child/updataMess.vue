<template>
  <div class="me"  v-title data-title="修改个人信息">
    <div style="height: 0.3rem"></div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">昵称：</span>
        <yd-input slot="right" :show-success-icon="false" v-model="userMess.username" max="20" placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">性别：</span>
        <select slot="right" v-model="userMess.gender">
          <option value="1">男</option>
          <option value="0">女</option>
        </select>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">居住地：</span>
        <yd-input slot="right" v-model="userMess.area" placeholder="请输入户籍" max="8"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">婚姻状态：</span>
        <select slot="right" v-model="userMess.maritalStatus">
          <option value="未婚">未婚</option>
          <option value="离异">离异</option>
        </select>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>
    <yd-cell-item>
      <span slot="left">身高：</span>
      <yd-input slot="right" v-model="userMess.height" max="3" placeholder="请输入身高(cm)"></yd-input>
    </yd-cell-item>
    <yd-cell-item>
      <span slot="left">体重：</span>

      <yd-input slot="right" type="number" v-model="userMess.weight" placeholder="请输入体重(kg)"></yd-input>
    </yd-cell-item>

    <yd-cell-item>

      <span slot="left">生日：</span>
      <yd-datetime  start-date="1950-01-01 15:13" type="date" v-model="birthdayStr" slot="right"></yd-datetime>
    </yd-cell-item>
    <yd-cell-item>
      <span slot="left">学历：</span>
      <select slot="right" v-model="userMess.education">
        <option value="大专以下">大专以下</option>
        <option value="专科">专科</option>
        <option value="本科">本科</option>
        <option value="研究生">研究生</option>
        <option value="博士">博士</option>
        <option value="博士以上">博士以上</option>
      </select>
    </yd-cell-item>
      <!--<yd-cell-item>-->
        <!--<span slot="left">月收入：</span>-->
        <!--<select slot="right" v-model="userMess.monthlyIncome">-->
          <!--<option value="3000以下">3000以下</option>-->
          <!--<option value="3000-5000">3000-5000</option>-->
          <!--<option value="5000-8000">5000-8000</option>-->
          <!--<option value="8000-10000">8000-10000</option>-->
          <!--<option value="10000以上">10000以上</option>-->
        <!--</select>-->

      <!--</yd-cell-item>-->
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
        username:vm.userMess.username,
        birthdayStr:vm.birthdayStr,
        gender:vm.userMess.gender,
        height:vm.userMess.height,
        weight:vm.userMess.weight,
        education:vm.userMess.education,
        monthlyIncome:vm.userMess.monthlyIncome,
        maritalStatus:vm.userMess.maritalStatus,
        area:vm.userMess.area
      };
      $.ajax({
        url: vm.path+"updateLoveUserByUserNo.json",
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
