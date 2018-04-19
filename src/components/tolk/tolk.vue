<template>
    <div class="content">
      <div class="listHeader">
        <yd-tab v-model="tab" :callback="itemClick">
          <yd-tab-panel label="全部"><div style="width: 100vw"></div></yd-tab-panel>
          <yd-tab-panel label="添加"><div  style="width: 100vw"></div></yd-tab-panel>
          <yd-tab-panel label="我的"><div  style="width: 100vw"></div></yd-tab-panel>
        </yd-tab>
      </div>

      <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
         <div slot="list" v-for="(mess,n) in  tleTolk" class="tolkItem">
          <yd-flexbox class="it_top">
            <div class="imgItem"><img v-bind:src="'http://appinter.sunwoda.com'+mess.photo.replace('.','thumbnail.')" ></div>
            <yd-flexbox-item>
              <div class="name">{{mess.userName}}</div>
            </yd-flexbox-item>
          </yd-flexbox>

          <div class="it_content">
            <!--说说类型和内容显示-->
            <p><span >#{{mess.type}}#</span>{{mess.message}}</p>
            <!--说说图片展示1504504645646thumbnail.jpg-->
            <div class="showImgs">
              <div class="imgItem" v-for="i in mess.pPath==null?[]:mess.pPath.split(';')" v-if="i !=''">
                <img v-bind:src="'http://appinter.sunwoda.com'+i.replace('.','thumbnail.') " @click="clickImg(i)"/>
              </div>
            </div>
          </div>

          <!--说说的评论展示和次级回复展示并添加回复功能-->
          <div class="listReplay">
            <yd-accordion>
              <yd-accordion-item  v-for="(item,m) in mess.listReply" >
                  <div slot="title" class="me_content" style="width: 90vw">
                    <yd-flexbox class="it_top">
                      <div class="imgItem"><img :src="'http://appinter.sunwoda.com'+item.photo" width="30" height="30"></div>
                      <yd-flexbox-item>
                        <div class="name">{{item.userName}}</div>
                      </yd-flexbox-item>
                      <yd-flexbox-item>
                        <span class="name" @click="deleteMyreply(item.replyId,mess.messageId,n,m,'al')" v-if="item.pUSerNo==userNo">
                          <yd-icon name="delete" size=".35rem" color="#888" ></yd-icon>
                        </span>
                      </yd-flexbox-item>
                      <yd-flexbox-item>
                        <span class="name" @click="replayshow(mess.messageId,item.replyId,n,m,item.userName)">
                         <yd-icon name="feedback" size=".35rem" color="#888" ></yd-icon>
                        </span>
                      </yd-flexbox-item>
                    </yd-flexbox>
                    <div class="me_txt">{{item.pMessage}}</div>
                  </div>
                <div style="padding-top: 10px;background-color: #fff;padding-bottom: 5px">
                    <div v-for="(item,s) in item.listReply">
                      <div class="item_content" >
                        <div style="background-color: #eee">
                          <yd-flexbox class="it_top">
                            <div class="imgItem"><img :src="'http://appinter.sunwoda.com'+item.photo" width="30" height="30"></div>
                            <yd-flexbox-item>
                              <div class="name">
                                {{item.userName}}<span style="margin-left: 5px;margin-right: 5px">回复</span>{{item.fName}}
                                <span class="name" @click="deleteMyreply(item.replyId,mess.messageId,n,m,s)" v-if="item.pUSerNo==userNo">
                                  <yd-icon name="delete" size=".35rem" color="#888" ></yd-icon>
                                </span>
                                <span class="name" @click="replayshow(mess.messageId,item.replyId,n,m,item.userName)">
                                 <yd-icon name="feedback" size=".35rem" color="#888" ></yd-icon>
                                </span>
                              </div>
                            </yd-flexbox-item>

                          </yd-flexbox>
                          <div class="me_txt">{{item.pMessage}}</div>
                        </div>
                      </div>
                    </div>
                </div>
              </yd-accordion-item>
            </yd-accordion>
          </div>
          <!--对说说的点赞和回复-->
          <div class="it_bottom">
            <span @click="setTotal(mess.messageId,1,n,'total')">
               <yd-icon name="good" size=".35rem" color="#888"></yd-icon>{{mess.total}}
            </span>
            <span  @click="setTotal(mess.messageId,-1,n,'dTotal')">
               <yd-icon name="bad" size=".35rem" color="#888"></yd-icon>{{mess.dTotal}}
            </span>
            <span @click="replayshow(mess.messageId,0,n,'bl','no')">
               <yd-icon name="feedback" size=".35rem" color="#888" ></yd-icon>
            </span>
          </div>
        </div>
        <!---->
      <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
      <!-- 加载中提示，不指定，将显示默认加载中图标 -->
      <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
      </yd-infinitescroll>
      </yd-pullrefresh>
      <bigImg v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></bigImg>
      <yd-popup v-model="replay" position="bottom">
        <yd-cell-item>
          <yd-input slot="left"  v-model="replayContent" max="20" placeholder="请输入回复内容"></yd-input>
          <yd-button slot="right" @click.native="subReplay" :disabled="replayDisable">回复</yd-button>
        </yd-cell-item>
      </yd-popup>
    </div>
