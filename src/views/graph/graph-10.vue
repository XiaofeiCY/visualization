<template>
    <div class="graph-10">
        <div class="canvas-block">
            <h2>RGB</h2>
            <canvas width="512" height="512" class="canvas1"></canvas>
        </div>
        <div class="canvas-block">
            <h2>HSL</h2>
            <div class="canvas-block">
                <h3>hsl-problem</h3>
                <canvas width="512" height="512" class="canvas2"></canvas>
            </div>
            <div class="canvas-block">
                <h3>hsl</h3>
                <canvas width="512" height="512" class="canvas3"></canvas>
            </div>
        </div>
        <div class="canvas-block">
            <h2>LAB</h2>
            <canvas width="512" height="512" class="canvas4"></canvas>
        </div>
        <div class="canvas-block">
            <h2>Cubehelix</h2>
            <canvas width="512" height="512" class="canvas5"></canvas>
        </div>
        <div class="canvas-block">
            <h2>WebGL实现HSV色盘</h2>
            <canvas width="512" height="512" class="canvas6"></canvas>
        </div>
    </div>
</template>

<script>
import Vec3 from 'vec3'
import * as d3 from 'd3-color';
import {cubehelix} from 'cubehelix'
import earcut from 'earcut'


export default {
    mounted() {
        this.ev_getCanvas1()
        this.ev_getCanvas2()
        this.ev_getCanvas3()
        this.ev_getCanvas4()
        this.ev_getCanvas5()
        this.ev_getCanvas6()
    },
    methods: {
        fn_randomRGB() {
            return new Vec3(
                0.5 * Math.random(),
                0.5 * Math.random(),
                0.5 * Math.random(),
            );
        },
        fn_randomHSL() {
            return new Vec3(
                0.5 * Math.random(),
                0.7,
                0.45,
            );
        },
        fn_update(ctx, color, T, t) {
            const p = 0.5 + 0.5 * Math.sin(t / T);
            ctx.clearRect(-220, -256, 512, 512);
            const {r, g, b} = color(p);
            ctx.fillStyle = `rgb(${255 * r},${255 * g},${255 * b})`;
            ctx.beginPath();
            ctx.rect(-220, -20, 480 * p, 40);
            ctx.fill();
            window.ctx = ctx;
            requestAnimationFrame(this.fn_update.bind(this, ctx, color, T));
        },
        fn_createShader (gl, type, source) {
            // 着色器对象
            const shader = gl.createShader(type)
            // 提供数据源
            gl.shaderSource(shader, source)
            // 编译 -> 生成着色器
            gl.compileShader(shader)
            const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
            if (success) {
                return shader
            }

            console.log(gl.getShaderInfoLog(shader))
            gl.deleteShader(shader)
        },

        fn_generateProgram(gl, vertex, fragment) {
            const vertexShader = this.fn_createShader(gl, gl.VERTEX_SHADER, vertex)
            const fragmentShader = this.fn_createShader(gl, gl.FRAGMENT_SHADER, fragment)

            // console.log(vertexShader, fragmentShader)

            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);

            gl.linkProgram(program);

            const success = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (success) {
                console.log('link成功')
                return program;
            }

            console.log(gl.getProgramInfoLog(program));
            return program
        },
        ev_getCanvas1() {
            const canvas = document.querySelector('.canvas1');
            const ctx = canvas.getContext('2d');
            ctx.translate(256, 256);
            ctx.scale(1, -1);

            for(let i = 0; i < 3; i++) {
                const colorVector = this.fn_randomRGB();
                for(let j = 0; j < 5; j++) {
                    const c = colorVector.clone().scale(0.5 + 0.25 * j);
                    ctx.fillStyle = `rgb(${Math.floor(c.x * 256)}, ${Math.floor(c.y * 256)}, ${Math.floor(c.z * 256)})`;
                    ctx.beginPath();
                    ctx.arc((j - 2) * 60, (i - 1) * 60, 20, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

        },
        ev_getCanvas2() {
            const canvas = document.querySelector('.canvas2');
            const ctx = canvas.getContext('2d');

            ctx.translate(256, 256);
            ctx.scale(1, -1);

            for(let i = 0; i < 20; i++) {
                ctx.fillStyle = `hsl(${Math.floor(i * 15)}, 50%, 50%)`;
                ctx.beginPath();
                ctx.arc((i - 10) * 20, 60, 10, 0, Math.PI * 2);
                ctx.fill();
            }

            for(let i = 0; i < 20; i++) {
                ctx.fillStyle = `hsl(${Math.floor((i % 2 ? 60 : 210) + 3 * i)}, 50%, 50%)`;
                ctx.beginPath();
                ctx.arc((i - 10) * 20, -60, 10, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        ev_getCanvas3() {
            const canvas = document.querySelector('.canvas3');
            const ctx = canvas.getContext('2d');
            ctx.translate(256, 256);
            ctx.scale(1, -1);

            const {x, y, z} = this.fn_randomHSL();
            for(let i = 0; i < 3; i++) {
                const p = (i * 0.25 + x) % 1;
                for(let j = 0; j < 5; j++) {
                    const d = j - 2;
                    ctx.fillStyle = `hsl(${Math.floor(p * 360)}, ${Math.floor((0.15 * d + y) * 100)}%, ${Math.floor((0.12 * d + z) * 100)}%)`;
                    ctx.beginPath();
                    ctx.arc((j - 2) * 60, (i - 1) * 60, 20, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        },
        ev_getCanvas4() {
            const canvas = document.querySelector('.canvas4');
            const ctx = canvas.getContext('2d');

            ctx.translate(256, 256);
            ctx.scale(1, -1);

            for(let i = 0; i < 20; i++) {
                const c = d3.lab(30, i * 15 - 150, i * 15 - 150).rgb();
                ctx.fillStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
                ctx.beginPath();
                ctx.arc((i - 10) * 20, 60, 10, 0, Math.PI * 2);
                ctx.fill();
            }

            for(let i = 0; i < 20; i++) {
                const c = d3.lab(i * 5, 80, 80).rgb();
                ctx.fillStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
                ctx.beginPath();
                ctx.arc((i - 10) * 20, -60, 10, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        ev_getCanvas5() {
            const canvas = document.querySelector('.canvas5');
            const ctx = canvas.getContext('2d');

            ctx.translate(256, 256);
            ctx.scale(1, -1);

            const color = cubehelix();
            const T = 2000;
            this.fn_update(ctx, color, T, 0)
        },
        ev_getCanvas6() {
            const canvas = document.querySelector(".canvas6");

            const gl = canvas.getContext('webgl');

            const generateCircle = (r, seg, x, y) => {
                const res = []
                for (let i = 0; i < seg; i++) {
                    const angle = i * 2 * Math.PI / seg
                    res.push([
                    r * Math.cos(angle) + x,
                    r * Math.sin(angle) + y,
                    ])
                }
                return res
            }

            const vertex = `
                #define PI 3.1415926535897932384626433832795
                attribute vec2 position;
                varying vec4 vColor;

                vec3 rgb2hsv(vec3 c){
                    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
                    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
                    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
                    float d = q.x - min(q.w, q.y);
                    float e = 1.0e-10;
                    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
                }

                // 都是(0, 1)
                vec3 hsv2rgb(vec3 c){
                    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
                    rgb = rgb * rgb * (3.0 - 2.0 * rgb);
                    return c.z * mix(vec3(1.0), rgb, c.y);
                }

                void main(){

                    // 两个圆的圆心分别在 (-0.5, 0), (0.5, 0), 将其转到(0, 0)方便计算
                    float x = position.x > 0.0 ? position.x - 0.5 : position.x + 0.5;
                    float y = position.y;

                    float hue = atan(position.y, x);
                    if (0.0 > hue) {
                        hue = PI * 2.0 + hue;
                    }

                    hue /= 2.0 * PI;

                    float len = sqrt(x * x + y * y);
                    // 判断是哪一个圆, 使用不同的颜色
                    vec3 hsv = position.x > 0.0 ? vec3(hue, len, 1.0) : vec3(hue, 1.0, len);
                    vec3 rgb = hsv2rgb(hsv);
                    vColor = vec4(rgb, 1.0);
                    gl_Position = vec4(position, 1.0, 1.0);
                }
            `

            const fragment = `
                precision mediump float;
                varying vec4 vColor;
                void main(){
                    gl_FragColor = vColor;
                }
            `

            const program = this.fn_generateProgram(gl, vertex, fragment)
            gl.useProgram(program)

            // const program2 = generateProgram(gl, vertex2, fragment)

            const circle1 = generateCircle(0.4, 100, -0.5, 0)
            const circle2 = generateCircle(0.4, 100, 0.5, 0)

            function draw(program, circle) {
            const points = circle.flat()
            const cell = earcut(points)

            const position = new Float32Array(points)
            const cells = new Uint16Array(cell)

            const pointBuffer = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer)
            gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

            const vPosition = gl.getAttribLocation(program, 'position')
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
            gl.enableVertexAttribArray(vPosition)

            const cellsBuffer = gl.createBuffer()
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellsBuffer)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW)

            gl.drawElements(gl.TRIANGLES, cell.length, gl.UNSIGNED_SHORT, 0)
            }

            draw(program, circle1)
            draw(program, circle2)
        }
    }
}
</script>

<style lang="less" scoped>
    .graph-10 {
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