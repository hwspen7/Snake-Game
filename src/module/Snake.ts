console.log("SNAKE FILE CONTENT HASH:", Math.random())
class Snake {
    head: HTMLElement
    bodies: HTMLCollection
    element: HTMLElement

    constructor() {
        this.element = document.getElementById('snake')!
        // First -> Head
        this.head = document.querySelector('#snake>div') as HTMLElement
        this.bodies = this.element.getElementsByTagName('div')
    }

    // Get snake head coordinates
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }

    set X(value: number) {
        if (this.X === value)
            return

        if (value < 0 || value > 290) {
            throw new Error("! GAME OVER !")
        }

        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }

        // Move
        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkHeadBody()

    }

    set Y(value: number) {
        if (this.Y === value)
            return

        if (value < 0 || value > 290) {
            throw new Error("! GAME OVER !")
        }

        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }

        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }

    // Body expansion
    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // Front body position
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop

            const cur = this.bodies[i] as HTMLElement;
            cur.style.left = X + 'px';
            cur.style.top = Y + 'px';

        }
    }

    // Check if the head hits any part of the body
    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('!HIT YOURSELF!')
            }
        }
    }

}
export default Snake