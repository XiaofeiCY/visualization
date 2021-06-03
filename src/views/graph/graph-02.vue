<template>
    <div class="graph-02">
        <canvas width="512" height="512" class="canvas1"></canvas>
        <canvas width="512" height="512" class="canvas2"></canvas>
    </div>
</template>

<script>
export default {
    mounted() {
        this.ev_getCanvas1()
        this.ev_getCanvas2()
    },
    methods: {
        ev_getCanvas1() {
            const canvas = document.querySelector('.canvas1');
            const context = canvas.getContext('2d');
            const rectSize = [100, 100];
            context.fillStyle = 'red';
            context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1]);
            context.beginPath();
            context.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize);
            context.fill();
        },
        ev_getCanvas2() {
            const canvas = document.querySelector('.canvas2');
            const context = canvas.getContext('2d');
            const rectSize = [100, 100];
            context.fillStyle = 'red';
            context.save();
            context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1]);
            context.beginPath();
            context.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize);
            context.fill();
            context.restore();
        }
    }

}
</script>

<style lang="less" scoped>
    .graph-02 {
        .canvas1, .canvas2 {
            width: 256px;
            height: 256px;
            background-color: thistle;
            margin-right: 10px;
        }
    }
</style>