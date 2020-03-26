<style lang="less">
.section-pro {
    display: flex;
    flex-direction: row;

    .pro-right-view {
        display: flex;
        width: 50px;
        flex-direction: column;
    }
}
</style>

<template>
<div class="content page">
    <section class="section-pro">
        <canvas id="myCanvas" 
        :width="`${width}`" 
        :height="`${height}`" 
        style="border: 1px solid gainsboro;" 
        @mousedown="canvasDown($event)" 
        @mouseup="canvasUp($event)" 
        @mousemove="canvasMove($event)" 
        @touchstart="canvasDown($event)" 
        @touchend="canvasUp($event)" 
        @touchmove="canvasMove($event)">
        </canvas>
        <div class="pro-right-view">
            <el-color-picker v-model="config.lineColor" show-alpha @change="changeColor($event)"></el-color-picker>
            
            <el-button size="small" class="fa fa-reply"></el-button>
            <el-button size="small" class="fa fa-share"></el-button>
            <el-button size="small" class="fa fa-search-plus"></el-button>
            <el-button size="small" class="fa fa-search-minus"></el-button>
            <el-button size="small" class="fa fa-object-ungroup"></el-button>
            <el-button size="small" class="fa fa-floppy-o"  @click="getImage"></el-button>
        </div>
    </section>

</div>
</template>

<script>
export default {
    data() {
        return {
            ctx: {},
            themeColor: '', //选中的颜色
            canvasMoveUse: false, //启用鼠标移动画图
            // 存储当前表面状态数组-上一步
            preDrawAry: [],
            // 存储当前表面状态数组-下一步
            nextDrawAry: [],
            // 中间数组
            middleAry: [],
            config: {
                lineWidth: 1,
                lineColor: '#f2849e',
                shadowBlur: 2
            }
        }
    },
    props: {
        type: {
            type: String,
            default: 'primary'
        },
        width: {
            type: String,
            default: '500',
        },
        height: {
            type: String,
            default: '400',
        },
        isImage: { //是否有图片背景
            type: Boolean,
            default: false,
        },
        url:{
            type:String,
            default:'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
        }

    },
    computed: {

    },
    methods: {
        initCanvas() {
            let myCanvas = document.getElementById("myCanvas");
            this.ctx = myCanvas.getContext("2d");
            let img=document.createElement("img")
            img.src = this.url
            this.ctx.drawImage(img,10,10);
        },
        //选中颜色
        changeColor(val) {
            this.config.lineColor = val
        },

        // 设置绘画配置
        setCanvasStyle() {
            this.ctx.lineWidth = this.config.lineWidth
            this.ctx.shadowBlur = this.config.shadowBlur
            this.ctx.shadowColor = this.config.lineColor
            this.ctx.strokeStyle = this.config.lineColor
        },

        // 下载生成图片
      getImage () {

      },

        canvasDown(e) { //鼠标 || 手指按着不放
            this.canvasMoveUse = true
            const canvasX = e.clientX - e.target.offsetLeft
            const canvasY = e.clientY - e.target.offsetTop
            this.ctx.moveTo(canvasX, canvasY)

        },
        canvasUp(e) { //鼠标 || 手指松
            this.canvasMoveUse = false
            this.ctx.beginPath() //起始一条路径，或重置当前路径
        },
        canvasMove(e) { //鼠标 || 手指移动
            if (this.canvasMoveUse) {
                let canvasX, canvasY;
                canvasX = e.clientX - e.target.offsetLeft
                canvasY = e.clientY - e.target.offsetTop
                this.setCanvasStyle()
                this.ctx.lineTo(canvasX, canvasY)
                this.ctx.stroke()
            }
        }
    },
    created(){
        
    },
    mounted() {
        this.initCanvas()
    },
    watch:{
        url(newVal){
            this.initCanvas()
        }
    }
}
</script>
