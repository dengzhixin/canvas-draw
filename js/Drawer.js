import Pen from './Pen'
import exportCanvasAsPNG from "./exportCanvasAsPNG";
class Drawer {
    constructor() {
        this.isTouchDevice = false
        this.ctx = undefined
        this.drawing = false
        this.last = undefined
        this.pens = ['#000000', '#cc1827', '#dabff1', '#114c84', '#aad3f7', '#7eea82','#ffffff']
        this.pensDom = []
        this.ui = {
            canvas: '#canvas',
            paintColor: "#paintColor",
            paintLineWidth: '#paintLineWidth',
            clearBtn: '#clear',
            penBox: '#penBox',
            saveBtn:'#save',
            logo:'#logo',
            closeSavePhotoBox:'#closeSavePhotoBox'
        }

    }

    init() {

        this.initUI()
        this.initCtx()
        this.initPen()

        this.isTouchDevice = 'ontouchstart' in document.documentElement

        this.initEvent()
    }

    initUI() {

        Object.keys(this.ui).forEach((key) => {
            this.ui[key] = document.querySelector(this.ui[key])
        })
        this.ui.canvas.width = document.documentElement.clientWidth
        this.ui.canvas.height = document.documentElement.clientHeight - 54;


    }

    initPen() {
        this.pens.forEach((item, index) => {
            this.pensDom[index] = new Pen(item, this.ui.penBox)
            this.pensDom[index].render('pen', this)

        })
    }
    initWhiteCanvasBg(){
        this.ctx.save()
        this.ctx.fillStyle='#fff'
        this.ctx.rect(0, 0, this.ui.canvas.width, this.ui.canvas.height)
        this.ctx.fill()
        this.ctx.restore()
    }
    initCtx() {
        this.ctx = this.ui.canvas.getContext('2d')
        this.ctx.strokeStyle = 'black'
        this.ctx.lineCap = 'round' //线段直接的连接方式
        this.ctx.lineWidth = 8
        this.initWhiteCanvasBg()
    }

    initEvent() {
        this.initUIEvent()
        if (this.isTouchDevice) {
            this.initTouchDrawEvent()
        } else {
            this.initPcDrawEvent()
        }
    }

    initUIEvent() {
        this.ui.paintColor.onchange = (e) => {
            this.ctx.strokeStyle = this.ui.paintColor.value
        }

        this.ui.paintLineWidth.onchange = () => {
            this.ctx.lineWidth = this.ui.paintLineWidth.value
        }
        this.ui.clearBtn.onclick = () => {
            this.ctx.clearRect(0, 0, this.ui.canvas.width, this.ui.canvas.height)
        }
        this.ui.saveBtn.onclick=()=>{
            this.save()
        }


    }

    initTouchDrawEvent() {
        this.ui.canvas.ontouchstart = (e) => {
            this.last = [e.touches[0].layerX, e.touches[0].clientY - 40]
        }
        this.ui.canvas.ontouchmove = (e) => {
            this.drawLine(
                this.last[0],
                this.last[1],
                e.touches[0].clientX,
                e.touches[0].clientY - 40
            )
            this.last = [e.touches[0].clientX, e.touches[0].clientY - 40]
        }


        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
        }, {passive: false}); //passive 参数不能省略，用来兼容ios和android
    }

    initPcDrawEvent() {
        this.ui.canvas.onmousedown = (e) => {
            this.drawing = true
            this.last = [e.layerX, e.layerY]
        }
        this.ui.canvas.onmouseup = () => {
            this.drawing = false
        }
        this.ui.canvas.onmousemove = (e) => {
            if (this.drawing === true) {
                this.drawLine(this.last[0], this.last[1], e.layerX, e.layerY)
                this.last = [e.layerX, e.layerY]
            }
        }
    }

    drawLine(x1, y1, x2, y2) {
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
    }
    save(){
        exportCanvasAsPNG('canvas',this.isTouchDevice)
    }
}
export default Drawer
