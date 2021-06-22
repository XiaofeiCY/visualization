<template>
  <div class="main-content">
    <el-container>
      <el-header>{{currentName}}</el-header>
      <el-container>
        <el-aside>
            <el-menu
                default-active='1-1'
                @open="ev_handleOpen"
                @close="ev_handleClose"
                @select='ev_select'>
                <el-submenu v-for="item in menuList" :key='item.blockIndex' :index="item.blockIndex">
                    <template slot="title">
                        <i class="el-icon-menu">{{item.title}}</i>
                        <span></span>
                    </template>
                    <el-menu-item v-for="it in item.list" :key='it.itemIndex' :index="it.itemIndex">{{it.name}}</el-menu-item>
                </el-submenu>
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
import graphSeven from './graph/graph-07'
import graphEight from './graph/graph-08'
import graphNine from './graph/graph-09'
import graphTen from './graph/graph-10'
import graphEleven from './graph/graph-11'

export default {
    components: {
        graphTwo,
        graphThree,
        graphFour,
        graphFive,
        graphSeven,
        graphEight,
        graphNine,
        graphTen,
        graphEleven
    },
    data() {
        return {
            currentIndex: 'graphTwo',
            currentName: '02 | 指令式绘图系统：如何用Canvas绘制层次关系图？',
            menuList: [
                {
                    blockIndex: '1',
                    title: '图形基础篇 (4讲)',
                    list: [
                        {
                            itemIndex: '1-1',
                            key: 'graphTwo',
                            name: '02 | 指令式绘图系统：如何用Canvas绘制层次关系图？'
                        },
                        {
                            itemIndex: '1-2',
                            key: 'graphThree',
                            name: '03 | 声明式图形系统：如何用SVG图形元素绘制可视化图表？'
                        },
                        {
                            itemIndex: '1-3',
                            key: 'graphFour',
                            name: '04 | GPU与渲染管线：如何用WebGL绘制最简单的几何图形？'
                        }
                    ]
                },
                {
                    blockIndex: '2',
                    title: '数学篇',
                    list: [
                        {
                            itemIndex: '2-1',
                            key: 'graphFive',
                            name: '05 | 如何用向量和坐标系描述点和线段？'
                        },
                        {
                            itemIndex: '2-2',
                            key: 'graphSeven',
                            name: '07 | 如何用向量和参数方程描述曲线？'
                        },
                        {
                            itemIndex: '2-3',
                            key: 'graphEight',
                            name: '08 | 如何利用三角剖分和向量操作描述并处理多边形？'
                        },
                        {
                            itemIndex: '2-4',
                            key: 'graphNine',
                            name: '09 | 如何用仿射变换对几何图形进行坐标变换？'
                        }
                    ]
                },
                {
                    blockIndex: '3',
                    title: '视觉基础篇',
                    list: [
                        {
                            itemIndex: '3-1',
                            key: 'graphTen',
                            name: '10 | 图形系统如何表示颜色？'
                        },
                        {
                            itemIndex: '3-2',
                            key: 'graphEleven',
                            name: '11｜图案生成：如何生成重复图案、分形图案以及随机效果？'
                        }
                    ]
                }
            ]
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
            this.menuList.forEach(ele => {
                if (keyPath.length > 1) {
                    ele.list.forEach(it => {
                        if (it.itemIndex == key) {
                            this.currentIndex = it.key
                            this.currentName = it.name
                        }
                    });
                }
            });
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
        width: 100%;
    }
    /deep/.el-submenu__title, .el-menu-item {
        overflow: hidden;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>