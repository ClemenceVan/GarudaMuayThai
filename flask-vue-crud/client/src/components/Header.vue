<template>
  <div class="header-wrapper">
    <div class="uper box">
      <div class="info">
        <a href=""><i class=""></i><span>{{ mail }}</span></a>
        <a href=""><i class=""></i><span>{{ number }}</span></a>
      </div>
      <div class="social">
        <a href=""><i class=""></i>F</a>
        <a href=""><i class=""></i>I</a>
        <a href=""><i class=""></i>D</a>
      </div>
    </div>

    <div class="middle">
      <div class="image-container">
      </div>
      <div class="search-bar">
        <input type="text" class="search-input" placeholder="Search...">
        <button class="search-button">Search</button>
      </div>
      <button class="LoggIn-button">LoggIn</button>
    </div>

    <div class="lower box">      
      <ul class="navbar-nav">
        <li class="nav-item"><a href="#" class="nav-link">About US</a></li>
        <li class="nav-item"><a href="#" class="nav-link nav-link-with">Images</a></li>
        <li class="nav-item"><a href="#" class="nav-link nav-link-with">Become Member</a></li>
        <li class="nav-item"><a href="#" class="nav-link nav-link-with">Information</a></li>
        <li class="nav-item"><a href="#" class="nav-link nav-link-with">Contact</a></li>
        <li class="nav-item"><a href="#" class="nav-link nav-link-with">Club Shop</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      mail: 'clemencent@gmail.com',
      number: '0703-858870',
      mid: 'LOGO',
    };
  },
};
</script>


<style scoped>
  .header-wrapper{
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: auto auto auto;
    height:auto;
    width:auto;
    background:red;
  }

  .middle{
    display:flex;
    justify-content: space-between;
    align-items: center; 
    grid-column: 2;
    grid-row:2;
    background:white;
  }

  .middle .LoggIn-button{
    margin-right:10px;
  }
  .uper{
    display:flex;
    justify-content: space-between;
    grid-row:1;
  }

  .uper .info{
    display:flex;
  }

  .uper a{
    padding: 0 0 0 10px;
  }

  .uper{
    padding:10px;
  }
  .lower{
    grid-row:3;
  }

  .box{
    grid-column: 2;
    background:black;  
  }

  .box p {
    color:red;
  }

  .navbar-nav {
    padding: 10px;
    display: flex;
  }

  .nav-item {
    margin: 0 10px;
  }

  .nav-link {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1.2em;
  }

  .nav-link-with::before {
    content: '';
    margin-right: 5px;
    border:1px solid;
    color:gray;
  }

  .image-container {
    margin-left:10px;
    height: 100px;
    width: 100px;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
</style>