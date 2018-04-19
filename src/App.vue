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
    font-size: 0.25rem;
    height: 100%;
  }
  .yd-checklist-item-icon>input[type=checkbox] {
    position: absolute;
    left: 0;
    opacity: 0;
  }
  .yd-checkbox>input[type=checkbox] {
    position: absolute;
    left: 0;
    opacity: 0;
  }
  .yd-scrollview:after {
    content: "";
    display: block;
    width: 100%;
    height: 0;
  }
  .login .yd-checkbox{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .me .yd-cell-left{
    font-size: 0.25rem;
  }
</style>
