<template>
    <div class="graph-02">
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
        ev_getCanvas1() { // 正方形
            const canvas = document.querySelector('.canvas1');
            const context = canvas.getContext('2d');
            const rectSize = [100, 100];
            context.fillStyle = 'red';
            context.save(); // 存储状态
            context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1]);
            context.beginPath();
            context.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize);
            context.fill();
            context.restore(); // 恢复状态
            context.closePath();
        },
        ev_getCanvas2() { // 正方形
            const canvas = document.querySelector('.canvas2');
            const context = canvas.getContext('2d');
            context.beginPath()
            context.moveTo(100, 100);
            context.lineTo(100, 300);
            context.lineTo(300, 300);
            context.lineTo(100, 100);
            context.strokeStyle='yellow'
            context.stroke()
            context.closePath()

            context.beginPath()
            context.moveTo(120, 100)
            context.lineTo(320, 100);
            context.lineTo(320, 300);
            context.lineTo(120, 100);
            context.fillStyle='white'
            context.fill()
            context.closePath()
        },
        ev_getCanvas3() { // 椭圆
            const canvas = document.querySelector('.canvas3')
            const context = canvas.getContext('2d')
            context.beginPath()
            context.ellipse(250, 250, 100, 50, 0, 0, Math.PI * 2, true)
            context.fill()
        },
        ev_getCanvas4() { // 五角星，这是百度来的
            const canvas = document.querySelector('.canvas4')
            const context = canvas.getContext("2d");
            context.save(); // 存储状态
            context.translate(50, 50); // 平移
            context.beginPath();
            //设置是个顶点的坐标，根据顶点制定路径
            for (let i = 0; i < 5; i++) {
                context.lineTo(Math.cos((18+i*72)/180*Math.PI)*200+200,
                                -Math.sin((18+i*72)/180*Math.PI)*200+200);
                context.lineTo(Math.cos((54+i*72)/180*Math.PI)*80+200,
                                -Math.sin((54+i*72)/180*Math.PI)*80+200);
            }
            context.closePath();
            //设置边框样式以及填充颜色
            context.lineWidth="3";
            context.fillStyle = "#F6F152";
            context.strokeStyle = "#F5270B";
            context.fill();
            context.stroke();
            context.restore(); // 恢复状态
        },
    }

}
</script>

<style lang="less" scoped>
    .graph-02 {
        .canvas1, .canvas2, .canvas3, .canvas4 {
            width: 256px;
            height: 256px;
            background-color: thistle;
            margin-right: 10px;
        }
    }
</style>