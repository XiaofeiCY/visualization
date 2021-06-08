<template>
    <div class="graph-04">
        <canvas width="512" height="512" class="canvas1"></canvas>
        <canvas width="512" height="512" class="canvas2"></canvas>
        <canvas width="512" height="512" class="canvas3"></canvas>
        <canvas width="512" height="512" class="canvas4"></canvas>
    </div>
</template>

<script>
export default {
    mounted() {
        this.ev_getCanvas1()
        this.ev_getCanvas2()
        this.ev_getCanvas3()
        this.ev_getCanvas4()
    },
    methods: {
        // 绘制实心三角形
        ev_getCanvas1() {
            // 步骤一：创建 WebGL 上下文

            // 创建上下文
            const canvas = document.querySelector('.canvas1');
            const gl = canvas.getContext('webgl');


            // 步骤二：创建 WebGL 程序

            // 顶点着色器
            const vertex = `
                attribute vec2 position;

                void main() {
                    gl_PointSize = 1.0;
                    gl_Position = vec4(position, 1.0, 1.0);
                }
            `;

            // 片元着色器  这里的vec4(1.0, 0.0, 0.0, 1.0);色值为红色······vec4(0.0, 0.0, 1.0, 1.0)色值为蓝色，可以试着改改看
            const fragment = `
                precision mediump float;

                void main()
                {
                    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
                }
            `;

            // 为顶点着色器创建成shader对象
            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, vertex);
            gl.compileShader(vertexShader);

            // 为片元着色器创建成shader对象
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, fragment);
            gl.compileShader(fragmentShader);

            // 将刚刚创建的两个shader关联到webGL的对象上去
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            // 通过useProgram启用WebGLProgram对象
            gl.useProgram(program);

            // 步骤三：将数据存入缓冲区

            // 借助Float32Array定义这个三角形的三个顶点
            const points = new Float32Array([
                -1, -1,
                0, 1,
                1, -1,
            ]);

            // 将定义好的数据写入 WebGL 的缓冲区

            // 创建缓冲对象
            const bufferId = gl.createBuffer();

            // 绑定缓冲对象
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

            // 把当前的数据写入缓冲对象
            gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

            // 步骤四：将缓冲区数据读取到 GPU

            // 获取顶点着色器中的position变量的地址
            const vPosition = gl.getAttribLocation(program, 'position');

            // 给变量设置长度和类型
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

            // 激活这个变量
            gl.enableVertexAttribArray(vPosition);

            // 步骤五：执行着色器程序完成绘制
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
        },
        // 绘制空心三角形
        ev_getCanvas2() {
            // 步骤一：创建 WebGL 上下文

            // 创建上下文
            const canvas = document.querySelector('.canvas2');
            const gl = canvas.getContext('webgl');


            // 步骤二：创建 WebGL 程序

            // 顶点着色器
            const vertex = `
                attribute vec2 position;

                void main() {
                    gl_PointSize = 1.0;
                    gl_Position = vec4(position * 0.5, 1.0, 1.0);
                }
            `;

            // 片元着色器  这里的vec4(1.0, 0.0, 0.0, 1.0);色值为红色······vec4(0.0, 0.0, 1.0, 1.0)色值为蓝色，可以试着改改看
            const fragment = `
                precision mediump float;

                void main()
                {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
                }
            `;

            // 为顶点着色器创建成shader对象
            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, vertex);
            gl.compileShader(vertexShader);

            // 为片元着色器创建成shader对象
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, fragment);
            gl.compileShader(fragmentShader);

            // 将刚刚创建的两个shader关联到webGL的对象上去
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            // 通过useProgram启用WebGLProgram对象
            gl.useProgram(program);

            // 步骤三：将数据存入缓冲区

            // 借助Float32Array定义这个三角形的三个顶点
            const points = new Float32Array([
                -1, -1,
                0, 1,
                1, -1,
            ]);

            // 将定义好的数据写入 WebGL 的缓冲区

            // 创建缓冲对象
            const bufferId = gl.createBuffer();

            // 绑定缓冲对象
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

            // 把当前的数据写入缓冲对象
            gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

            // 步骤四：将缓冲区数据读取到 GPU

            // 获取顶点着色器中的position变量的地址
            const vPosition = gl.getAttribLocation(program, 'position');

            // 给变量设置长度和类型
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

            // 激活这个变量
            gl.enableVertexAttribArray(vPosition);

            // 步骤五：执行着色器程序完成绘制
            gl.clear(gl.COLOR_BUFFER_BIT);


            /*
                绘制空心三角形的重点就在于调用的函数，webgl支持的图元类型有七种，分别是：
                gl.POINTS(点), gl.LINES(线段), gl.LINE_STRIP(线条), gl.LINE_LOOP(回路),
                gl.TRIANGLES(三角形), gl.TRIANGLE_STRIP(三角带), gl.TRIANGLE_FAN(三角扇)。
                要绘制空心三角形，gl.LINE_STRIP(线条)、gl.LINES(线段)、 gl.LINE_LOOP(回路)都可以实现。
                但是gl.LINES(线段)需要写入六个顶点([-1, -1, 0, 1, 0, 1, 1, -1, 1, -1,-1, -1]),
                gl.LINE_STRIP(线条)也需要写入四个顶点([-1, -1, 0, 1, 1, -1,-1, -1]),
                这里使用gl.LINE_LOOP——回路函数，只需要是三个顶点([-1, -1, 0, 1, 1, -1])
            */
            gl.drawArrays(gl.LINE_LOOP, 0, points.length / 2);
        },
        // 对片元着色器传递数据
        ev_getCanvas3() {
            // 创建上下文
            const canvas = document.querySelector('.canvas3');
            const gl = canvas.getContext('webgl');

            // 这里是创建着色器：顶点着色器、片元着色器
            const vertex = `
                attribute vec2 position;
                varying vec3 color;
                void main() {
                    gl_PointSize = 1.0;
                    color = vec3(0.5 + position * 0.5, 0.0);
                    gl_Position = vec4(position * 0.5, 1.0, 1.0);
                }
            `;

            const fragment = `
                precision mediump float;
                varying vec3 color;
                void main()
                {
                    gl_FragColor = vec4(color, 1.0);
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

            const points = new Float32Array([
            -1, -1,
            0, 1,
            1, -1,
            ]);

            const bufferId = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

            const vPosition = gl.getAttribLocation(program, 'position');
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(vPosition);

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
        },

        // 绘制多边形
        // a.封装一个生成多边形顶点坐标数组的函数
        createCircleVertex(x, y, r, n) {
            const sin = Math.sin;
            const cos = Math.cos;
            const perAngel = (2 * Math.PI) / n;
            const positionArray = [];
            for (let i = 0; i < n; i++) {
                const angel = i * perAngel;
                const nx = x + r * cos(angel);
                const ny = y + r * sin(angel);
                positionArray.push(nx, ny);
            }
            return new Float32Array(positionArray);
        },

        create2CircleVertex(x, y, r, R, n) {
            const sin = Math.sin;
            const cos = Math.cos;
            const perAngel = Math.PI / n;
            const positionArray = [];
            for (let i = 0; i < 2 * n; i++) {
                const angel = i * perAngel;
                if (i % 2 !== 0) {
                    const Rx = x + R * cos(angel);
                    const Ry = y + R * sin(angel);
                    positionArray.push(Rx, Ry);
                } else {
                    const rx = x + r * cos(angel);
                    const ry = y + r * sin(angel);
                    positionArray.push(rx, ry);
                }
            }
            return new Float32Array(positionArray);
        },

        ev_getCanvas4() {
            // 步骤一：创建 WebGL 上下文

            // 创建上下文
            const canvas = document.querySelector('.canvas4');
            const gl = canvas.getContext('webgl');


            // 步骤二：创建 WebGL 程序

            // 顶点着色器
            const vertex = `
                attribute vec2 position;

                void main() {
                    gl_PointSize = 1.0;
                    gl_Position = vec4(position, 1.0, 1.0);
                }
            `;

            // 片元着色器  这里的vec4(1.0, 0.0, 0.0, 1.0);色值为红色······vec4(0.0, 0.0, 1.0, 1.0)色值为蓝色，可以试着改改看
            const fragment = `
                precision mediump float;

                void main()
                {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
                }
            `;

            // 为顶点着色器创建成shader对象
            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, vertex);
            gl.compileShader(vertexShader);

            // 为片元着色器创建成shader对象
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, fragment);
            gl.compileShader(fragmentShader);

            // 将刚刚创建的两个shader关联到webGL的对象上去
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            // 通过useProgram启用WebGLProgram对象
            gl.useProgram(program);

            // 步骤三：将数据存入缓冲区

            // 借助Float32Array定义这个三角形的三个顶点
            const points = this.createCircleVertex(0, 0, 0.5, 4)
            console.log('poi', points);

            // 将定义好的数据写入 WebGL 的缓冲区

            // 创建缓冲对象
            const bufferId = gl.createBuffer();

            // 绑定缓冲对象
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

            // 把当前的数据写入缓冲对象
            gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

            // 步骤四：将缓冲区数据读取到 GPU

            // 获取顶点着色器中的position变量的地址
            const vPosition = gl.getAttribLocation(program, 'position');

            // 给变量设置长度和类型
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

            // 激活这个变量
            gl.enableVertexAttribArray(vPosition);

            // 步骤五：执行着色器程序完成绘制
            gl.clear(gl.COLOR_BUFFER_BIT);


            /*
                绘制空心三角形的重点就在于调用的函数，webgl支持的图元类型有七种，分别是：
                gl.POINTS(点), gl.LINES(线段), gl.LINE_STRIP(线条), gl.LINE_LOOP(回路),
                gl.TRIANGLES(三角形), gl.TRIANGLE_STRIP(三角带), gl.TRIANGLE_FAN(三角扇)。
                要绘制空心三角形，gl.LINE_STRIP(线条)、gl.LINES(线段)、 gl.LINE_LOOP(回路)都可以实现。
                但是gl.LINES(线段)需要写入六个顶点([-1, -1, 0, 1, 0, 1, 1, -1, 1, -1,-1, -1]),
                gl.LINE_STRIP(线条)也需要写入四个顶点([-1, -1, 0, 1, 1, -1,-1, -1]),
                这里使用gl.LINE_LOOP——回路函数，只需要是三个顶点([-1, -1, 0, 1, 1, -1])
            */
            gl.drawArrays(gl.LINE_LOOP, 0, points.length / 2);
        }
    }
}
</script>

<style lang="less" scoped>
    .graph-04 {
        .canvas1, .canvas2, .canvas3, .canvas4 {
            width: 256px;
            height: 256px;
            background-color: thistle;
            margin-right: 10px;
        }
    }
</style>