</template>

<script>
  import bigImg from '@/components/comm/bigImg.vue';


export default {
  data () {
    return {
      showImg:false,
      tab:0,
      imgSrc:"",
      tleTolk:[],
      userNo:JSON.parse(localStorage.getItem('skyUser')).userNo,
      replay:false,
      replayContent:"",
      messId :"",
      fId:"0",
      n:0,
      m:0,
      reToName:"",
      replayDisable:false,
      startPage:1,
      totalPage:0,
      userNoLi:null,
    }
  },
  components: {
    bigImg,

  },
  mounted: function(){
    this.getFriList(1);
  },
  methods:{

    itemClick:function () {
      console.log(this.tab);
      if(this.tab==0){
        this.userNoLi=null;
        this.tleTolk = [];
        this.getFriList(1);
      }
      if(this.tab==1){
        this.$router.push({ path: 'addItem'})
      }
      if(this.tab==2){
        this.tleTolk = [];
        this.userNoLi=JSON.parse(localStorage.getItem('skyUser')).userNo;
        this.getFriList(1);
      }
    },
    clickImg(img) {
      // 获取当前图片地址
      let imgsrc = "http://appinter.sunwoda.com"+img;
      this.showImg = true;
      this.imgSrc =imgsrc;

    },
    viewImg(){//图片隐藏
      this.showImg = false;
    },
    showPeople:function () {

    },
    loadMore:function () {
      this.startPage++
      console.log(this.startPage)
      console.log(this.totalPage)
      if(this.startPage>this.totalPage){
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
        return 0
      }
      this.getFriList(this.startPage);
    },
    replayshow:function (messId,fid,n,m,reToName) {
       this.replay=true;
       this.messId = messId;
       this.fId =fid;
       this.n=n;
       this.m=m;
       this.reToName = reToName
      if(this.tleTolk[n].listReply==null){//如果为null的话，赋值为空数组，便于后面进行push操作
        this.tleTolk[n].listReply=[];
      }
    },
    loadList:function () {
      console.log("aaaaa");
      this.tleTolk = [];
      this.getFriList(1,"获取成功");
    },
    deleteMyreply:function (replyId,messId,n,m,s) {
      var  vm =this;
      this.$dialog.confirm({
        title: '删除评论',
        mes: '确定要删除此评论',
        opts: () => {
          $.ajax({
            type: "get",
            url: vm.path+"deleteReply.json",
            dataType: "json",
            data:{
              token:localStorage.getItem('skyUsertoken'),
               replyId:replyId
            },
            success: function(data) {
              vm.replayDisable = false
              console.log(data);
              vm.$dialog.toast({
                mes: data.message,
                timeout: 500
              });
              if(data.statusCode==0){
                if(s=='al'){
                 vm.tleTolk[n].listReply.splice(m,1)
                }else {
                  vm.tleTolk[n].listReply[m].listReply.splice(s,1)
                }
              }
            },
            error: function() {

            }
          });
        }
      });
    },
    //点赞和点差方法
    subReplay:function () {
      var vm = this;
      if(vm.replayContent==""){
        vm.$dialog.toast({
          mes: '请填写内容！',
          timeout: 500
        });
        return 0;
      }
      vm.replayDisable = true
      $.ajax({
        type: "get",
        url: vm.path+"insertReply.json",
        dataType: "json",
        data:{
          token:localStorage.getItem('skyUsertoken'),
          pUSerNo:JSON.parse(localStorage.getItem('skyUser')).userNo,
          pMessage:vm.replayContent,
          pMessageId:vm.messId,
          fId:vm.fId,
        },
        success: function(data) {
          vm.replayDisable = false
          console.log(data);
          vm.$dialog.toast({
            mes: data.message,
            timeout: 500
          });

          if(data.statusCode==0){
            vm.replay =false;
            let me=data.dataInfo.listData[0];//返回评论的内容和id信息
            //进行其他信息封装
            me.photo=JSON.parse(localStorage.getItem('skyUser')).photo;
            me.userName=JSON.parse(localStorage.getItem('skyUser')).username;
            me.fName=vm.reToName;
            if(vm.m === 'bl'){//一级回复页面添加元素
              vm.tleTolk[vm.n].listReply.push(me);
            }else {
              vm.tleTolk[vm.n].listReply[vm.m].listReply.push(me);
            }

          }
        },
        error: function() {

        }
      });
    },

    setTotal:function (messId,type,n,name) {
        var vm  = this;
      $.ajax({
        url: vm.path+"thumbsUpMessage.json",
        dataType: "json",
        data:{
          token:localStorage.getItem('skyUsertoken'),
          tMessageId :messId,
          tType:type,
          UserNo:JSON.parse(localStorage.getItem('skyUser')).userNo
        },
        type: "get",
        success: function(data) {
          console.log(data);
         if(data.statusCode=="41058"){
           vm.$dialog.toast({
             mes: '您已经点过赞了！',
             timeout: 500
           });
         }
          if(data.statusCode==0){
            vm.tleTolk[n][name] = vm.tleTolk[n][name]+1

          }
        },
        error: function() {

        }
      });
    },
    getFriList:function (page,value) {
      var vm =this;

      $.ajax({
        url: vm.path+"findStatement.json",
        dataType: "json",

        data:{
          token:localStorage.getItem('skyUsertoken'),
          userNo:vm.userNoLi,
          pageSize:10,
          page:page
        },

        type: "get",
        success: function(data) {
          console.log(data);
          if(data.statusCode==0){
            if(value) {
              vm.$dialog.toast({
                mes: value,
                timeout: 200
              });
            }
            vm.tleTolk = vm.tleTolk.concat(data.dataInfo.listData);
            vm.totalPage = data.dataInfo.pageInfo.totalPage;
          }
          vm.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
          vm.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
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
  .listHeader{
    display: flex;
  }


 .content .yd-accordion-head-arrow {
    display: none;
  }
 .content{
   background-color: #fff9f3;

 }
  .tolkItem{
    margin-top: 10px;
    background-color: #fff;
  }
 .tolkItem .it_top{
   padding-top: 5px;
   padding-bottom: 5px;
   padding-left: 15px;
   padding-right: 15px;
 }
 .content .yd-accordion-title>span{
   width: 100%;
   display: block;
 }


 .tolkItem .it_top .imgItem img{
   width: 0.6rem;
   height: 0.6rem;
   border-radius: 50%;
 }
 .tolkItem .it_top .imgItem{
   width: 0.6rem;
   height: 0.6rem;
   border-radius: 50%;
   overflow: hidden;
 }
 .tolkItem .it_top .name{
   margin-left: 0.5rem;
   font-size: 0.22rem;
   color: #888;
 }
 .tolkItem .it_content p{
   padding-left: 15px;
   padding-right: 15px;
  }
 .tolkItem .it_content p span{
   color: #fda7f7;
   padding-right: 10px;
 }
 .tolkItem .showImgs{
   display: flex;
   justify-content: flex-start;
 }
 .showImgs .imgItem{
   max-width: 33vw;
   flex: 1;
   text-align: center;
 }
 .imgItem img{
   border: solid 1px #eee;
   width: 30vw;
   height: 30vw;
 }
.yd-accordion{
  background-color: #eee;
}
  .listReplay{
    width: 100vw;
    padding-left: 5px;
    padding-right: 5px;
    overflow-x: hidden;
  }
  .item_content{
    background-color: #fff;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    border-bottom: solid 1px #fff;
  }
 .listReplay .me_txt{
   font-size: 0.25rem;
   padding-left: 10px;
 }
  .it_bottom{
    display: flex;
  }
 .it_bottom span{
   flex: 1;
   font-size: 0.3rem;
   color: #888;
   text-align: center;
   padding-top: 8px;
   padding-bottom: 8px;
 }
</style>
