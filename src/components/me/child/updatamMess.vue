<template>
  <div class="me" v-title data-title="修改个人信息">
    <div style="height: 0.3rem"></div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">籍贯：</span>
        <yd-input slot="right" v-model="userMess.nativePlace"  max="10" placeholder="请输入籍贯"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">爱好：</span>
        <yd-input slot="right" v-model="userMess.hobbies"  placeholder="请输入爱好"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">微信号：</span>
        <yd-input slot="right" v-model="userMess.wechatNumber" placeholder="请输入微信号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">qq：</span>
        <yd-input slot="right" v-model="userMess.qq" placeholder="请输入qq号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">电话号：</span>
        <yd-input slot="right" v-model="userMess.qq" max="11" type="number" placeholder="请输入电话号号"></yd-input>
      </yd-cell-item>

    </yd-cell-group>
    <yd-cell-group>

    <yd-cell-item>
      <span slot="left">购房情况：</span>
      <yd-input slot="right" v-model="userMess.purchaseSituation" placeholder="请输入购房情况"></yd-input>
    </yd-cell-item>
      <yd-cell-item>
      <span slot="left">购车情况：</span>
      <yd-input slot="right" v-model="userMess.carSituation" placeholder="请输入购车情况"></yd-input>
    </yd-cell-item>
      <yd-cell-item>
      <span slot="left">工作：</span>
      <yd-input slot="right" v-model="userMess.work" placeholder="请输入工作"></yd-input>
    </yd-cell-item>
      <yd-cell-item>
      <span slot="left">毕业学校：</span>
      <yd-input slot="right" v-model="userMess.graduateShcool" placeholder="请输入毕业学校"></yd-input>
    </yd-cell-item>
      <yd-cell-item>
      <span slot="left">专业：</span>
      <yd-input slot="right" v-model="userMess.major" placeholder="请输入专业"></yd-input>
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
        nativePlace:vm.userMess.nativePlace,
        hobbies:vm.userMess.hobbies,
        wechatNumber:vm.userMess.wechatNumber,
        qq:vm.userMess.qq,
        tel:vm.userMess.tel,
        purchaseSituation:vm.userMess.purchaseSituation,
        carSituation:vm.userMess.carSituation,
        graduateShcool:vm.userMess.graduateShcool,
        work:vm.userMess.work,
        major:vm.userMess.major
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
