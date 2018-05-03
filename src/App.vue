<template>
  <div id="main">
      <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #main{
    font-size: 0.28rem;
    height: 100%;
  }

  #main .listHeader .yd-tab-box {
    width: 100vw;
  }
  #main .yd-checklist-item-icon>input[type=checkbox] {
    position: absolute;
    left: 0;
    opacity: 0;
  }
  #main .yd-checkbox>input[type=checkbox] {
    position: absolute;
    left: 0;
    opacity: 0;
  }
  #main .yd-scrollview:after {
    content: "";
    display: block;
    width: 100%;
    height: 0;
  }
  #main .yd-accordion-head-arrow {
    overflow: hidden;
    height: 100%;
    min-height: 1rem;
    display: none;
  }
  .login .yd-checkbox{
    margin-top: 5px;
    margin-bottom: 5px;
  }
#message .yd-cell-left{
  width: 80%;
}
 .content .yd-cell-left{
  width: 80%;
}
  .addItem .yd-textarea>textarea{
    height: 2.5rem;
  }
</style>
