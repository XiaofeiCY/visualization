<template>
    <div class="graph-07">
        <div class="canvas-block">
            <h2>如何用向量描述曲线？</h2>
            <canvas width="512" height="512" class="canvas1"></canvas>
        </div>
        <div class="canvas-block">
            <h2>如何用参数方程描述曲线？</h2>
            <div class="canvas-block">
                <h3>1.画圆</h3>
                <canvas width="512" height="512" class="canvas2"></canvas>
            </div>
            <div class="canvas-block">
                <h3>2.画椭圆</h3>
                <canvas width="512" height="512" class="canvas3"></canvas>
            </div>
            <div class="canvas-block">
                <h3>3.画抛物线</h3>
                <canvas width="512" height="512" class="canvas4"></canvas>
            </div>
            <div class="canvas-block">
                <h3>4.画其他曲线</h3>
                <canvas width="512" height="512" class="canvas5"></canvas>
            </div>
            <div class="canvas-block">
                <h3>5.画二阶贝塞尔曲线</h3>
                <canvas width="512" height="512" class="canvas6"></canvas>
            </div>
            <div class="canvas-block">
                <h3>6.画三阶贝塞尔曲线</h3>
                <canvas width="512" height="512" class="canvas7"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import { Vector2D } from '../../util/vector2d';
import { parametric } from '../../util/parametric'

const TAU_SEGMENTS = 60;
const TAU = Math.PI * 2;
const LINE_SEGMENTS = 60;

