<template>
    <div class="graph-05">
        <div class="canvas-block">
            <h1>如何用 Canvas+Roughjs 实现坐标系转换？</h1>
            <canvas width="512" height="512" class="canvas1"></canvas>
        </div>
        <div class="canvas-block">
            <h1>移动坐标系后的一个新写法</h1>
            <canvas width="512" height="512" class="canvas2"></canvas>
        </div>
        <div class="canvas-block">
            <h1>生成随机树🌲</h1>
            <canvas width="512" height="512" class="canvas3"></canvas>
        </div>
    </div>
</template>

<script>
// 这是一个知识点，引入rough如下写法，直接引入'roughjs'会运行报错
import rough from 'roughjs/bundled/rough.esm.js';
import { Vector2D } from '../../util/vector2d';

export default {
    mounted() {
        this.ev_getCanvas1()
        this.ev_getCanvas2()
        this.ev_getCanvas3()
    },
    methods: {
        ev_getCanvas1() {
            const rc = rough.canvas(document.querySelector('.canvas1'));
            const hillOpts = {roughness: 2.8, strokeWidth: 2, fill: 'blue'};
            rc.path('M76 256L176 156L276 256', hillOpts);
            rc.path('M236 256L336 156L436 256', hillOpts);
            rc.circle(256, 106, 105, {
                stroke: 'red',
                strokeWidth: 4,
                fill: 'rgba(255, 255, 0, 0.4)',
                fillStyle: 'solid',
            });
        },
        ev_getCanvas2() {

            const rc = rough.canvas(document.querySelector('.canvas2'));
            const ctx = rc.ctx;
             // 移动坐标原点
            ctx.translate(256, 256);
            ctx.scale(1, -1);

            const hillOpts = {roughness: 2.8, strokeWidth: 2, fill: 'blue'};

            rc.path('M-180 0L-80 100L20 0', hillOpts);
            rc.path('M-20 0L80 100L180 0', hillOpts);

            rc.circle(0, 150, 105, {
                stroke: 'red',
                strokeWidth: 4,
                fill: 'rgba(255,255, 0, 0.4)',
                fillStyle: 'solid',
            });
        },
        ev_getCanvas3() {

            // 获取画布上下文
            const canvas = document.querySelector('.canvas3');
            const ctx = canvas.getContext('2d');

            // 坐标变换
            ctx.translate(0, canvas.height);
            ctx.scale(1, -1);
            ctx.lineCap = 'round';

            const v0 = new Vector2D(250, 150);

            // 绘制树枝的方法
            this.fn_drawBranch(ctx, v0, 50, 10, 1, 3);
        },
        fn_drawBranch(context, v0, length, thickness, dir, bias) {
            const v = new Vector2D().rotate(dir).scale(length);
            const v1 = v0.copy().add(v);

            context.lineWidth = thickness;
            context.beginPath();
            context.moveTo(...v0);
            context.lineTo(...v1);
            context.stroke();

            // 生成随机树枝
            if(thickness > 2) {
                const left = Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
                this.fn_drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
                const right = Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
                this.fn_drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
            }

            // 生成小红花
            if(thickness < 5 && Math.random() < 0.3) {
                context.save();
                context.strokeStyle = '#c72c35';
                const th = Math.random() * 6 + 3;
                context.lineWidth = th;
                context.beginPath();
                context.moveTo(...v1);
                context.lineTo(v1.x, v1.y - 2);
                context.stroke();
                context.restore();
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .graph-05 {
        .canvas-block {
            float: left;
            margin-right: 10px;
        }
        .canvas1, .canvas2, .canvas3, .canvas4 {
            width: 256px;
            height: 256px;
            background-color: thistle;
            margin-right: 10px;
        }
    }
</style>