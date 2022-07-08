<template>
    <div>
        <el-container>
            <el-aside width="200px" >
                <el-row class="tac" >
                    <el-col >
                        <el-menu
                        :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        router
                        exact
                        >
                         <el-menu-item index="/Layout">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">首页面板</span>
                        </el-menu-item>
                        <el-menu-item index="/goods">
                            <i class="el-icon-s-cooperation"></i>
                            <span slot="title">商品管理</span>
                        </el-menu-item>

                        <el-submenu index="#">
                          <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>规格参数</span>
                          </template>
                          <el-menu-item-group>
                            <el-menu-item index="/specifications">规格与包装</el-menu-item>
                          </el-menu-item-group>
                        </el-submenu>

                        <el-menu-item index="/contract">
                            <i class="el-icon-s-check"></i>
                            <span slot="title">广告合同</span>
                        </el-menu-item>
                        </el-menu>
                    </el-col>
                    
                </el-row>
            </el-aside>

            <el-container>
                <el-header>
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                      <font style="vertical-align: middle;font-weight: 550;"> {{username}}</font>
                      <i class="iconfont icon-quit mo"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-header>

                <el-main>
                  <keep-alive>
                    <router-view></router-view>
                  </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb.vue';
  export default {
     components:{
        Breadcrumb
    },
    data() {
      return {
        indentRight:true,
        indentLeft:false,
        username:''
      };
    },
    methods: {
        //退出登录下拉菜单专属的事件
        handleCommand() {
          this.$router.push('/');
          localStorage.clear();
        }
    },
    created(){
      this.username = localStorage.getItem('user');
    }
  }
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #304156;
    color: #333;
    line-height: 200px;
    height: 100vh;
    
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* 高度为0就可以解决导航栏跟着滚动 */
    height:0;
    flex-grow:1;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  i{
    font-size: 26px !important;
    vertical-align: middle;
  }
  
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px !important;
  }
  .el-dropdown{
    float: right;
  }
  .mo{
    margin-left: 10px;
  }
  .el-menu{
    background: #304156;
  }
  .el-menu{
    width: 200px;
    border: none;
    border-right: solid 0px #e6e6e6 !important;
  }
  .el-menu-item,.el-submenu__title{
    background: #304156;
    color: #bfcbd9 !important;
  }
  .el-menu-item:hover,.el-submenu__title:hover{
	  background-color: #263445 !important;
	  color: #fff!important;
	}
  .el-menu-item-group{
    background: #304156;
  }
  .el-menu-item.is-active {
    background: #304156 !important;
    color: #2674c5 !important;
  }
</style>