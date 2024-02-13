<template>
  <div class="header-wrapper">
    <div class="uper box">
      <p >{{ up }}</p>
    </div>
    <div class="middle">
      <p >{{ mid }}</p>
    </div>
    <div class="lower box">
      <p >{{ bottom }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      up: 'LOGO',
      mid: 'LOGO',
      bottom: 'LOGO',
    };
  },
};
</script>


<style scoped>
  .header-wrapper{
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 30px 100px 30px;
    height:auto;
    width:auto;
    background:red;
  }

  .middle{
    grid-column: 2;
    grid-row:2;
    height:100px;
    background:white;
  }

  .uper{
    grid-row:1;
  }
  .lower{
    grid-row:3;
  }

  .box{
    grid-column: 2;
    height:30px;
    background:black;  
  }

  .box p {
    color:red;
  }

</style>