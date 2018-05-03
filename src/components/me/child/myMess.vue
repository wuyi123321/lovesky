<template>

  <div class="me" v-title data-title="个人信息">
    <div style="height: 0.3rem"></div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">图像</span>
        <span slot="right">
          <div class="avtor"><img :src="'http://appinter.sunwoda.com'+meMess.photo" width="100%" height="100%">
             <input :disabled="imgable" type="file" accept="image/*"  id="inputfile" @change="preImg('inputfile')" >
          </div>
        </span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">昵称</span>
        <span slot="right">{{meMess.username}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">生日</span>
        <span slot="right">{{birthdayStr}}</span>
      </yd-cell-item>
     </yd-cell-group>
    <yd-cell-group>

      <yd-cell-item>
        <span slot="left">体重</span>
        <span slot="right">{{meMess.weight}}kg</span>
      </yd-cell-item>

     </yd-cell-group>
    <yd-cell-group>

      <yd-cell-item>
        <span slot="left">婚姻状况</span>
        <span slot="right">{{meMess.maritalStatus}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">学历</span>
        <span slot="right">{{meMess.education}}</span>
      </yd-cell-item>
      <!--<yd-cell-item>-->
        <!--<span slot="left">月收入</span>-->
        <!--<span slot="right">{{meMess.monthlyIncome}}</span>-->
      <!--</yd-cell-item>-->
      <yd-cell-item @click.native="goMore">
        <span slot="left" >更多</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-item  v-show="!imgable">
      <yd-button slot="right" size="large" type="primary" @click.native="updataMess">修改个人信息</yd-button>
    </yd-cell-item>
    <div style="height: 20px"></div>
    <div class="updataPhoto" v-show="imgs.length>0">
        <img :src="imgs[0]">
        <div class="but">
            <yd-button  @click.native="uphoto">确定</yd-button>
          <div style="width: 20px;height: 100%;display: inline-block"></div>
            <yd-button @click.native="remove">取消</yd-button>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      meMess:{},
      birthdayStr:"",
      imgs:[],
      subFile:[],
      imgable:true
    }
  },
  mounted: function(){
    console.log(this.meMess);
    if(JSON.parse(this.$route.query.userMe).userNo == JSON.parse(localStorage.getItem("skyUser")).userNo){
      this.meMess = JSON.parse(localStorage.getItem("skyUser"))
      this.imgable = false;
    }else {
      this.meMess = JSON.parse(this.$route.query.userMe);
    }
    this.birthdayStr=this.dateFns.format(new Date(this.meMess.birthday), 'YYYY-MM-DD');
  },
  methods:{
    updataMess:function () {
      this.$router.push({path:"updataMess"});
    },
    goMore:function () {
      this.$router.push({path:"moreMess",query:{userMe:JSON.stringify(this.meMess)}});
    },
    remove:function () {
      this.imgs = [];
      this.subFile=[];
    },
    uphoto:function () {
      var vm=this;

      var formData = new FormData();
      formData.append('token', localStorage.getItem('skyUsertoken'));
      formData.append('photo',this.subFile[0]);
      formData.append('userNo', vm.meMess.userNo);
      vm.$dialog.loading.open('正在提交');
      $.ajax({
        type: "post",
        url: vm.path+"updateLoveTheSkyUserByUserNoPhoto.json",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        mimeType: "multipart/form-data",
        success: function (data) {
          var da = JSON.parse(data)
          if(da.message=="操作成功"){
            vm.$dialog.loading.close();
           vm.meMess.photo=da.dataInfo.listData[0];
            localStorage.setItem("skyUser", JSON.stringify(vm.meMess));
           vm.imgs = [];
           vm.subFile=[];
          }
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
    position: relative;
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
  .updataPhoto{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
.updataPhoto img{
  width: 200px;
  height: 200px;
}
.updataPhoto .but{
  margin-top: 10px;
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
</style>
