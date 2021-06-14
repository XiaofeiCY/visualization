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
                    <el-menu-item index="1-2">03 | 声明式图形系统：如何用SVG图形元素绘制可视化图表？</el-menu-item>
                    <el-menu-item index="1-3">04 | GPU与渲染管线：如何用WebGL绘制最简单的几何图形？</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">数学篇</span>
                    </template>
                    <el-menu-item index="2-1">05 | 如何用向量和坐标系描述点和线段？</el-menu-item>
                </el-submenu>
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
import graphThree from './graph/graph-03'
import graphFour from './graph/graph-04'
import graphFive from './graph/graph-05'

export default {
    components: {
        graphTwo,
        graphThree,
        graphFour,
        graphFive
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
            const params = {
                '1-1': 'graphTwo',
                '1-2': 'graphThree',
                '1-3': 'graphFour',
                '2-1': 'graphFive',
            }
            this.currentIndex = params[key]
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