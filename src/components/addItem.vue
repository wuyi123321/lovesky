<template>
  <div class="addItem" id="addItem">
      <yd-navbar title=" 发表说说">
        <yd-navbar-back-icon slot="left"  @click.native="back"></yd-navbar-back-icon>
        <yd-button  type="danger" slot="right" @click.native="subm">
          发表
        </yd-button>
      </yd-navbar>
    <div class="add_content">
      <yd-cell-item>
        <span slot="left"></span>
        <yd-input slot="right" required v-model="addType" max="20" placeholder="填写话题类型"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="填写话题内容" maxlength="500" v-model="addContent"></yd-textarea>
      </yd-cell-item>
    </div>
    <div id="smallimages">
      <div class="cream" v-for="(img,n) in imgs">
        <div class="deleteImg" @click="deleteImg(n)"><yd-icon name="delete" color="#fff" size="16px"></yd-icon></div>
        <img :src="img" width="80px" height="80px">
      </div>
      <div class="cream">
        <img :src="cameraImg" width="80px">
        <input type="file" accept="image/*" capture="camera"  id="inputfile" @change="preImg('inputfile')" >
      </div>
    </div>


  </div>
</template>

<script>
  import camera from '@/assets/ic_photo.png'
  export default {
    props:{

    },
    data() {
      return {
        cameraImg:camera,
        show:false,
        showImage:false,
        rows:8,
        addType: '',
        addContent:"",
        imgs:[],
        subFile:[]
      }
    },
    methods:{

      back:function () {
        this.$router.go(-1)
      },
      preImg:function (id) {
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
      deleteImg:function (n) {
        console.log(n);
        this.imgs.splice(n,1);
        this.subFile.splice(n,1);
        console.log(this.imgs)
        console.log(this.subFile)
      },
      subm:function () {
        if(this.addType=="" || this.addContent==""){
          this.$message('请填写完整信息');
        }else {
          var vm = this;
          vm.$dialog.loading.open('正在提交');

          var formData = new FormData();
          for(var k in this.subFile){ //文件数组
            formData.append('pPath',this.subFile[k]);
          }
          formData.append('type',this.addType);
          formData.append('message',this.addContent);
          formData.append('userNo',JSON.parse(localStorage.getItem('skyUser')).userNo);
          formData.append('token',localStorage.getItem('skyUsertoken'));
          $.ajax({
            type:"post",
            url:vm.path+"makeStatement.json",
            data:formData,
            cache: false,
            contentType: false,
            processData:false,
            mimeType:"multipart/form-data",
            success:function(data){
              var a=JSON.parse(data);
              console.log(a);
              vm.$dialog.loading.close();
              vm.back();
            }});
        }
      }
    },





  }
</script>

<style scoped>
  .addItem{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 9999;
    font-size: 0.3rem;
    background-color: #fff;
    overflow: scroll;
  }

  .addItem .add_content{
    border-bottom: dashed #fda7f7 1px;
  }

  .cream {
    position: relative;
    display: inline-block;
    overflow: hidden;
    text-decoration: none;
    text-indent: 0;
    margin-top: 10px;
    margin-left: 10px;
    width: 80px;
    height: 80px;
    border-radius: 5px;
    border: solid 1px #eee;
  }

  .cream input {
    position: absolute;
    display: block;
    font-size: 60px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .cream:hover {
    text-decoration: none;
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
</style>
