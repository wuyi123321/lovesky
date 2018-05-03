<template>
   <div class="login">
    <yd-navbar title="缘分天空注册"></yd-navbar>

    <yd-step :current="step" class="steps" current-color="#ff4949" >
      <yd-step-item>
        <span slot="bottom">步骤一</span>
      </yd-step-item>
      <yd-step-item>
        <span slot="bottom">步骤二</span>
      </yd-step-item>
      <yd-step-item>
        <span slot="bottom">步骤三</span>
      </yd-step-item>
      <yd-step-item>
        <span slot="bottom">步骤四</span>
      </yd-step-item>
    </yd-step>
    <div v-show="step==1">
      <div class="tabtile">个人信息确认</div>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">昵称：</span>
          <yd-input slot="right" :show-success-icon="false" v-model="userMess.username" max="20" placeholder="请输入用户名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">工号：</span>
          <yd-input slot="right" v-model="userMess.userNo" placeholder="请输入密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">性别：</span>
          <select slot="right" v-model="userMess.gender">
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">部门：</span>
          <yd-input slot="right" v-model="userMess.department" placeholder="请填写部门"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">婚姻状态：</span>
          <select slot="right" v-model="userMess.maritalStatus">
            <option value="未婚">未婚</option>
            <option value="离异">离异</option>
          </select>
        </yd-cell-item>
      </yd-cell-group>

    </div>
    <div v-show="step==2">
      <div class="tabtile">个人信息完善</div>
      <yd-cell-group>

        <yd-cell-item>
          <span slot="left">身高：</span>
          <yd-input slot="right" v-model="userMess.height" max="3" placeholder="请输入身高"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">体重：</span>

          <yd-input slot="right" type="number" v-model="userMess.weight" placeholder="请输入体重"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">居住地：</span>

          <yd-input slot="right" v-model="userMess.area" placeholder="请输入户籍" max="8" required ></yd-input>
        </yd-cell-item>
        <yd-cell-item>

          <span slot="left">生日：</span>
          <yd-datetime  start-date="1950-01-01 15:13" type="date" v-model="userMess.birthday" slot="right"></yd-datetime>
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
        <yd-cell-item>
          <span slot="left">性格：</span>
          <span slot="right" >
            <yd-checkbox-group v-model="userMess.lTypes"  class="slectmore" >
              <yd-checkbox  v-for="item in lTypesselect" :val="item"></yd-checkbox>
            </yd-checkbox-group>
          </span>
        </yd-cell-item>
      </yd-cell-group>

    </div>
    <div v-show="step==3">
      <div class="tabtile">择偶信息填写</div>
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
          <span slot="left">择偶户籍：</span>
          <yd-input slot="right" v-model="userMess.tArea" placeholder="请填写择偶户籍"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
    </div>
    <div v-show="step==4">
      <div class="tabtile">其他信息填写</div>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">图像：</span>
          <span slot="right">
            <div class="avtor" v-if="imgs.length>0">
              <div class="deleteImg" @click="imgs=[]"><yd-icon name="delete" color="#fff" size="16px"></yd-icon></div>
             <img :src="imgs[0]" width="100%" height="100%">
            </div>
            <div class="avtor" v-if="imgs.length==0">
               <input type="file" accept="image/*"  id="inputfile" @change="preImg('inputfile')" >
              <img :src="img" width="100%" height="100%">
            </div>
          </span>
        </yd-cell-item>
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="请输入您的求偶宣言" maxlength="80" v-model="userMess.pLanguage"></yd-textarea>
      </yd-cell-item>
      </yd-cell-group>
      <div class="agree">
        <span><yd-checkbox v-model="agrre">我同意</yd-checkbox><span @click="goxieyi">缘分天空用户协议</span></span>
      </div>
    </div>
    <yd-cell-group>
      <yd-cell-item>
        <yd-button slot="left"  type="danger" @click.native="step--" :disabled="friable">上一步</yd-button>
        <yd-button slot="right" type="danger" @click.native="step++" :disabled="endable" v-show="step!=4">下一步</yd-button>
        <yd-button slot="right" type="danger" @click.native="sub" v-show="step==4" :disabled="!agrre">完成</yd-button>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>

