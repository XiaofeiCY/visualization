<template>
    <div class="graph-08">
        <div class="canvas-block">
            <h2>Canvas2D 如何填充多边形？</h2>
            <div class="canvas-block">
                <h3>填充规则为<b>nonzero</b></h3>
                <canvas width="512" height="512" class="canvas1"></canvas>
            </div>
            <div class="canvas-block">
                <h3>填充规则为<b>evenodd</b></h3>
                <canvas width="512" height="512" class="canvas2"></canvas>
            </div>
        </div>
        <div class="canvas-block">
            <h2>不同的图形系统如何填充多边形？</h2>
            <div class="canvas-block">
                <h3>填充前的WebGL</h3>
                <canvas width="512" height="512" class="canvas3"></canvas>
            </div>
            <div class="canvas-block">
                <h3>填充后的WebGL</h3>
                <canvas width="512" height="512" class="canvas4"></canvas>
            </div>
        </div>
        <div class="canvas-block">
            <h2>带交互动效的canvas多边形</h2>
            <canvas width="512" height="512" class="canvas5"></canvas>
        </div>
    </div>
</template>

<script>

import { Vector2D } from '../../util/vector2d';
import earcut from 'earcut'

export default {
    mounted() {
        this.ev_getCanvas1()
        this.ev_getCanvas2()
        this.ev_getCanvas3()
        this.ev_getCanvas3('.canvas4')
        this.ev_getCanvas3('.canvas5')
    },
    methods: {
        ev_getCanvas1() {
            const canvas = document.querySelector('.canvas1')
            const ctx = canvas.getContext('2d')
            const {width, height} = canvas;
            ctx.translate(0.5 * width, 0.5 * height);
            ctx.scale(1, -1);


            const points = [new Vector2D(0, 100)];
            for(let i = 1; i <= 4; i++) {
                const p = points[0].copy().rotate(i * Math.PI * 0.4);
                points.push(p);
            }


            const polygon = [
                ...points,
            ];

            // 绘制正五边形
            ctx.save(); // 存储状态
            ctx.translate(-128, 0);
            this.fn_draw(ctx, polygon);
            ctx.restore(); // 恢复状态

            const stars = [
                points[0],
                points[2],
                points[4],
                points[1],
                points[3],
            ];

            // 绘制正五角星
            ctx.save();
            ctx.translate(128, 0);
            this.fn_draw(ctx, stars);
            ctx.restore();
        },
        ev_getCanvas2() {
            const canvas = document.querySelector('.canvas2')
            const ctx = canvas.getContext('2d')
            const {width, height} = canvas;
            ctx.translate(0.5 * width, 0.5 * height);
            ctx.scale(1, -1);


            const points = [new Vector2D(0, 100)];
            for(let i = 1; i <= 4; i++) {
                const p = points[0].copy().rotate(i * Math.PI * 0.4);
                points.push(p);
            }


            const polygon = [
                ...points,
            ];

            // 绘制正五边形
            ctx.save(); // 存储状态
            ctx.translate(-128, 0);
            this.fn_draw(ctx, polygon, {rule : 'evenodd'});
            ctx.restore(); // 恢复状态

            const stars = [
                points[0],
                points[2],
                points[4],
                points[1],
                points[3],
            ];

            // 绘制正五角星
            ctx.save();
            ctx.translate(128, 0);
            this.fn_draw(ctx, stars, {rule : 'evenodd'});
            ctx.restore();
        },
        ev_getCanvas3(can = '.canvas3') {
            const canvas = document.querySelector(can);
            const gl = canvas.getContext('webgl');

            const vertex = `
                attribute vec2 position;
                uniform vec4 u_color;
                varying vec4 vColor;
                void main() {
                    gl_PointSize = 1.0;
                    gl_Position = vec4(position, 1.0, 1.0);
                    vColor = u_color;
                }
            `;

            const fragment = `
                precision mediump float;
                varying vec4 vColor;
                void main() {
                    gl_FragColor = vColor;
                }
            `;

            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, vertex);
            gl.compileShader(vertexShader);

            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, fragment);
            gl.compileShader(fragmentShader);


            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);

            const vertices = [
                [-0.7, 0.5],
                [-0.4, 0.3],
                [-0.25, 0.71],
                [-0.1, 0.56],
                [-0.1, 0.13],
                [0.4, 0.21],
                [0, -0.6],
                [-0.3, -0.3],
                [-0.6, -0.3],
                [-0.45, 0.0],
            ];

            const points = vertices.flat();
            const triangles = earcut(points);
            // console.log(triangles);

            const position = new Float32Array(points);
            const cells = new Uint16Array(triangles);

            const pointBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);

            const vPosition = gl.getAttribLocation(program, 'position');
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(vPosition);

            const cellsBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellsBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW);

            const colorLoc = gl.getUniformLocation(program, 'u_color');
            gl.uniform4fv(colorLoc, [1, 0, 0, 1]);

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawElements(can == '.canvas3' ? gl.LINE_STRIP : gl.TRIANGLES, cells.length, gl.UNSIGNED_SHORT, 0);
            if (can == '.canvas5') {
                const {left, top} = canvas.getBoundingClientRect();
                canvas.addEventListener('mousemove', (evt) => {
                    const {x, y} = evt;
                    // 坐标转换
                    const offsetX = 2 * (x - left) / canvas.width - 1.0;
                    const offsetY = 1.0 - 2 * (y - top) / canvas.height;

                    gl.clear(gl.COLOR_BUFFER_BIT);

                    const colorLoc = gl.getUniformLocation(program, 'u_color');
                    if(this.fn_isPointInPath({vertices, cells}, new Vector2D(offsetX, offsetY))) {
                        gl.uniform4fv(colorLoc, [0, 0.5, 0, 1]);
                    } else {
                        gl.uniform4fv(colorLoc, [1, 0, 0, 1]);
                    }

                    gl.drawElements(gl.TRIANGLES, cells.length, gl.UNSIGNED_SHORT, 0);
                });
            }

        },
        fn_inTriangle(p1, p2, p3, point) {
            const a = p2.copy().sub(p1);
            const b = p3.copy().sub(p2);
            const c = p1.copy().sub(p3);

            const u1 = point.copy().sub(p1);
            const u2 = point.copy().sub(p2);
            const u3 = point.copy().sub(p3);

            const s1 = Math.sign(a.cross(u1));
            let p = a.dot(u1) / a.length ** 2;
            if(s1 === 0 && p >= 0 && p <= 1) return true;

            const s2 = Math.sign(b.cross(u2));
            p = b.dot(u1) / b.length ** 2;
            if(s2 === 0 && p >= 0 && p <= 1) return true;

            const s3 = Math.sign(c.cross(u3));
            p = c.dot(u1) / c.length ** 2;
            if(s3 === 0 && p >= 0 && p <= 1) return true;

            return s1 === s2 && s2 === s3;
        },
        fn_isPointInPath({vertices, cells}, point) {
            let ret = false;
            for(let i = 0; i < cells.length; i += 3) {
                const p1 = new Vector2D(...vertices[cells[i]]);
                const p2 = new Vector2D(...vertices[cells[i + 1]]);
                const p3 = new Vector2D(...vertices[cells[i + 2]]);
                if(this.fn_inTriangle(p1, p2, p3, point)) {
                ret = true;
                break;
                }
            }
            return ret;
        },
        fn_draw(context, points, {
            fillStyle = 'black',
            close = false,
            rule = 'nonzero',
        } = {}) {
            context.beginPath();
            context.moveTo(...points[0]);
            for(let i = 1; i < points.length; i++) {
                context.lineTo(...points[i]);
            }
            if(close) context.closePath();
            context.fillStyle = fillStyle;
            context.fill(rule);
        }
    }
}
</script>

<style lang="less" scoped>
    .graph-08 {
        .canvas-block {
            margin-right: 10px;
            float: left;
        }
        .canvas1, .canvas2, .canvas3, .canvas4, .canvas5, .canvas6, .canvas7 {
            width: 256px;
            height: 256px;
            background-color: thistle;
            margin-right: 10px;
        }
    }
</style>