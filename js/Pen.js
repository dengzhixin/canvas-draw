class Pen {

    constructor(color, parentNode) {
        this.dom = undefined
        this.active = false
        this.color = color
        this.parentNode = parentNode
    }

    render(name = 'pen', drawer) {
        const {ctx, pensDom, ui} = drawer
        this.pensDom = pensDom
        this.ctx = ctx
        this.ui = ui
        if (this.color === '#ffffff') {
            name = "clean"
        }
        let html = `<div style="display: inline-block"> <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-${name}"></use>
                        </svg></div>`
        let temp = document.createElement('template')
        temp.innerHTML = html

        let dom = temp.content.firstChild
        dom.style.color = this.color === '#ffffff' ? 'black' : this.color
        dom.classList.add('pen')
        this.parentNode.appendChild(dom)
        this.dom = dom
        this.dom.onclick = this.click
    }
    reset(){
        this.pensDom.forEach((d) => {
            d.active=false
            d.dom.classList.remove('active')

        })
    }
    click = (e) => {
        this.reset()
        this.active = !this.active
        if (this.active) {
            this.dom.classList.add('active')
            this.ctx.strokeStyle = this.color
            this.ui.paintColor.value = this.color
            this.ui.logo.style.color = this.color === '#ffffff' ? 'black' : this.color
        }
    }


}

export default Pen