<script>
  import camera from '@/assets/ic_photo.png'
export default {

  data () {
    return {
      agrre:true,
      endable:false,
      friable:true,
      step: 1,
      img:camera,
      userMess:{
        username:"",
        userNo:"",
        gender:"",
        department:'',
        height:"160",
        weight:"50",
        birthday:"1990-01-01",
        education:"本科",
        monthlyIncome:"",
        maritalStatus:"未婚",
        area:"",
        lTypes:["善解人意","活波开朗","甜美清新"],
        nativePlace:"",
        hobbies:"",
        wechatNumber:"",
        qq:"",
        tel:"",
        pLanguage:"",
        purchaseSituation:"",
        carSituation:"",
        graduateShcool:"",
        work:"",
        major:"",
        tEducation:"",
        tYear:"",
        tTypes:"",
        tArea:"",
        tMonthlyIncome:"",
        tPurchaseSituation:"",
        tHeight:""
      },
      lTypesselect:["善解人意","活波开朗","甜美清新","工作达人","知性女神"],
      token:null,
      imgs:[],
      subFile:[]

    }

  },
  created:function () {
    this.token = this.$route.query.token;
    if(this.token){
      localStorage.setItem("skyUsertoken",this.token);
    }
    this.getMeMess();
  },
  mounted: function(){

    this.getpersonmess();

  },
  watch:{
    step:function (val,old) {
      if(val==1){
        this.friable= true;
      }
      else if(val == 4){
        this.endable = true;
      }
      else {
        this.endable = false;
        this.friable= false;
      }
    }
  },
  methods: {
    goxieyi:function () {
      this.$router.push({path:"xieyi"})
    },
    getMeMess:function () {
      localStorage.removeItem("skyUser");
      var vm =this;
      $.ajax({
        url: vm.path+"loveTheSkyUser.json",
        dataType: "json",
        data:{token:vm.token},
        type: "get",
        success: function(data) {
          console.log(data);
          if(data.statusCode == 0){
            if(data.dataInfo.listData[0].isDelete == 0){
              vm.$router.replace({ path: '/disable'});
            }else {
              localStorage.setItem("skyUser",JSON.stringify(data.dataInfo.listData[0]));
              vm.$router.replace({ path: '/main'});
            }

          }
        },
        error: function() {

        }
      });
    },

    sub:function () {

      var vm =this;
      console.log(vm.userMess);
      var gender=0;
      if(vm.userMess.sex == "1"){
        gender = 1;
      }
      if(vm.userMess.area==""){
        vm.$dialog.toast({
          mes: "户籍不能为空",
          timeout: 500
        });
        return
      }
      if(vm.subFile.length==0){
        vm.$dialog.toast({
          mes: "请上传图片",
          timeout: 500
        });
        return
      }
      if(vm.userMess.lTypes.length==0){
        vm.$dialog.toast({
          mes: "请选择性格",
          timeout: 500
        });
        return
      }
      if(vm.userMess.pLanguage==""){
        vm.$dialog.toast({
          mes: "请填写择偶宣言",
          timeout: 500
        });
        return
      }

      console.log(vm.subFile)

      var formData = new FormData();
      formData.append('birthday', new Date(vm.userMess.birthday));
      for(var k in vm.subFile){ //文件数组
        formData.append('photo',vm.subFile[k]);
      }
      formData.append('userNo', vm.userMess.userNo);
      formData.append('username', vm.userMess.username);
      formData.append('gender', gender);
      formData.append('weight', vm.userMess.weight);
      formData.append('height', vm.userMess.height);
      formData.append('education',vm.userMess.education);
      formData.append('monthlyIncome',vm.userMess.monthlyIncome);
      formData.append('area',vm.userMess.area);
      formData.append('token', vm.token);
      formData.append('department', vm.userMess.department);
      formData.append('tel', "");
      formData.append('lTypes', vm.userMess.lTypes.join(","));
      formData.append('maritalStatus',vm.userMess.maritalStatus);
      formData.append('pLanguage', vm.userMess.pLanguage);
      formData.append('tYear', vm.userMess.tYear);
      formData.append('tTypes', vm.userMess.tTypes);
      formData.append('tArea',vm.userMess.tArea);
      formData.append('tHeight', vm.userMess.tHeight);
      console.log(formData);
      this.$dialog.loading.open('正在提交');
      $.ajax({
        type: "post",
        url:vm.path+"registerLoveTheSkyUser.json",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
          console.log(data);
          vm.$dialog.loading.close();
          if (data.statusCode == 0) {

            vm.getMeMess();
          }
        },error:function () {

        }
      });

    },
    preImg:function(id){
      var vm = this;
      var src = this.getFileUrl(id);
      vm.imgs.push(src);
      console.log( this.getFileUrl(id));
      vm.dealImage(src,{width:300},function (base) {
        console.log(vm.convertBase64UrlToBlob(base));
        vm.subFile.push(vm.convertBase64UrlToBlob(base))
        console.log(vm.imgs);
      })
  },
    getFileUrl:function (id) {//根据图片获取src
      console.log(document.getElementById(id).files[0]);
      var url;
      if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
        url = document.getElementById("inputfile").value;
      } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
        url = window.URL.createObjectURL(document.getElementById(id).files.item(0));
      } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
        url = window.URL.createObjectURL(document.getElementById(id).files.item(0));
      }else {
        url = window.webkitURL.createObjectURL(document.getElementById(id).files[0]);
      }
      return url;
    },
    dealImage: function (path, obj, callback) {
      var img = new Image();
      img.src = path;
      img.onload = function () {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 1;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
      }
    },
    convertBase64UrlToBlob: function (urlData) {
      var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {type: 'image/png'});
    },
    getpersonmess:function () {
      var vm = this;
      $.ajax({
        type:"post",
//        url:"http://appinter.sunwoda.com/common/getPersonalInfo.json",
        url:vm.path+"getDept.json",
        dataType:"json",
        data: {token:localStorage.getItem('skyUsertoken')},
        success:function(data){
          console.log(data);
          if(data.statusCode == 0){
              vm.userMess.username = data.dataInfo.listData[0].name;
              vm.userMess.userNo=data.dataInfo.listData[0].personid;
              vm.userMess.gender=data.dataInfo.listData[0].gender;
              vm.userMess.department=data.dataInfo.listData[0].orgtxt;
              if(vm.userMess.gender=="1"){
                vm.lTypesselect=["阳光帅气","成熟稳重","幽默风趣","运动达人","文艺青年"];
                vm.userMess.height="170" ;
                vm.userMess.weight="60";
                vm.userMess.lTypes=["阳光帅气","成熟稳重","幽默风趣"];
              }
          }
        }});
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .steps{
    margin-top: 0.4rem;
  }
  .tabtile{
    margin-top: 0.2rem;
    background-color: #fff;
    height: 0.6rem;
    line-height: 0.6rem;
    padding-left: 0.3rem;
    color: #ff4949;
    font-size: 0.28rem;
    border-bottom: solid 1px #eee;
  }

  .login .yd-checkb{
    margin-top: 8px;
  }
  .slectmore{
    display: flex;
    justify-content: flex-start;
    flex-wrap:wrap ;
  }
  .avtor{
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    width: 1.2rem;
    height: 1.2rem;
    position: relative;
  }
  .deleteImg{
    position: absolute;
    right: 2px;
    top: 2px;
    width: 20px;
    height: 20px;
    background: rgba(150,150,150,0.5);
    text-align: center;
    line-height: 20px;
  }
  #inputfile{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 999;
  }
  .agree{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

  }

</style>
