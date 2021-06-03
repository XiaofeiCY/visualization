<template>
  <div class="main-content">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside>
            <el-menu
                default-active='1-1'
                @open="ev_handleOpen"
                @close="ev_handleClose"
                @select='ev_select'>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>图形基础篇 (4讲)</span>
                    </template>
                    <el-menu-item index="1-1">02 | 指令式绘图系统：如何用Canvas绘制层次关系图？</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    <el-menu-item index="1-4">选项4</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <component :is='currentIndex'></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import graphTwo from './graph/graph-02'

export default {
    components: {
        graphTwo
    },
    data() {
        return {
            currentIndex: 'graphTwo'
        }
    },
    methods: {
        ev_handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        ev_handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        ev_select(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style lang="less" scoped>
.main-content {
    display: flex;
    flex: 1;
    .el-container {
        flex: 1;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-aside {
        width: 200px;
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
    }
    /deep/.el-menu {
        background-color: unset;
    }
    /deep/.el-submenu__title, .el-menu-item {
        text-align: left;
    }
}
</style>