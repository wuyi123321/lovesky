<template>
  <div class="me">
    <div style="height: 0.3rem"></div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">图像</span>
        <span slot="right">
          <div class="avtor"><img :src="'http://appinter.sunwoda.com'+meMess.photo" width="100%" height="100%"></div>
        </span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">昵称</span>
        <span slot="right">{{meMess.username}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">籍贯</span>
        <span slot="right">{{meMess.area}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身高</span>
        <span slot="right">{{meMess.height}}cm</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">性格</span>
        <span slot="right">{{meMess.lTypes}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">爱好</span>
        <span slot="right" style="padding-left: 15px;line-height: 0.4rem">{{meMess.hobbies}}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item>
        <yd-icon  slot="icon" size=".42rem" name="tencent-weibo"></yd-icon>
        <span slot="left">用户协议</span>
        <span slot="right"></span>
      </yd-cell-item>
    </yd-cell-group>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      meMess:JSON.parse(localStorage.getItem('skyUser')),
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function(){
    console.log(this.meMess);
  },
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
