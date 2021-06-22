<template>
    <div class="graph-11">
        <div class="canvas-block">
            <h2>使用 background-image 来绘制网格</h2>
            <canvas width="512" height="512" class="canvas1"></canvas>
        </div>
        <div class="canvas-block">
            <h2>使用 webgl 来生成随机图案</h2>
            <canvas width="512" height="512" class="canvas2"></canvas>
        </div>
        <div class="canvas-block">
            <h2>使用 webgl 来生成随机图案+动效</h2>
            <canvas width="512" height="512" class="canvas3"></canvas>
        </div>
        <div class="canvas-block">
            <h2>使用 webgl 来生成迷宫</h2>
            <canvas width="512" height="512" class="canvas4"></canvas>
        </div>
        <div class="canvas-block">
            <h2>使用 webgl 来绘制网格</h2>
            <canvas width="512" height="512" class="canvas5"></canvas>
        </div>
        <div class="canvas-block">
            <h2>使用 webgl 来绘制分形图案</h2>
            <canvas width="512" height="512" class="canvas6"></canvas>
        </div>
    </div>
</template>

<script>
import GlRenderer from 'gl-renderer'
export default {
    mounted() {
        this.ev_getCanvas2()
        this.ev_getCanvas3()
        this.ev_getCanvas4()
        this.ev_getCanvas5()
        this.ev_getCanvas6()
    },
    methods: {
        ev_getCanvas2() {
            const vertex = `
                attribute vec2 a_vertexPosition;
                attribute vec2 uv;
                varying vec2 vUv;
                void main() {
                    gl_PointSize = 1.0;
                    vUv = uv;
                    gl_Position = vec4(a_vertexPosition, 1, 1);
                }
            `;

            const fragment = `
                #ifdef GL_ES
                precision highp float;
                #endif
                varying vec2 vUv;

                float random (vec2 st) {
                    return fract(sin(dot(st.xy,
                                        vec2(12.9898,78.233)))*
                        43758.5453123);
                }
                void main() {
                    vec2 st = vUv * 10.0;
                    gl_FragColor.rgb = vec3(random(floor(st)));
                    gl_FragColor.a = 1.0;
                }
            `;

            const canvas = document.querySelector('.canvas2');
            const renderer = new GlRenderer(canvas);

            // load fragment shader and createProgram
            const program = renderer.compileSync(fragment, vertex);
            renderer.useProgram(program);

            renderer.setMeshData([{
                positions: [
                    [-1, -1],
                    [-1, 1],
                    [1, 1],
                    [1, -1],
                ],
                attributes: {
                    uv: [
                            [0, 0],
                            [0, 1],
                            [1, 1],
                            [1, 0],
                        ],
                    },
                cells: [[0, 1, 2], [2, 0, 3]],
            }]);

            renderer.render();
        },
        ev_getCanvas3() {
            const vertex = `
                attribute vec2 a_vertexPosition;
                attribute vec2 uv;
                varying vec2 vUv;
                void main() {
                    gl_PointSize = 1.0;
                    vUv = uv;
                    gl_Position = vec4(a_vertexPosition, 1, 1);
                }
            `;

            const fragment = `
                #ifdef GL_ES
                precision highp float;
                #endif
                varying vec2 vUv;
                uniform float uTime;

                float random (vec2 st) {
                    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
                }
                void main() {
                    vec2 st = vUv * vec2(100.0, 50.0);
                    st.x -= (1.0 + 10.0 * random(vec2(floor(st.y)))) * uTime;
                    vec2 ipos = floor(st);  // integer
                    vec2 fpos = fract(st);  // fraction
                    vec3 color = vec3(step(random(ipos), 0.7));
                    color *= step(0.2,fpos.y);
                    gl_FragColor.rgb = color;
                    gl_FragColor.a = 1.0;
                }
            `;

            const canvas = document.querySelector('.canvas3');
            const renderer = new GlRenderer(canvas);

            // load fragment shader and createProgram
            const program = renderer.compileSync(fragment, vertex);
            renderer.useProgram(program);
            renderer.uniforms.uTime = 0.0;

            renderer.setMeshData([{
                positions: [
                    [-1, -1],
                    [-1, 1],
                    [1, 1],
                    [1, -1],
                ],
                attributes: {
                    uv: [
                        [0, 0],
                        [0, 1],
                        [1, 1],
                        [1, 0],
                    ],
                },
                cells: [[0, 1, 2], [2, 0, 3]],
            }]);

            renderer.render();

            requestAnimationFrame(function update(t) {
                renderer.uniforms.uTime = 4 * t / 1000;
                requestAnimationFrame(update);
            });
        },
        ev_getCanvas4() {
            const vertex = `
                attribute vec2 a_vertexPosition;
                attribute vec2 uv;
                varying vec2 vUv;
                void main() {
                    gl_PointSize = 1.0;
                    vUv = uv;
                    gl_Position = vec4(a_vertexPosition, 1, 1);
                }
            `;

            const fragment = `
                #ifdef GL_ES
                precision mediump float;
                #endif
                #define PI 3.14159265358979323846
                varying vec2 vUv;
                uniform vec2 u_resolution;
                uniform int rows;
                float random (in vec2 _st) {
                    return fract(sin(dot(_st.xy,
                                        vec2(12.9898,78.233)))*
                        43758.5453123);
                }
                vec2 truchetPattern(in vec2 _st, in float _index){
                    _index = fract(((_index-0.5)*2.0));
                    if (_index > 0.75) {
                        _st = vec2(1.0) - _st;
                    } else if (_index > 0.5) {
                        _st = vec2(1.0-_st.x,_st.y);
                    } else if (_index > 0.25) {
                        _st = 1.0-vec2(1.0-_st.x,_st.y);
                    }
                    return _st;
                }
                void main() {
                    vec2 st = vUv * float(rows);
                    vec2 ipos = floor(st);  // integer
                    vec2 fpos = fract(st);  // fraction
                    vec2 tile = truchetPattern(fpos, random( ipos ));
                    float color = 0.0;
                    color = smoothstep(tile.x-0.3,tile.x,tile.y)-
                            smoothstep(tile.x,tile.x+0.3,tile.y);
                    gl_FragColor = vec4(vec3(color),1.0);
                }
            `;

            const canvas = document.querySelector('.canvas4');
            const renderer = new GlRenderer(canvas);

            // load fragment shader and createProgram
            const program = renderer.compileSync(fragment, vertex);
            renderer.useProgram(program);
            renderer.uniforms.rows = 20;

            renderer.setMeshData([{
                positions: [
                    [-1, -1],
                    [-1, 1],
                    [1, 1],
                    [1, -1],
                ],
                attributes: {
                    uv: [
                        [0, 0],
                        [0, 1],
                        [1, 1],
                        [1, 0],
                    ],
                },
                cells: [[0, 1, 2], [2, 0, 3]],
            }]);

            renderer.render();
        },
        ev_getCanvas5() {
            const vertex = `
                attribute vec2 a_vertexPosition;
                attribute vec2 uv;
                varying vec2 vUv;
                void main() {
                    gl_PointSize = 1.0;
                    vUv = uv;
                    gl_Position = vec4(a_vertexPosition, 1, 1);
                }
            `;

            const fragment = `
                #ifdef GL_ES
                precision mediump float;
                #endif
                varying vec2 vUv;
                uniform float rows;
                void main() {
                    vec2 st = fract(vUv * rows);
                    float d1 = step(st.x, 0.9);
                    float d2 = step(0.1, st.y);
                    gl_FragColor.rgb = mix(vec3(0.8), vec3(1.0), d1 * d2);
                    gl_FragColor.a = 1.0;
                }
            `;

            const canvas = document.querySelector('.canvas5');
            const renderer = new GlRenderer(canvas);

            // load fragment shader and createProgram
            const program = renderer.compileSync(fragment, vertex);
            renderer.useProgram(program);
            renderer.uniforms.rows = 1;

            const rows = [1, 4, 16, 32, 64];
            let idx = 0;
            const timerId = setInterval(() => {
                renderer.uniforms.rows = rows[idx++];
                if(idx > 4) {
                    clearInterval(timerId);
                }
            }, 1000);

            renderer.setMeshData([{
                positions: [
                    [-1, -1],
                    [-1, 1],
                    [1, 1],
                    [1, -1],
                ],
                attributes: {
                    uv: [
                        [0, 0],
                        [0, 1],
                        [1, 1],
                        [1, 0],
                    ],
                },
                cells: [[0, 1, 2], [2, 0, 3]],
            }]);

            renderer.render();
        },
        ev_getCanvas6() {
            const vertex = `
                attribute vec2 a_vertexPosition;
                attribute vec2 uv;
                varying vec2 vUv;
                void main() {
                    gl_PointSize = 1.0;
                    vUv = uv;
                    gl_Position = vec4(a_vertexPosition, 1, 1);
                }
            `;

            const fragment = `
                #ifdef GL_ES
                precision highp float;
                #endif
                varying vec2 vUv;
                uniform vec2 center;
                uniform float scale;
                uniform int iterations;

                vec3 palette(float t, vec3 c1, vec3 c2, vec3 c3, vec3 c4) {
                    float x = 1.0 / 3.0;
                    if (t < x) return mix(c1, c2, t/x);
                    else if (t < 2.0 * x) return mix(c2, c3, (t - x)/x);
                    else if (t < 3.0 * x) return mix(c3, c4, (t - 2.0*x)/x);
                    return c4;
                }
                vec2 f(vec2 z, vec2 c) {
                    return mat2(z, -z.y, z.x) * z + c;
                }
                void main() {
                    vec2 uv = vUv;
                    vec2 c = center + 4.0 * (uv - vec2(0.5)) / scale;
                    vec2 z = vec2(0.0);
                    bool escaped = false;
                    int j;
                    for (int i = 0; i < 65536; i++) {
                        if(i > iterations) break;
                        j = i;
                        z = f(z, c);
                        if (length(z) > 2.0) {
                        escaped = true;
                        break;
                        }
                    }
                    // gl_FragColor.rgb = escaped ? vec3(1.0) : vec3(0.0);
                    gl_FragColor.rgb = escaped ? max(1.0, log(scale)) * palette(float(j)/ float(iterations), vec3(0.02, 0.02, 0.03), vec3(0.1, 0.2, 0.3), vec3(0.0, 0.3, 0.2), vec3(0.0, 0.5, 0.8))
                        : vec3(0.0);
                    gl_FragColor.a = 1.0;
                }
            `;

            const canvas = document.querySelector('.canvas6');
            const renderer = new GlRenderer(canvas);

            // load fragment shader and createProgram
            const program = renderer.compileSync(fragment, vertex);
            renderer.useProgram(program);

            // renderer.uniforms.center = [0, 0];
            // renderer.uniforms.scale = 1;
            // renderer.uniforms.iterations = 255;

            renderer.uniforms.center = [0.367, 0.303];
            renderer.uniforms.scale = 1;
            renderer.uniforms.iterations = 256;

            renderer.setMeshData([{
                positions: [
                    [-1, -1],
                    [-1, 1],
                    [1, 1],
                    [1, -1],
                ],
                attributes: {
                    uv: [
                        [0, 0],
                        [0, 1],
                        [1, 1],
                        [1, 0],
                    ],
                },
                cells: [[0, 1, 2], [2, 0, 3]],
            }]);

            renderer.render();

            function update() {
                const factor = Math.max(0.1, Math.log(renderer.uniforms.scale));
                renderer.uniforms.scale = (renderer.uniforms.scale += factor) % 10000;
                renderer.uniforms.iterations = factor * 500;
                requestAnimationFrame(update);
            }
            setTimeout(update, 2000);
        }
    }
}
</script>
<style lang="less" scoped>
    .graph-11 {
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
        .canvas1 {
            background-image: linear-gradient(to right, transparent 90%, #ccc 0),
                linear-gradient(to bottom, transparent 90%, #ccc 0);
            background-size: 8px 8px, 8px 8px;
        }
    }
</style>