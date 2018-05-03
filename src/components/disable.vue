<template>
  <div class="disable" >
      <span>由于您的非法行为，您已经被管理员禁用</span>
  </div>
</template>

<script>
  import camera from '@/assets/ic_photo.png'
  export default {
    props:{

    },
    data() {
      return {

      }
    },
    methods:{


      },



  }
</script>

<style scoped>
  .disable{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    display: flex;
    justify-content:center ;
    align-items: center;
  }
  .disable span{
    background-color: #fff;
    padding: 10px;
    color: #ff4949;
    border-radius: 5px;
    font-size: 0.3rem;
  }
</style>