export default {
    mounted() {
        this.ev_getCanvas1()
        this.ev_getCanvas2()
        this.ev_getCanvas3()
        this.ev_getCanvas4()
        this.ev_getCanvas5()
        this.ev_getCanvas6()
        this.ev_getCanvas7()
    },
    methods: {
        ev_getCanvas1() {
            const canvas = document.querySelector('.canvas1');
            const ctx = canvas.getContext('2d');
            const {width, height} = canvas;
            ctx.translate(0.5 * width, 0.5 * height);
            ctx.scale(1, -1);
            this.fn_draw(ctx, this.fn_regularShape(3, 128, 128, 100));

            this.fn_draw(ctx, this.fn_regularShape(6, -64, 128, 50));
            this.fn_draw(ctx, this.fn_regularShape(11, -64, -64, 30));
            this.fn_draw(ctx, this.fn_regularShape(60, 128, -64, 6));
        },

        ev_getCanvas2() {
            const canvas = document.querySelector('.canvas2');
            const ctx = canvas.getContext('2d');
            const {width, height} = canvas;
            ctx.translate(0.5 * width, 0.5 * height);
            ctx.scale(1, -1);

            this.fn_draw(ctx, this.fn_arc(0, 0, 100)); // 圆
        },

        ev_getCanvas3() {
            const canvas = document.querySelector('.canvas3');
            const ctx = canvas.getContext('2d');
            const {width, height} = canvas;
            ctx.translate(0.5 * width, 0.5 * height);
            ctx.scale(1, -1);

            this.fn_draw(ctx, this.fn_ellipse(0, 0, 100, 50)); // 椭圆
        },

        ev_getCanvas4() {
            const canvas = document.querySelector('.canvas4');
            const ctx = canvas.getContext('2d');
            const {width, height} = canvas;
            ctx.translate(0.5 * width, 0.5 * height);
            ctx.scale(1, -1);

            this.fn_draw(ctx, this.fn_parabola(-100, 0, 15.5, -10, 10)); // 椭圆
        },

        ev_getCanvas5() {
            const canvas = document.querySelector('.canvas5');
            const ctx = canvas.getContext('2d');
            const {width, height} = canvas;
            const w = 0.5 * width,
            h = 0.5 * height;
            ctx.translate(w, h);
            ctx.scale(1, -1);

            const para = parametric(
                t => 25 * t,
                t => 25 * t ** 2,
            );

            para(-5.5, 5.5).draw(ctx);

            const helical = parametric(
                (t, l) => l * t * Math.cos(t),
                (t, l) => l * t * Math.sin(t),
            );

            helical(0, 50, 500, 5).draw(ctx, {strokeStyle: 'blue'});

            const star = parametric(
                (t, l) => l * Math.cos(t) ** 3,
                (t, l) => l * Math.sin(t) ** 3,
            );

            star(0, Math.PI * 2, 50, 150).draw(ctx, {strokeStyle: 'red'});

            this.fn_drawAxis(ctx, w, h)
        },

        ev_getCanvas6() {
            const canvas = document.querySelector('.canvas6');
            const ctx = canvas.getContext('2d');
            const {width, height} = canvas;
            const w = 0.5 * width,
            h = 0.5 * height;
            ctx.translate(w, h);
            ctx.scale(1, -1);

            const quadricBezier = parametric(
                (t, [{x: x0}, {x: x1}, {x: x2}]) => (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2,
                (t, [{y: y0}, {y: y1}, {y: y2}]) => (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2,
            );

            const p0 = new Vector2D(0, 0);
            const p1 = new Vector2D(100, 0);
            p1.rotate(0.75);
            const p2 = new Vector2D(200, 0);
            const count = 30;
            for(let i = 0; i < count; i++) {
                p1.rotate(2 / count * Math.PI);
                p2.rotate(2 / count * Math.PI);
                quadricBezier(0, 1, 100, [
                    p0,
                    p1,
                    p2,
                ]).draw(ctx);
            }
            this.fn_drawAxis(ctx, w, h)
        },

        ev_getCanvas7() {
            const canvas = document.querySelector('.canvas7');
            const ctx = canvas.getContext('2d');
            const {width, height} = canvas;
            const w = 0.5 * width,
            h = 0.5 * height;
            ctx.translate(w, h);
            ctx.scale(1, -1);
            const cubicBezier = parametric(
                (t, [{x: x0}, {x: x1}, {x: x2}, {x: x3}]) => (1 - t) ** 3 * x0 + 3 * t * (1 - t) ** 2 * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x3,
                (t, [{y: y0}, {y: y1}, {y: y2}, {y: y3}]) => (1 - t) ** 3 * y0 + 3 * t * (1 - t) ** 2 * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * y3,
                );

            const p0 = new Vector2D(0, 0);
            const p1 = new Vector2D(100, 0);
            p1.rotate(0.75);
            const p2 = new Vector2D(150, 0);
            p2.rotate(-0.75);
            const p3 = new Vector2D(200, 0);
            const count = 30;
            for(let i = 0; i < count; i++) {
                p1.rotate(2 / count * Math.PI);
                p2.rotate(2 / count * Math.PI);
                p3.rotate(2 / count * Math.PI);
                cubicBezier(0, 1, 100, [
                    p0,
                    p1,
                    p2,
                    p3,
                ]).draw(ctx);
            }
            this.fn_drawAxis(ctx, w, h)
        },


        fn_drawAxis(ctx, w, h) {
            ctx.save();
            ctx.strokeStyle = '#ccc';
            ctx.beginPath();
            ctx.moveTo(-w, 0);
            ctx.lineTo(w, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, -h);
            ctx.lineTo(0, h);
            ctx.stroke();
            ctx.restore();
        },

        // 通过向量画多边形
        fn_regularShape(edges = 3, x, y, step) {
            const ret = [];
            const delta = Math.PI * (1 - (edges - 2) / edges);
            let p = new Vector2D(x, y);
            const dir = new Vector2D(step, 0);
            ret.push(p);
            for(let i = 0; i < edges; i++) {
                p = p.copy().add(dir.rotate(delta));
                ret.push(p);
            }
            return ret;
        },

        // 通过自定义函数画圆
        fn_arc(x0, y0, radius, startAng = 0, endAng = Math.PI * 2) {
            const ang = Math.min(TAU, endAng - startAng);
            const ret = ang === TAU ? [] : [[x0, y0]];
            const segments = Math.round(TAU_SEGMENTS * ang / TAU);
            for(let i = 0; i <= segments; i++) {
                const x = x0 + radius * Math.cos(startAng + ang * i / segments);
                const y = y0 + radius * Math.sin(startAng + ang * i / segments);
                ret.push([x, y]);
            }
            return ret;
        },

        // 通过自定义函数画椭圆
        fn_ellipse(x0, y0, radiusX, radiusY, startAng = 0, endAng = Math.PI * 2) {
            const ang = Math.min(TAU, endAng - startAng);
            const ret = ang === TAU ? [] : [[x0, y0]];
            const segments = Math.round(TAU_SEGMENTS * ang / TAU);
            for(let i = 0; i <= segments; i++) {
                const x = x0 + radiusX * Math.cos(startAng + ang * i / segments);
                const y = y0 + radiusY * Math.sin(startAng + ang * i / segments);
                ret.push([x, y]);
            }
            return ret;
        },

        // 通过自定义函数画抛物线
        fn_parabola(x0, y0, p, min, max) {
            const ret = [];
            for(let i = 0; i <= LINE_SEGMENTS; i++) {
                const s = i / 60;
                const t = min * (1 - s) + max * s;
                const x = x0 + 2 * p * t ** 2;
                const y = y0 + 2 * p * t;
                ret.push([x, y]);
            }
            return ret;
        },
        fn_draw(ctx, points, strokeStyle = 'black', fillStyle = null) {
            ctx.strokeStyle = strokeStyle;
            ctx.beginPath();
            ctx.moveTo(...points[0]);
            for(let i = 1; i < points.length; i++) {
                ctx.lineTo(...points[i]);
            }
            ctx.closePath();
            if(fillStyle) {
                ctx.fillStyle = fillStyle;
                ctx.fill();
            }
            ctx.stroke();
        },
    }
}
</script>

<style lang="less" scoped>
    .graph-07 {
        .canvas-block {
            margin-right: 10px;
            float: left;

        }
        .canvas1, .canvas2, .canvas3, .canvas4 {
            width: 256px;
            height: 256px;
            background-color: thistle;
            margin-right: 10px;
        }
    }
</style>